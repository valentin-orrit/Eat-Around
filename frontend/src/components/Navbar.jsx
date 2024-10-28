import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-amber-500 p-4 mb-20">
            <div className="container flex justify-between items-center grow">
                <h1 className="text-white text-xl font-bold">Eat Around</h1>
                <div className="flex space-x-4">
                    <Link
                        to="/"
                        className="text-white hover:bg-amber-700 px-3 py-2 rounded-full text-sm font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        to="/dashboard"
                        className="text-white hover:bg-amber-700 px-3 py-2 rounded-full text-sm font-medium"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </nav>
    )
}
