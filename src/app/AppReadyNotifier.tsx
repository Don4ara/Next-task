'use client';
import { useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

export default function AppReadyNotifier() {
    useEffect(() => {
        invoke('set_complete', { task: 'frontend' }).catch(console.error);
    }, []);
    return null;
}
