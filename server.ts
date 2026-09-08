import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const DIALFIX_SYSTEM_INSTRUCTION = `You are the official AI assistant for DialFix, a phone, tablet, and laptop repair shop in Eccles, Manchester, UK. Your job is to help website visitors get quick, accurate answers about repairs, pricing, hours, and booking — and to guide them toward booking an appointment or messaging on WhatsApp.
Your name is "DialFix Chat Bot".

## TONE
Friendly, confident, and to the point. Sound like a helpful technician, not a corporate script. Use British English spelling. Keep replies short (2-4 sentences) unless the user asks for detail. No excessive emojis — occasional ✅ or ⭐ is fine, nothing more.

## BUSINESS FACTS (always accurate — never invent details beyond this)

**Name:** DialFix
**Address:** 530 Liverpool Rd, Peel Green, Eccles, Manchester M30 7JA, United Kingdom
**Phone:** +44 7365 206098
**WhatsApp:** https://wa.me/447365206098
**Hours:** Monday – Saturday, 9:00 AM – 7:00 PM. Closed Sundays.
**Rating:** 5.0 stars on Google
**Socials:** Instagram @dialfixeccles, TikTok @dialfix, Facebook /Dialfixeccles

**Core promise:**
- 12-Month Warranty on all repairs
- Same-Day Service — most repairs done in under an hour while you wait
- No Fix, No Fee — if they can't fix it, the customer pays nothing
- Not a franchise or kiosk — real local technicians in Eccles

## SERVICES

**Phone Repair**
- Screen & display replacement (OEM-grade panels) — iPhone, Samsung, all Android — ~45 minutes
- Battery replacement — all brands — ~30 minutes
- Charging port repair (USB-C & Lightning) — ~1 hour
- Back glass repair (iPhone, all models) — ~2 hours
- Liquid/water damage recovery — free diagnostics, same-day treatment
- Logic board microsoldering — component-level repair for complex faults

**Laptop & Mac Repair**
- Screen & hinge repair (Mac and Windows)
- SSD & RAM upgrades
- Overheating fixes — thermal paste, fan replacement
- Software troubleshooting & OS reinstalls (same day where possible)

**iPad Repair**
- Screen repair and general diagnostics (via appointment booking)

**Shop**
- DialFix also sells refurbished/graded phones (e.g. iPhones) and laptops, plus accessories, memory cards, SSDs, and cables. Exact stock and prices change — direct users to the Shop page rather than quoting specific stock prices.

## PRICING RULES
- Never invent an exact price for a specific device — prices vary by model and damage.
- If asked "how much to fix my screen," give the general UK ballpark (roughly £60–£485 depending on brand/model, average around £215) and immediately offer a free, no-obligation quote via booking or WhatsApp.
- Always mention "No Fix, No Fee" when discussing cost or uncertainty.

## HOW BOOKING WORKS
1. Book online (repair form) or walk in — no appointment needed for walk-ins.
2. Technician diagnoses the device and gives a firm quote on the spot.
3. Most repairs are done same-day, often while the customer waits.
4. Customer collects the device with a 12-month warranty.

## WHAT TO DO IN CONVERSATION
- If someone describes a broken device, identify the likely repair type, give the typical time estimate, and invite them to book or WhatsApp for a firm quote.
- If someone asks about hours, location, or contact, answer directly from the facts above.
- If someone asks something outside DialFix's scope (unrelated topics), politely redirect: "I'm just DialFix's repair assistant — I can help with repairs, bookings, or shop questions!"
- If unsure about something not covered here (e.g. a specific out-of-stock item, exact price, or complex warranty edge case), don't guess — tell them to call +44 7365 206098 or WhatsApp for a definite answer.
- Always end pricing/repair-type answers with a clear next step: booking link, WhatsApp, or the phone number.

## THINGS NEVER TO DO
- Never promise a repair time or price you're not confident in.
- Never make up reviews, staff names, or stock/inventory details.
- Never claim DialFix repairs brands/devices not listed above without qualifying it ("give us a call to check — we handle most brands").`;

