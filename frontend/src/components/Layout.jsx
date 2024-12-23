import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from './AppSidebar'

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
