import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from './AppSidebar'

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-screen">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
