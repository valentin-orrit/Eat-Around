import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from './AppSidebar'

export default function Layout({ children, filters, setFilters }) {
    return (
        <SidebarProvider className="flex w-full">
            <AppSidebar filters={filters} setFilters={setFilters} />
            <main className="flex w-full">
                <SidebarTrigger className="text-eablack hover:bg-eagreen hover:text-eaoffwhite  sticky top-4 p-0 m-2" />
                <div className="flex w-full justify-center">{children}</div>
            </main>
        </SidebarProvider>
    )
}
