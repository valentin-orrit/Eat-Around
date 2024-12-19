import { Link } from 'react-router-dom'
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from '@clerk/clerk-react'
import { useUserData } from '../hooks/useUserData'

export default function Navbar() {
    const { userData } = useUserData()

    return (
        <nav className="bg-amber-500 p-4 mb-20">
            <div className="container flex justify-between items-center align-middle grow">
                <h1 className="text-white text-xl font-bold">Eat Around</h1>
                <div className="flex space-x-4">
                    <Link
                        to="/"
                        className="text-white hover:bg-amber-700 px-3 py-2 rounded-full text-sm font-medium"
                    >
                        Home
                    </Link>

                    <SignedIn>
                        {userData && userData.is_admin && (
                            <Link
                                to="/dashboard"
                                className="text-white hover:bg-amber-700 px-3 py-2 rounded-full text-sm font-medium"
                            >
                                Dashboard
                            </Link>
                        )}
                    </SignedIn>

                    <div className="flex justify-center text-white text-sm font-medium">
                        <SignedOut>
                            <SignInButton className="text-white bg-amber-600 hover:bg-amber-700 px-3 py-2 rounded-full " />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    )
}
