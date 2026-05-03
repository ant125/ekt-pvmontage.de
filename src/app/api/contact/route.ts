import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const formData = await req.json()

    const { name, email, message, company, token } = formData

    // 🛑 Honeypot (анти-бот)
    if (company) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    }

    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    )

    const verifyData = await verifyRes.json()

    if (!verifyData.success || verifyData.score < 0.3) {
      return new Response(JSON.stringify({ ok: false }), { status: 400 })
    }

    await resend.emails.send({
      from: "EKT PV Montage <noreply@ekt-pvmontage.de>",
      to: process.env.CONTACT_EMAIL!,
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