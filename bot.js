import TelegramBot from 'node-telegram-bot-api'
import http from 'http'
import fs from 'fs'

const TOKEN = '8645802935:AAHJo1WAGk4piK1-nyKf2IJYE2CE3fore-Y'
const PORT = process.env.PORT || 3001
const WEBHOOK_URL = process.env.PORT ? 'https://zuhrstar-bot.onrender.com' : null
const ADMINS_FILE = './admins.json'

/* ── Admin ma'lumotlari ── */
function loadAdmins() {
  if (!fs.existsSync(ADMINS_FILE)) return []
  try { return JSON.parse(fs.readFileSync(ADMINS_FILE, 'utf8')) }
  catch { return [] }
}
function saveAdmins(list) {
  fs.writeFileSync(ADMINS_FILE, JSON.stringify(list, null, 2))
}
function activeAdmins() {
  return loadAdmins().filter(a => Date.now() < new Date(a.expires).getTime())
}

/* ── Bot: webhook (Render) yoki polling (lokal) ── */
const bot = WEBHOOK_URL
  ? new TelegramBot(TOKEN)
  : new TelegramBot(TOKEN, { polling: true })

/* ── Handlerlar ── */
const sessions = {}

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id
  const me = loadAdmins().find(a => a.chatId === chatId)

  if (me && Date.now() < new Date(me.expires).getTime()) {
    const days = Math.ceil((new Date(me.expires) - Date.now()) / 86400000)
    await bot.sendMessage(chatId,
      `✅ *Siz adminlar ro'yxatidasiz!*\n\n` +
      `👤 Login: \`${me.login}\`\n` +
      `📅 ${days} kun qoldi\n\n` +
      `Saytdagi barcha arizalar sizga keladi.`,
      { parse_mode: 'Markdown' }
    )
    return
  }

  sessions[chatId] = { step: 'login' }
  await bot.sendMessage(chatId,
    `👋 *ZuhrStar Admin Paneli*\n\n` +
    `Ro'yxatdan o'tish uchun *login* kiriting:`,
    { parse_mode: 'Markdown' }
  )
})

bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  const text = msg.text
  if (!text || text.startsWith('/') || !sessions[chatId]) return

  const s = sessions[chatId]

  if (s.step === 'login') {
    if (text.trim().length < 3) {
      await bot.sendMessage(chatId, '❌ Login kamida 3 ta harf. Qaytadan:')
      return
    }
    s.login = text.trim()
    s.step = 'password'
    await bot.sendMessage(chatId,
      `✅ Login: \`${s.login}\`\n\nEndi *parol* kiriting (kamida 6 belgi):`,
      { parse_mode: 'Markdown' }
    )

  } else if (s.step === 'password') {
    if (text.trim().length < 6) {
      await bot.sendMessage(chatId, '❌ Parol kamida 6 belgi. Qaytadan:')
      return
    }
    s.password = text.trim()
    s.step = 'confirm'
    await bot.sendMessage(chatId,
      `📋 *Tasdiqlang:*\n\n` +
      `👤 Login: \`${s.login}\`\n` +
      `🔑 Parol: \`${s.password}\`\n` +
      `📅 Muddat: 1 yil`,
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[
            { text: '✅ Tasdiqlash', callback_data: 'confirm_reg' },
            { text: '❌ Bekor', callback_data: 'cancel_reg' },
          ]],
        },
      }
    )
  }
})

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id
  await bot.answerCallbackQuery(query.id)

  if (query.data === 'confirm_reg') {
    const s = sessions[chatId]
    if (!s?.login) return
    const all = loadAdmins().filter(a => a.chatId !== chatId)
    const expires = new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString()
    all.push({ chatId, login: s.login, password: s.password, expires })
    saveAdmins(all)
    delete sessions[chatId]

    await bot.sendMessage(chatId,
      `🎉 *Muvaffaqiyatli!*\n\n` +
      `👤 Login: \`${s.login}\`\n` +
      `🔑 Parol: \`${s.password}\`\n` +
      `📅 ${expires.slice(0, 10)} gacha faol\n\n` +
      `✅ Endi saytdagi barcha arizalar to'g'ridan-to'g'ri sizga keladi!`,
      { parse_mode: 'Markdown' }
    )

  } else if (query.data === 'cancel_reg') {
    delete sessions[chatId]
    await bot.sendMessage(chatId, '❌ Bekor qilindi. /start bosing.')
  }
})

bot.on('polling_error', (err) => console.error('Bot xato:', err.message))

/* ── HTTP Server ── */
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return }

  // Telegram webhook endpoint
  if (req.method === 'POST' && req.url === `/bot${TOKEN}`) {
    let body = ''
    req.on('data', c => body += c)
    req.on('end', () => {
      try { bot.processUpdate(JSON.parse(body)) } catch {}
      res.writeHead(200); res.end('OK')
    })
    return
  }

  // Sayt formasi — ariza keladi
  if (req.method === 'POST' && req.url === '/register') {
    let body = ''
    req.on('data', c => body += c)
    req.on('end', async () => {
      try {
        const { name, phone, course } = JSON.parse(body)
        const admins = activeAdmins()

        const text =
          `📋 *Yangi ariza — ZuhrStar sayt!*\n\n` +
          `👤 Ism: *${name || '—'}*\n` +
          `📱 Telefon: *${phone || '—'}*\n` +
          `📚 Yo'nalish: *${course || "Ko'rsatilmagan"}*`

        await Promise.all(admins.map(a =>
          bot.sendMessage(a.chatId, text, { parse_mode: 'Markdown' })
        ))

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ok: true }))
      } catch (e) {
        res.writeHead(500)
        res.end(JSON.stringify({ ok: false }))
      }
    })
    return
  }

  // Health check — Render servisni tirik deb biladi
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('ZuhrStar Bot OK')
    return
  }

  res.writeHead(404); res.end()
})

server.listen(PORT, async () => {
  console.log(`✅ Server port ${PORT} da ishlamoqda`)
  if (WEBHOOK_URL) {
    await bot.setWebHook(`${WEBHOOK_URL}/bot${TOKEN}`)
    console.log(`🔗 Webhook: ${WEBHOOK_URL}/bot${TOKEN}`)
  } else {
    console.log('🔄 Polling rejimida (lokal)')
  }
  console.log('🤖 @zuhrstar_register_bot tayyor')
})
