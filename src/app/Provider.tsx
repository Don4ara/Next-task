// Providers.tsx
'use client';

import React, { useEffect } from 'react';
import {logUpdateAvailability} from "@/app/lib/updateClient";

export default function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        logUpdateAvailability();
    }, []);

    return <>{children}</>;
}
