import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

const TO_EMAIL = "salihsha656@gmail.com"

export async function POST(request) {
  try {
    const { name, email, subject } = await request.json()

    if (!name || !email || !subject) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 })
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Contact form error: EMAIL_USER/EMAIL_PASS are not set in .env.local")
      return NextResponse.json(
        { message: "Email service isn't configured yet. Please try again later." },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${subject}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${subject.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    })

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ message: "Something went wrong. Please try again later." }, { status: 500 })
  }
}
