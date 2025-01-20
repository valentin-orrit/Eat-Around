import { Link } from "react-router-dom"

export default function Guc ({}) {
    return (
        <div className="text-sm font-medium mx-24 mt-10">
            <h1 className="text-start pl-10 mb-4 underline">General Terms of Use for the Website "Eat Around"</h1>

            <h2 className="text-start pl-10 mb-1">ARTICLE 1: Purpose</h2>
            <p className="text-start pl-10">
                These "general terms of use" govern the legal framework for using the website "Eat Around" and its services.
            </p>
            <ul className="text-start pl-10">
                This agreement is concluded between:
            <li className="text-start pl-14">- The website manager, hereinafter referred to as "the Publisher,"</li>
            <li className="text-start pl-14">- Any natural or legal person wishing to access the site and its services, hereinafter referred to as "the User."</li>
            </ul>
            <p className="text-start pl-10 mb-4">
                Acceptance of these terms is mandatory for any User, and accessing the site implies acceptance of these terms.
            </p>

            <h2 className="text-start pl-10 mb-1">ARTICLE 2: Legal Information</h2>

            <p className="text-start pl-10 mb-4">
                The website "Eat Around" is published by Valentin Orrit and Gaultier Patrice, residing at Nantes, France.
            </p>

            <h2 className="text-start pl-10 mb-1">ARTICLE 3: Access to Services</h2>
            <p className="text-start pl-10">
                Any User with internet access can access the site free of charge from anywhere. Costs incurred by the User for accessing the site (internet connection, computer equipment, etc.) are not the responsibility of the Publisher.
            </p>
            <p className="text-start pl-10 mb-4">
                The site and its various services may be interrupted or suspended by the Publisher, particularly during maintenance, without prior notice or justification.
            </p>
            <h2 className="text-start pl-10 mb-1">ARTICLE 4: User Responsibility</h2>
            <p className="text-start pl-10">
                The User is responsible for the risks associated with the use of their login credentials and password.
            </p>
            <p className="text-start pl-10">
                The User's password must remain confidential. In case of password disclosure, the Publisher declines all responsibility.
            </p>
            <p className="text-start pl-10">
                The User assumes full responsibility for the use of information and content available on the website "Eat Around."
            </p>
            <p className="text-start pl-10 mb-4">
                Any use of the service by the User resulting directly or indirectly in damages must be compensated to the benefit of the site.
            </p>
            <h2 className="text-start pl-10 mb-1">ARTICLE 5: Publisher Responsibility</h2>
            <p className="text-start pl-10">
                Any malfunction of the server or network does not engage the Publisher's responsibility.
            </p>
            <p className="text-start pl-10">
                Similarly, the site's responsibility cannot be engaged in cases of force majeure or the unpredictable and insurmountable act of a third party.
            </p>
            <p className="text-start pl-10">
                The website "Eat Around" commits to implementing all necessary means to ensure the security and confidentiality of data. However, it does not provide a guarantee of total security.
            </p>
            <p className="text-start pl-10 mb-4">
                The Publisher reserves the right to deny guarantees regarding the reliability of sources, even though the information disseminated on the site is deemed reliable.
            </p>

            <h2 className="text-start pl-10 mb-1">ARTICLE 6: Intellectual Property</h2>
            <p className="text-start pl-10">
                The contents of the website "Eat Around" (logos, texts, graphic elements, videos, etc.) are protected under copyright laws in accordance with the Intellectual Property Code.
            </p>
            <p className="text-start pl-10">
                The User must obtain the Publisher's authorization before reproducing, copying, or publishing these contents.
            </p>
            <p className="text-start pl-10">
                These contents may only be used by Users for private purposes; commercial use is prohibited.
            </p>
            <p className="text-start pl-10">
                The User is fully responsible for any content they upload and commits not to harm third parties.
            </p>
            <p className="text-start pl-10 mb-4">
                The Publisher reserves the right to freely moderate or delete any content uploaded by Users without justification.
            </p>

            <h2 className="text-start pl-10 mb-1">ARTICLE 7: Personal Data</h2>
            <p className="text-start pl-10">
                The User must provide personal information to register on the site.
            </p>
            <p className="text-start pl-10">
                The User's email address may be used by the website "Eat Around" to communicate various information and manage their account.
            </p>
            <p className="text-start pl-10">
                "Eat Around" guarantees respect for the User's privacy, in accordance with Law No. 78-17 of January 6, 1978, on data processing, files, and freedoms.
            </p>
            <p className="text-start pl-10">
                Under Articles 39 and 40 of the Law of January 6, 1978, the User has the right to access, rectify, delete, and oppose their personal data. The User may exercise this right via:
            </p>
            <ul className="text-start pl-10 mb-4">
                <li className="text-start pl-4"><Link to="/contact" className="hover:underline">- The contact form </Link></li>
            </ul>

            <h2 className="text-start pl-10 mb-1">ARTICLE 8: Hyperlinks</h2>
            <p className="text-start pl-10">
                The domains to which hyperlinks on the site lead do not engage the responsibility of the Publisher of "Eat Around," as the Publisher has no control over these links.
            </p>
            <p className="text-start pl-10 mb-4">
                Third parties may create a link to any page of the site "Eat Around" without the Publisher’s express permission.
            </p>

            <h2 className="text-start pl-10 mb-1">ARTICLE 9: Changes to the Terms of Use</h2>
            <p className="text-start pl-10 mb-4">
                The website "Eat Around" reserves the right to modify the clauses of these terms of use at any time and without justification.
            </p>

            <h2 className="text-start pl-10 mb-1">ARTICLE 10: Duration of the Contract</h2>
            <p className="text-start pl-10 mb-4">
                The duration of this contract is indefinite. The contract takes effect for the User from the start of their use of the service.
            </p>

            <h2 className="text-start pl-10 mb-1">ARTICLE 11: Applicable Law and Jurisdiction</h2>
            <p className="text-start pl-10">
                This contract is governed by French law.
            </p>
            <p className="text-start pl-10 mb-8">
                In the event of a dispute not resolved amicably between the User and the Publisher, the courts of Nantes have jurisdiction to settle the matter.
            </p>

            <div className="flex items-center justify-center mb-10">
                <Link
                    to="/"
                    className="py-1 px-6 bg-eaorange text-white rounded-full shadow-md hover:bg-orange-500 text-center text-sm font-semibold"
                >
                    Homepage
                </Link>
            </div>

        </div>

    )
}