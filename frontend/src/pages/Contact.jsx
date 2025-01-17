import ContactCover from '../assets/contact-cover.jpg'
import LogoLight from '../assets/eat-around-logo-light.svg'
import { Link } from 'react-router-dom'

export default function Contact() {
    return (
        <div className="flex flex-col p-4 w-11/12 xl:p-16 lg:max-w-7xl pt-3">
            <div className="flex flex-col-reverse items-center lg:items-stretch lg:flex-row my-24 xl:my-12 mx-4 xl:mx-8">
                <div className="flex flex-col p-0 m-8">
                    <div className="flex flex-col text-start gap-2 mx-2">
                        <h2 className="text-eabrown text-2xl">
                            Stay in touch!
                        </h2>
                        <p className="text-gray-500">
                            If you want to see some features implemented, more
                            filters or any other improvements, feel free to send
                            a request and we will get back to you.
                        </p>
                    </div>
                    <form className="flex flex-col mt-8">
                        <label htmlFor="fname" className="hidden">
                            First name:
                        </label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            placeholder="First name"
                            className="mb-4 p-2 border rounded-md"
                        />
                        <label htmlFor="lname" className="hidden">
                            Last name:
                        </label>
                        <input
                            type="text"
                            id="lname"
                            name="lname"
                            placeholder="Last name"
                            className="mb-4 p-2 border rounded-md"
                        />
                        <label htmlFor="email" className="hidden">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="mb-4 p-2 border rounded-md"
                        />
                        <label htmlFor="message" className="hidden">
                            Your message:
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Your message"
                            rows="5"
                            className="p-2 border rounded-md"
                        ></textarea>
                        <button
                            type="submit"
                            className="m-8 py-3 bg-eagreen text-white rounded-full shadow-md hover:bg-orange-500"
                        >
                            🖐️ Say Hi !
                        </button>
                    </form>
                </div>

                <div className="hidden lg:flex relative w-2/3">
                    <img
                        src={ContactCover}
                        alt="Picture of an empty restaurant terrasse"
                        className="w-full h-full object-cover rounded-md"
                    />
                    <Footer />
                    <div className="absolute top-0 left-0 p-2">
                        <div className="flex items-center">
                            <img
                                src={LogoLight}
                                alt="Eat around logo"
                                className="w-10 mr-2"
                            />
                            <p className="font-bold text-eaoffwhite pt-2">
                                Eat Around
                            </p>
                        </div>
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
        <p className="absolute bottom-0 left-0 w-full bg-eabrown text-eaoffwhite text-sm font-normal py-2 text-center rounded-b-md md:px-6 lg:px-2">
            Made with love by{' '}
            <Link
                to={{ pathname: 'https://valentinorrit.com/' }}
                target="_blank"
                className="hover:underline text-eaorange"
            >
                Valentin Orrit
            </Link>{' '}
            &{' '}
            <Link
                to={{ pathname: 'https://github.com/gaultierpatrice/' }}
                target="_blank"
                className="hover:underline text-eaorange"
            >
                Gaultier Patrice
            </Link>
            .
        </p>
    )
}
