// updateClient.ts
'use client';

function isTauriRuntime() {
    return typeof window !== 'undefined' && '__TAURI__' in window;
}

/**
 * Проверяет наличие обновления и пишет в консоль:
 *  - [Updater] Update available: vX.Y.Z
 *  - [Updater] No update available
 * Ошибки тоже логируются. Ничего не скачивает и не ставит.
 */
export async function logUpdateAvailability() {
    if (!isTauriRuntime()) {
        console.log('[Updater] Not running inside Tauri — skipping check.');
        return;
    }

    try {
        console.log('[Updater] Checking for updates…');
        const { check } = await import('@tauri-apps/plugin-updater');

        const update = await check();

        if (!update) {
            console.log('[Updater] No update available');
            return;
        }

        console.log(`[Updater] Update available: v${update.version}`);
        // при желании можно ещё вывести описание:
        // console.log(`[Updater] Notes:\n${update.body ?? '—'}`);
    } catch (e) {
        console.error('[Updater] Check failed:', e);
    }
}
