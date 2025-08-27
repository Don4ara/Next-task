// updateClient.ts
'use client';



/**
 * Проверяет наличие обновления и показывает системное окно:
 *  - "Найдена новая версия vX.Y.Z" (info)
 *  - "Обновлений не найдено" (info)
 *  - Ошибка проверки (error)
 */
export async function logUpdateAvailability() {
    try {
        const [{ check }, { message }] = await Promise.all([
            import('@tauri-apps/plugin-updater'),
            import('@tauri-apps/plugin-dialog'),
        ]);

        console.log('[Updater] Checking for updates…');
        const update = await check();

        if (!update) {
            console.log('[Updater] No update available');
            await message('Обновлений не найдено.', {
                title: 'Проверка обновлений',
                kind: 'info',
            });
            return;
        }

        // update.version / update.body / update.date доступны в v2
        console.log(`[Updater] Update available: v${update.version}`);
        await message(
            `Найдена новая версия: v${update.version}${update.body ? `\n\nИзменения:\n${update.body}` : ''}`,
            { title: 'Доступно обновление', kind: 'info' }
        );

        // Если позже захочешь автоскачивание и установку:
        // const { relaunch } = await import('@tauri-apps/plugin-process');
        // await update.downloadAndInstall();
        // await relaunch();

    } catch (e: unknown) {
        console.error('[Updater] Check failed:', e);

        const errorMsg =
            e instanceof Error ? e.message : typeof e === 'string' ? e : String(e);

        try {
            const { message } = await import('@tauri-apps/plugin-dialog');
            await message(`Ошибка при проверке обновлений:\n${errorMsg}`, {
                title: 'Ошибка обновления',
                kind: 'error',
            });
        } catch {
            if (typeof window !== 'undefined') {
                window.alert(`Ошибка при проверке обновлений: ${errorMsg}`);
            }
        }
    }
}
