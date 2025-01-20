import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.AWS_SMTP_ENDPOINT,
    port: 587,
    auth: {
        user: process.env.AWS_SMTP_USER_NAME,
        pass: process.env.AWS_SMTP_PASSWORD,
    },
})

export const sendContactFormMessage = async ({ name, email, message }) => {
    try {
        const info = await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: 'contact@eataround.co',
            subject: `New Contact Form Submission from ${name}`,
            text: `You received a new message from your contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        })

        console.log('Contact form message sent:', info.messageId)
        return info
    } catch (error) {
        console.error('Error sending contact form message:', error)
        throw error
    }
}
