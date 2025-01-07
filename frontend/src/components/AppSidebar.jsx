import { Link } from 'react-router-dom'
import { Home, LogIn, Gauge, ChevronDown, Heart, Filter } from 'lucide-react'
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
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from '@clerk/clerk-react'
import { useUserData } from '../hooks/useUserData'
import LogoLight from '../assets/eat-around-logo-light.svg'

export default function AppSidebar({ filters, setFilters }) {
    const { userData } = useUserData()
    const { state, setOpen } = useSidebar()

    function toggleFilter(filterName) {
        setFilters((prevFilters) =>
            prevFilters.map((f) =>
                f.name === filterName ? { ...f, isActive: !f.isActive } : f
            )
        )
    }

    ;<CollapsibleContent className="text-left text-sm ml-6">
        {filters.map((filter) => (
            <button
                key={filter.name}
                className={`flex my-1 ${
                    filter.isActive
                        ? 'hover:text-eaogreyaccent'
                        : 'text-eaogreymute hover:text-eaogreymute'
                }`}
                onClick={() => toggleFilter(filter.name)}
            >
                {filter.name}
            </button>
        ))}
    </CollapsibleContent>

    return (
        <Sidebar collapsible="icon" className="bg-eagreen">
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
                                className="text-eaoffwhite hover:bg-eaorange px-3 rounded-full text-base"
                            >
                                <Home />
                                Home
                            </Link>
                        </SidebarMenuButton>

                        <SidebarMenuButton asChild>
                            {userData && userData.is_admin && (
                                <Link
                                    to="/dashboard"
                                    className="text-eaoffwhite hover:bg-eaorange px-3 rounded-full text-base"
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
                                <CollapsibleTrigger>
                                    {state === 'collapsed' ? (
                                        <Filter onClick={() => setOpen(true)} />
                                    ) : (
                                        <Filter />
                                    )}
                                    Filters
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarMenuButton>
                            {state === 'collapsed' ? null : (
                                <CollapsibleContent className="text-left text-base ml-6">
                                    <ul>
                                        {filters.map((filter) => (
                                            <li
                                                key={filter.name}
                                                onClick={() =>
                                                    toggleFilter(filter.name)
                                                }
                                                className={`flex justify-between items-center list-none group hover:bg-eaoffwhite hover:cursor-pointer rounded-md px-2 ${
                                                    filter.isActive
                                                        ? 'text-eaorange'
                                                        : 'text-eaogreymute'
                                                }`}
                                            >
                                                <span>{filter.name}</span>
                                                {filter.isActive && (
                                                    <span className="hidden [li:hover_&]:inline text-sm text-red-500">
                                                        x
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
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
                                <CollapsibleTrigger>
                                    {state === 'collapsed' ? (
                                        <Heart onClick={() => setOpen(true)} />
                                    ) : (
                                        <Heart />
                                    )}
                                    Likes
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarMenuButton>
                            {state === 'collapsed' ? null : (
                                <CollapsibleContent className="text-left ml-6">
                                    <SidebarContent>One</SidebarContent>
                                    <SidebarContent>Two</SidebarContent>
                                    <SidebarContent>Three</SidebarContent>
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
