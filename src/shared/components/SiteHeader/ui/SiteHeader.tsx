"use client";

import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Separator } from "@/shared/components/ui/separator";
import { usePathname } from "next/navigation";

export function SiteHeader() {
    const pathname = usePathname();
    const lastSegment = pathname?.split("/").filter(Boolean).pop() || "home";

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium capitalize">{lastSegment}</h1>
                <div className="ml-auto flex items-center gap-2" />
            </div>
        </header>
    );
}
