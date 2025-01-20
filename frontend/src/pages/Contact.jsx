import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ContactCover from '../assets/contact-cover.jpg'
import LogoLight from '../assets/eat-around-logo-light.svg'
import axios from 'axios'

export default function Contact() {
    const api = import.meta.env.VITE_AXIOS_BASE_URL
    const captchaKey = import.meta.env.VITE_GOOGLE_CAPTCHA_SITE_KEY
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        message: '',
    })

    useEffect(() => {
        const loadRecaptchaScript = () => {
            const script = document.createElement('script')
            script.src = `https://www.google.com/recaptcha/api.js?render=${captchaKey}`
            script.async = true
            script.defer = true
            document.body.appendChild(script)
        }

        loadRecaptchaScript()
    }, [])

    const [status, setStatus] = useState({ success: null, message: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const token = await window.grecaptcha.execute(`${captchaKey}`, {
                action: 'submit',
            })

            const formDataWithToken = { ...formData, recaptchaToken: token }

            const response = await axios.post(
                `${api}/contact`,
                formDataWithToken
            )

            if (response.data.success) {
                setStatus({
                    success: true,
                    message: 'Your message has been sent successfully!',
                })
                setFormData({ fname: '', lname: '', email: '', message: '' })
            } else {
                setStatus({
                    success: false,
                    message: 'Failed to send your message. Please try again.',
                })
            }
        } catch (error) {
            console.error('Error submitting contact form:', error)
            setStatus({
                success: false,
                message: 'An error occurred. Please try again later.',
            })
        }
    }

    return (
        <div className="flex flex-col p-2 w-11/12 xl:p-16 lg:max-w-7xl pt-3 h-screen">
            <div className="flex flex-col-reverse items-center lg:items-stretch lg:flex-row my-10 sm:my-24 xl:my-10 mx-4 xl:mx-8">
                <div className="flex flex-col p-0 m-8">
                    <div className="flex flex-col text-start gap-2 mx-2">
                        <div className="flex">
                            <img
                                src={LogoLight}
                                alt="Eat around logo"
                                className="w-10 mr-2"
                            />
                            <h2 className="text-eabrown text-2xl mt-2">
                                Stay in touch!
                            </h2>
                        </div>
                        <p className="text-gray-500">
                            If you want to see some features implemented, more
                            filters, or any other improvements, feel free to
                            send a request and we will get back to you.
                        </p>
                    </div>
                    <form
                        className="flex flex-col mt-8"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            placeholder="First name"
                            className="mb-4 p-2 border rounded-md"
                            value={formData.fname}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            id="lname"
                            name="lname"
                            placeholder="Last name"
                            className="mb-4 p-2 border rounded-md"
                            value={formData.lname}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="mb-4 p-2 border rounded-md"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Your message"
                            rows="5"
                            className="p-2 border rounded-md"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="m-8 py-3 bg-eagreen text-white rounded-full shadow-md hover:bg-orange-500"
                        >
                            🖐️ Say Hi!
                        </button>
                    </form>
                    {status.message && (
                        <p
                            className={`text-center mt-4 ${
                                status.success
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            }`}
                        >
                            {status.message}
                        </p>
                    )}
                </div>

                <div className="hidden lg:flex relative w-2/3">
                    <img
                        src={ContactCover}
                        alt="Picture of an empty restaurant terrace"
                        className="w-full h-full object-cover rounded-md"
                    />
                    <Footer />
                    <div className="absolute top-0 left-0 py-2 px-4">
                        <p className="font-bold text-eaoffwhite opacity-80 pt-2">
                            Eat Around
                        </p>
                    </div>
                </div>

                <footer className="flex flex-col md:hidden px-20">
                    <Footer />
                </footer>
            </div>
        </div>
    )
}

function Footer() {
    return (
        <p className="absolute bottom-0 left-0 w-full bg-eabrown text-eaoffwhite text-sm font-normal py-2 text-center rounded-b-md md:px-6 lg:px-2 text-opacity-70">
            Made with love by{' '}
            <Link
                to={{ pathname: 'https://valentinorrit.com/' }}
                target="_blank"
                className="hover:underline text-eaorange text-opacity-80"
            >
                Valentin Orrit
            </Link>{' '}
            &{' '}
            <Link
                to={{ pathname: 'https://github.com/gaultierpatrice/' }}
                target="_blank"
                className="hover:underline text-eaorange text-opacity-80"
            >
                Gaultier Patrice
            </Link>
            .
        </p>
    )
}
