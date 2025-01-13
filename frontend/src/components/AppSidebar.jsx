import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Home,
    LogIn,
    Gauge,
    ChevronRight,
    Heart,
    Filter,
    X,
    Check,
} from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from '@clerk/clerk-react'
import { useUserData } from '../hooks/useUserData'
import LogoLight from '../assets/eat-around-logo-light.svg'
import axios from 'axios'

export default function AppSidebar({
    filters,
    setFilters,
    favorites,
    setFavorites,
}) {
    const { userData } = useUserData()
    const { state, setOpen } = useSidebar()
    const api = import.meta.env.VITE_AXIOS_BASE_URL
    const [confirmationId, setConfirmationId] = useState(null)

    function toggleFilter(filterName) {
        setFilters((prevFilters) =>
            prevFilters.map((filter) =>
                filter.name === filterName
                    ? { ...filter, isActive: !filter.isActive }
                    : filter
            )
        )
    }

    async function handleDelete(id) {
        try {
            await axios.delete(`${api}/favorites/${id}`)

            setFavorites((prevFavorites) =>
                prevFavorites.filter((favorite) => favorite.id !== id)
            )

            setConfirmationId(null)
        } catch (error) {
            console.error(`Error deleting favorite with id: ${id}`, error)
        }
    }

    function cancelDelete() {
        setConfirmationId(null)
    }

    return (
        <Sidebar collapsible="icon" className="bg-eagreen lg:w-1/5 xl:w-1/6">
            <SidebarContent className="bg-eagreen gap-y-0">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <div
                            id="user-button"
                            className="py-4 flex justify-center"
                        >
                            <SignedOut>
                                <SidebarMenuButton asChild isActive>
                                    <div className="flex justify-center text-white text-sm font-medium my-4">
                                        <LogIn color="#fff" />
                                        <span>
                                            <SignInButton className="bg-eaorange hover:bg-amber-500 text-eaoffwhite px-3 py-1 rounded-md stroke-slate-100">
                                                Sign In
                                            </SignInButton>
                                        </span>
                                    </div>
                                </SidebarMenuButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>

                        <SidebarMenuButton asChild>
                            <Link
                                to="/"
                                className="text-eaoffwhite hover:bg-eaorange px-3 rounded-full text-sm font-semibold"
                            >
                                <Home />
                                Home
                            </Link>
                        </SidebarMenuButton>

                        <SidebarMenuButton asChild>
                            {userData && userData.is_admin && (
                                <Link
                                    to="/dashboard"
                                    className="text-eaoffwhite hover:bg-eaorange px-3 rounded-full text-sm font-semibold"
                                >
                                    <Gauge />
                                    Dashboard
                                </Link>
                            )}
                        </SidebarMenuButton>
                    </SidebarGroupContent>
                    <Collapsible
                        defaultOpen
                        className="group/collapsible text-eaoffwhite "
                    >
                        <SidebarGroupContent>
                            <SidebarMenuButton
                                asChild
                                className="px-3 py-2 rounded-md text-base hover:bg-eaorange"
                            >
                                <CollapsibleTrigger className="text-sm font-semibold">
                                    {state === 'collapsed' ? (
                                        <Filter onClick={() => setOpen(true)} />
                                    ) : (
                                        <Filter />
                                    )}
                                    My filters
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarMenuButton>
                            {state === 'collapsed' ? null : (
                                <CollapsibleContent className="text-left text-base ml-4">
                                    <SignedIn>
                                        <ul>
                                            {filters.map((filter) => (
                                                <li
                                                    key={filter.key}
                                                    onClick={() =>
                                                        toggleFilter(
                                                            filter.name
                                                        )
                                                    }
                                                    className={`flex justify-between items-center list-none group hover:bg-eaorange hover:cursor-pointer rounded-md px-2 text-sm ${
                                                        filter.isActive
                                                            ? 'text-eaoffwhite'
                                                            : 'text-gray-400'
                                                    }`}
                                                >
                                                    <span>{filter.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </SignedIn>
                                    <SignedOut>
                                        <p className="text-left text-eaorange text-xs">
                                            sign in to add or remove filters
                                        </p>
                                    </SignedOut>
                                </CollapsibleContent>
                            )}
                        </SidebarGroupContent>
                    </Collapsible>

                    <Collapsible
                        defaultOpen
                        className="group/collapsible text-eaoffwhite "
                    >
                        <SidebarGroupContent>
                            <SidebarMenuButton
                                asChild
                                className="px-3 py-2 rounded-md text-base hover:bg-eaorange"
                            >
                                <CollapsibleTrigger className="text-sm font-semibold">
                                    {state === 'collapsed' ? (
                                        <Heart onClick={() => setOpen(true)} />
                                    ) : (
                                        <Heart />
                                    )}
                                    My favorites
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarMenuButton>
                            {state === 'collapsed' ? null : (
                                <CollapsibleContent className="text-left ml-4">
                                    <SignedIn>
                                        <ul>
                                            {favorites?.map((favorite) => (
                                                <li
                                                    key={favorite.id}
                                                    className={`flex justify-between items-center list-none group hover:cursor-pointer rounded-md px-2 text-sm ${
                                                        confirmationId ===
                                                        favorite.id
                                                            ? 'hover:bg-eaoffwhite bg-eaoffwhite border-eaorange'
                                                            : 'hover:bg-eaorange'
                                                    } `}
                                                >
                                                    <span className="w-2/3 text-nowrap text-ellipsis overflow-hidden bg-gradient-to-r from-eaoffwhite from-70% to-transparent text-transparent bg-clip-text">
                                                        <TooltipProvider
                                                            delayDuration={150}
                                                        >
                                                            <Tooltip>
                                                                <TooltipTrigger className="">
                                                                    {confirmationId ===
                                                                    favorite.id ? (
                                                                        <span className="px-2 rounded-md text-red-500 font-semibold">
                                                                            delete?
                                                                        </span>
                                                                    ) : (
                                                                        <span className="">
                                                                            {
                                                                                favorite
                                                                                    .place
                                                                                    .name
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </TooltipTrigger>
                                                                <TooltipContent className="bg-eaoffwhite text-eablack rounded-md py-0">
                                                                    <p>
                                                                        {
                                                                            favorite
                                                                                .place
                                                                                .name
                                                                        }
                                                                    </p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </span>
                                                    <span className="text-gray-200 text-xs">
                                                        {confirmationId ===
                                                        favorite.id ? (
                                                            <div className="flex gap-1 bg-eaoffwhite rounded-md">
                                                                <div
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            favorite.id
                                                                        )
                                                                    }
                                                                    className="text-green-500 hover:bg-green-500 hover:text-white px-2 rounded-md cursor-pointer border border-green-500"
                                                                >
                                                                    <Check
                                                                        size={
                                                                            12
                                                                        }
                                                                        strokeWidth={
                                                                            3
                                                                        }
                                                                        className="inline"
                                                                    />
                                                                </div>
                                                                <div
                                                                    onClick={
                                                                        cancelDelete
                                                                    }
                                                                    className="text-red-500 hover:bg-red-500 hover:text-eaoffwhite px-2 rounded-md cursor-pointer mr-2 border border-red-500"
                                                                >
                                                                    <X
                                                                        size={
                                                                            12
                                                                        }
                                                                        strokeWidth={
                                                                            3
                                                                        }
                                                                        className="inline"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <span className="[li:hover_&]:hidden">
                                                                    {
                                                                        favorite.place.address?.split(
                                                                            ','
                                                                        )[1]
                                                                    }
                                                                </span>
                                                                <span
                                                                    onClick={() =>
                                                                        setConfirmationId(
                                                                            favorite.id
                                                                        )
                                                                    }
                                                                    className="hidden [li:hover_&]:inline bg-red-500 hover:bg-eaoffwhite hover:text-red-500 text-sm text-eaoffwhite rounded-md px-2"
                                                                >
                                                                    <span className="">
                                                                        <X
                                                                            size={
                                                                                14
                                                                            }
                                                                            strokeWidth={
                                                                                3
                                                                            }
                                                                            className="inline"
                                                                        />
                                                                    </span>
                                                                </span>
                                                            </>
                                                        )}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </SignedIn>
                                    <SignedOut>
                                        <p className="text-left text-eaorange text-xs">
                                            sign in to manage your favorite
                                            places
                                        </p>
                                    </SignedOut>
                                </CollapsibleContent>
                            )}
                        </SidebarGroupContent>
                    </Collapsible>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="bg-eagreen text-eaoffwhite">
                <SidebarMenu>
                    <SidebarMenuItem className="my-2 text-sm">
                        {state === 'collapsed' ? (
                            <img
                                src={LogoLight}
                                alt="eat around logo"
                                className="w-8"
                            />
                        ) : (
                            <div>Eat Around © {new Date().getFullYear()}</div>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
