import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.AWS_SMTP_ENDPOINT,
    port: 587,
    secure: false,
    auth: {
        user: process.env.AWS_SMTP_USER_NAME,
        pass: process.env.AWS_SMTP_PASSWORD,
    },
})

export const sendContactFormMessage = async ({ name, email, message }) => {
    try {
        const info = await transporter.sendMail({
            from: '"Eat Around Contact" <contact@eataround.co>',
            to: 'contact@eataround.co',
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            text: `You received a new message from your contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        })

        console.log('Contact form message sent successfully:', info.messageId)
        return info
    } catch (error) {
        console.error('Error sending contact form message:', error)
        throw error
    }
}