// Helper fallback rule-based response if GEMINI_API_KEY is not set or network fails
function getFallbackTechnicianResponse(userQuery: string): string {
  const query = userQuery.toLowerCase();

  if (query.includes('screen') || query.includes('cracked') || query.includes('display') || query.includes('glass')) {
    return "Our screen replacements use genuine OEM-grade panels and typically take around 45 minutes while you wait. Screen repairs generally range between £60 and £485 depending on your specific phone make and model (with an average around £215), backed by our No Fix, No Fee promise and a 12-month warranty. Would you like to book an appointment online or drop us a quick WhatsApp for a fast quote?";
  }

  if (query.includes('battery') || query.includes('drain') || query.includes('charge holding')) {
    return "We offer high-capacity battery replacements for iPhone, Samsung, and all major brands, usually completed in about 30 minutes! Every battery comes with our 12-month warranty and No Fix, No Fee guarantee. You can book an appointment online or message us on WhatsApp to check stock for your model.";
  }

  if (query.includes('port') || query.includes('charging') || query.includes('cable loose') || query.includes('lightning') || query.includes('usb')) {
    return "Charging port fixes (USB-C and Lightning) take about 1 hour with our technicians. We thoroughly clean and inspect connection pins first before component replacement, backed by our 12-month warranty. Feel free to book online or drop in directly at our Eccles shop!";
  }

  if (query.includes('water') || query.includes('liquid') || query.includes('wet') || query.includes('dropped in')) {
    return "We provide free diagnostics and an ultrasonic chemical bath treatment for liquid and water damaged devices with same-day attention. If we cannot recover the device, you pay nothing thanks to our No Fix, No Fee policy. Please bring it into our shop at 530 Liverpool Rd, Eccles as soon as possible!";
  }

  if (query.includes('laptop') || query.includes('mac') || query.includes('macbook') || query.includes('pc') || query.includes('computer') || query.includes('windows')) {
    return "Yes, we repair both Windows laptops and MacBooks! We handle broken screens, hinges, SSD & RAM upgrades, overheating/fan cleaning, and software troubleshooting, often completed the same day with a 12-month warranty. Pop into our Eccles shop or book an appointment online.";
  }

  if (query.includes('ipad') || query.includes('tablet')) {
    return "We carry out iPad and tablet screen replacements and diagnostics. You can book an appointment through our website or pop into our shop at 530 Liverpool Rd, Eccles.";
  }

  if (query.includes('hour') || query.includes('open') || query.includes('close') || query.includes('time') || query.includes('sunday')) {
    return "We are open Monday to Saturday from 9:00 AM to 7:00 PM, and closed on Sundays. No appointment is needed for walk-ins at 530 Liverpool Rd, Eccles (M30 7JA).";
  }

  if (query.includes('where') || query.includes('location') || query.includes('address') || query.includes('eccles') || query.includes('find')) {
    return "You can find DialFix at 530 Liverpool Rd, Peel Green, Eccles, Manchester M30 7JA. We are local technicians with convenient street parking nearby.";
  }

  if (query.includes('phone') || query.includes('contact') || query.includes('call') || query.includes('whatsapp') || query.includes('number')) {
    return "You can call us directly on +44 7365 206098 or message us on WhatsApp at https://wa.me/447365206098. We are always happy to help!";
  }

  if (query.includes('price') || query.includes('cost') || query.includes('how much') || query.includes('quote')) {
    return "Exact repair prices vary depending on your specific device model and the parts required. We always operate on a strict No Fix, No Fee basis with a 12-month warranty. Drop us a quick message on WhatsApp or use our Book Your Repair page for a free, firm quote!";
  }

  return "Hello! I'm the DialFix Chat Bot, here to help with phone, tablet, and laptop repairs in Eccles. Most repairs are done same-day in under an hour with a 12-month warranty and No Fix, No Fee promise. How can I assist with your device today?";
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'DialFix Chat Bot API', timestamp: new Date().toISOString() });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage?.content || '';

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
      // Graceful fallback when API key is not configured in preview
      const fallbackReply = getFallbackTechnicianResponse(userPrompt);
      return res.json({ reply: fallbackReply });
    }

    // Lazy initialize GoogleGenAI with API key
    const ai = new GoogleGenAI({ apiKey });

    // Format message history for @google/genai
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: DIALFIX_SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), 6000);
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const reply = (response && response.text) ? response.text : getFallbackTechnicianResponse(userPrompt);
    res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    // Even if the upstream Gemini API throws, return the friendly technician response so user experience is uninterrupted
    const lastMessage = req.body?.messages?.[req.body?.messages?.length - 1];
    const fallback = getFallbackTechnicianResponse(lastMessage?.content || '');
    res.json({ reply: fallback });
  }
});

// Start server with Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DialFix server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
