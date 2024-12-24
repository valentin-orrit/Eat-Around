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

export default function AppSidebar() {
    const { userData } = useUserData()
    const { state, setOpen } = useSidebar()

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
                                <CollapsibleContent className="text-left text-sm ml-4">
                                    <SidebarContent>One</SidebarContent>
                                    <SidebarContent>Two</SidebarContent>
                                    <SidebarContent>Three</SidebarContent>
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
                                <CollapsibleContent className="text-left ml-4">
                                    <SidebarContent>One</SidebarContent>
                                    <SidebarContent>Two</SidebarContent>
                                    <SidebarContent>Three</SidebarContent>
                                </CollapsibleContent>
                            )}
                        </SidebarGroupContent>
                    </Collapsible>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem className="bg-eagreen text-eaoffwhite my-2 text-sm">
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
