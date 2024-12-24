import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from './AppSidebar'

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-screen flex">
                <SidebarTrigger className="text-eablack hover:bg-eagreen hover:text-eaoffwhite" />
                {children}
            </main>
        </SidebarProvider>
    )
}
