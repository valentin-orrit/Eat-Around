import { Link } from 'react-router-dom'
import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    LogIn,
    Gauge,
    ChevronDown,
    Heart,
} from 'lucide-react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
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

export default function AppSidebar() {
    const { userData } = useUserData()

    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()

    return (
        <Sidebar collapsible="icon" className="bg-eagreen gap-y-0">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <div id="user-button" className="py-4">
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
                            {userData && userData.is_admin && (
                                <Link
                                    to="/dashboard"
                                    className="text-eaoffwhite hover:bg-eaorange px-3 rounded-full text-sm font-medium"
                                >
                                    <Gauge />
                                    Dashboard
                                </Link>
                            )}
                        </SidebarMenuButton>
                    </SidebarGroupContent>
                </SidebarGroup>
                <Collapsible
                    defaultOpen
                    className="group/collapsible text-eaoffwhite "
                >
                    <SidebarGroup>
                        <SidebarMenuButton
                            asChild
                            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-eaorange "
                        >
                            <CollapsibleTrigger>
                                {state === 'collapsed' ? (
                                    <Heart
                                        className="mr-2"
                                        onClick={() => setOpen(true)}
                                    />
                                ) : (
                                    <Heart className="mr-2" />
                                )}
                                Likes
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarMenuButton>
                        {state === 'collapsed' ? null : (
                            <CollapsibleContent className="text-left pl-4 ">
                                <SidebarContent>One</SidebarContent>
                                <SidebarContent>Two</SidebarContent>
                                <SidebarContent>Three</SidebarContent>
                            </CollapsibleContent>
                        )}
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
        </Sidebar>
    )
}
