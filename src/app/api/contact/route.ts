import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const formData = await req.json()

    const { name, email, message, company } = formData

    // 🛑 Honeypot (анти-бот)
    if (company) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    }

    await resend.emails.send({
      from: "Website <onboarding@resend.dev>",
      to: "ant1255@gmail.com",
      subject: "Neue Anfrage über Website",
      html: `
        <h2>Neue Nachricht</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nachricht:</strong><br/>${message}</p>
      `,
    })

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ ok: false }), { status: 500 })
  }
}