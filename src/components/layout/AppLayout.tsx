import type { ReactNode } from "react";
import { useEffect } from "react";
import { Leaf, Activity, Search, BookOpen, LayoutDashboard } from "lucide-react";

type AppLayoutProps = {
    children: ReactNode;
}

const navigation = [
    { label: "Pregled", href: "#pregled", icon: LayoutDashboard},
    { label: "Makroi", href: "#makroi", icon: Activity},
    { label: "Namirnice", href: "#namirnice", icon: Search},
    { label: "Dnevnik", href: "#dnevnik", icon: BookOpen},
];

function AppLayout({ children }: AppLayoutProps) {

    useEffect(() => {
    window.history.scrollRestoration = "manual";

    if (window.location.hash) {
        window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
        );
    }

    window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#f7faf8] text-[#19312d]">
            <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-gray-200 bg-white p-6 lg:block">
                
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#124638] p-2 text-white">
                        <Leaf size={22}/>        
                    </div>

                    <h1 className="text-2xl font-bold">
                        nutri<span className="text-[#169b74]">rs.</span>
                    </h1>
                </div>

                <nav aria-label="Glavna navigacija" className="mt-12 space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        return(
                            <a href={item.href}
                                key={item.href}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-[#e8f5ee] hover:text-[#124638]"
                            >
                                <Icon size={19}/>
                                <span>{item.label}</span>    
                            </a>
                        );
                    })}
                </nav>
            </aside>

            <div className="min-h-screen lg:ml-64">

                <header className="flex items-center gap-2 border-b border-gray-200 bg-white px-5 py-4 lg:hidden">
                    <Leaf size={24} className="text-[#169b74]"/>

                    <span className="text-xl font-bold">
                        nutrirs.
                    </span>
                </header>
                
                <main className="mx-auto w-full max-w-[1440px] px-4 pb-28 pt-8 sm:px-6 lg:px-8 lg:pb-10 lg:pt-10">
                    {children}
                </main>
            </div>

            <nav
                aria-label="Mobilna navigacija"
                className="fixed inset-x-0 bottom-0 z-50 flex justify-around border-t border-gray-200 bg-white px-2 py-3 lg:hidden"
            >
                {navigation.map((item) => {
                const Icon = item.icon;

                return (
                    <a
                    key={item.href}
                    href={item.href}
                    className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-1 py-2 text-[11px] text-gray-600 hover:bg-[#e8f5ee] hover:text-[#169b74]"
                    >
                        <Icon size={21} />
                        <span>{item.label}</span>
                        </a>
                    );
                })}
            </nav>
        </div>
    );
}

export default AppLayout;