"use client";

import * as React from "react";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { SiteHeader } from "@/shared/components/SiteHeader/ui/SiteHeader";
import {AppSidebar} from "@/shared/components/AppSidebar /ui/AppSidebar";

export function SidebarLayout({ children }: React.PropsWithChildren) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            {/* как в примере shadcn: режим иконок */}
            <AppSidebar collapsible="icon" />
            <SidebarInset>
                <SiteHeader />
                <main className="flex flex-1 flex-col p-5">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
