'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';
import { Button } from '@/shared/components/ui/button';

const themeIcons: Record<'light' | 'dark' | 'system', React.ElementType> = {
    light: Sun,
    dark: Moon,
    system: Monitor,
};

// допустимые значения
const themeList = ['light', 'dark', 'system'] as const;
type ThemeMode = (typeof themeList)[number];

export function ThemeCycleButton({ className = '' }: { className?: string }) {
    const { theme: currentTheme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    // проверяем, входит ли в union
    const effective: ThemeMode =
        themeList.includes(currentTheme as ThemeMode)
            ? (currentTheme as ThemeMode)
            : 'system';

    const cycleTheme = () => {
        const i = themeList.indexOf(effective);
        setTheme(themeList[(i + 1) % themeList.length]);
    };

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="sm"
                className={`w-full justify-start text-sm ${className}`}
                aria-live="off"
            >
                <span className="mr-2 inline-block h-4 w-4 rounded-sm bg-current/30" />
                <span suppressHydrationWarning>Тема</span>
            </Button>
        );
    }

    const iconKey: ThemeMode =
        effective === 'system'
            ? (resolvedTheme as ThemeMode) || 'system'
            : effective;

    const Icon = themeIcons[iconKey];

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={cycleTheme}
            className={`w-full justify-start text-sm ${className}`}
        >
            <Icon className="mr-2 h-4 w-4" />
            <span suppressHydrationWarning>
        Тема:{' '}
                {effective === 'light'
                    ? 'Светлая'
                    : effective === 'dark'
                        ? 'Тёмная'
                        : 'Система'}
      </span>
        </Button>
    );
}
