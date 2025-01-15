export default function Contact() {
    return (
    <div className="flex flex-col p-4 w-11/12 lg:p-16 lg:max-w-8xl">
        <div className="">
            <h1>"HelloWorld"</h1>
            <p>This website was developed by Valentin Orrit and Gaultier Patrice
            as a practical project to enhance their skills in building JavaScript
            applications with database integration and to gain hands-on experience
            with Google APIs. If you have suggestions for improving the site, please
            don t hesitate to reach out to us with the form below.</p>
        </div>

        <form className="flex flex-col">
            <label for="fname">First name:</label>
            <input  type="text" id="fname" name="fname"></input>
            <label for="lname">Last name:</label>
            <input  type="text" id="lname" name="lname"></input>
            <label for="email">Email:</label>
            <input  type="text" id="email" name="email"></input>
            <label for="message">Your message:</label>
            <input  type="text" id="message" name="message"></input>
        </form>                                                                     
    </div>
    
    
    
    )        
}