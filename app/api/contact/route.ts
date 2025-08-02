import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    // Create transporter using explicit Gmail SMTP configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Verify transporter configuration
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError)
      return NextResponse.json(
        {
          success: false,
          message: "Email service configuration error. Please try again later.",
        },
        { status: 500 },
      )
    }

    // Email content for you (the recipient)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "guptasahil2175@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #3b82f6; margin-bottom: 5px;">Contact Details:</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #3b82f6; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This email was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    }

    // Auto-reply email for the sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Thank You for Your Message!</h2>
          
          <p style="color: #333; line-height: 1.6;">Hi ${name},</p>
          
          <p style="color: #333; line-height: 1.6;">
            Thank you for reaching out through my portfolio! I've received your message and will get back to you as soon as possible.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <h3 style="color: #3b82f6; margin-top: 0;">Your Message Summary:</h3>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 5px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; font-style: italic;">"${message.substring(0, 150)}${message.length > 150 ? "..." : ""}"</p>
          </div>
          
          <p style="color: #333; line-height: 1.6;">
            I typically respond within 24-48 hours. In the meantime, feel free to check out my projects and connect with me on social media.
          </p>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="https://linkedin.com/in/sahilgupta2175" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #0077b5; color: white; text-decoration: none; border-radius: 5px;">LinkedIn</a>
            <a href="https://github.com/Sahilgupta2175" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #333; color: white; text-decoration: none; border-radius: 5px;">GitHub</a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Best regards,<br><strong>Sahil Gupta</strong><br>Full Stack Developer</p>
            <p>Email: guptasahil2175@gmail.com<br>Phone: +91 9956564108</p>
          </div>
        </div>
      `,
    }

    // Send both emails with better error handling
    try {
      await Promise.all([transporter.sendMail(mailOptions), transporter.sendMail(autoReplyOptions)])

      return NextResponse.json({
        success: true,
        message: "Message sent successfully! You'll receive a confirmation email shortly.",
      })
    } catch (sendError) {
      console.error("Email sending failed:", sendError)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email. Please try again or contact me directly at guptasahil2175@gmail.com",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Email API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Server error occurred. Please try again or contact me directly at guptasahil2175@gmail.com",
      },
      { status: 500 },
    )
  }
}
