export default function Contact() {
    return (
        <div className="flex flex-col p-4 w-11/12 lg:p-16 lg:max-w-8xl pt-3">
            <div className="">
                <p>
                    This website was developed by Valentin Orrit and Gaultier
                    Patrice. If you have suggestions for improving the site,
                    please don t hesitate to reach out to us with the form
                    below.
                </p>
            </div>

            <form className="flex flex-col mt-5">
                <label for="fname" className="text-left">
                    First name:
                </label>
                <input type="text" id="fname" name="fname"></input>
                <label for="lname" className="text-left">
                    Last name:
                </label>
                <input type="text" id="lname" name="lname"></input>
                <label for="email" className="text-left">
                    Email:
                </label>
                <input type="email" id="email" name="email"></input>
                <label for="message" className="text-left">
                    Your message:
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows="5"
                    cols="80"
                ></textarea>
            </form>
        </div>
    )
}
