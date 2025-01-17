import ContactCover from '../assets/contact-cover.jpg'
import LogoLight from '../assets/eat-around-logo-light.svg'

export default function Contact() {
    return (
        <div className="flex flex-col p-4 w-11/12 lg:p-16 lg:max-w-5xl pt-3">
            <div className="flex flex-col-reverse items-center md:flex-row m-8">
                <div className="flex flex-col p-0 m-8">
                    <div className="flex flex-col text-start gap-2">
                        <h2 className="text-eabrown text-xl">Stay in touch!</h2>
                        <p className="text-gray-500">
                            If you have suggestions for improving the site,
                            please don't hesitate to reach out to us with the
                            form below.
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
                            placeholder="Say Hi !"
                            rows="5"
                            className="p-2 border rounded-md"
                        ></textarea>
                        <button
                            type="submit"
                            className="m-8 py-3 bg-eaorange text-white rounded-full shadow-md hover:bg-orange-500"
                        >
                            Send
                        </button>
                    </form>
                </div>

                <div className="relative w-2/3">
                    <img
                        src={ContactCover}
                        alt="Picture of an empty restaurant terrasse"
                        className="w-full h-full object-cover rounded-md"
                    />
                    <p className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-eaoffwhite text-sm font-normal py-4 px-2 text-start rounded-md">
                        This website was developed by Valentin Orrit and
                        Gaultier Patrice.
                    </p>
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
            </div>
        </div>
    )
}
