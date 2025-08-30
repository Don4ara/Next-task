import type {Metadata} from 'next'


export const metadata: Metadata = {
    title: 'Создать аккаунт'
}

export default function HomePage() {
    const userName = "Даниил";
    const totalTasks = 12;
    const archivedTasks = 5;
    const activeTasks = totalTasks - archivedTasks;

    return (
        <div className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Привет, {userName}! 👋
            </h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                Рад видеть тебя снова. Вот сводка по твоим задачам:
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
                <div
                    className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm transition-colors dark:border-neutral-700 dark:bg-neutral-950">
                    <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        Всего задач
                    </h2>
                    <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        {totalTasks}
                    </p>
                </div>

                <div
                    className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm transition-colors dark:border-neutral-700 dark:bg-neutral-950">
                    <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        Активные задачи
                    </h2>
                    <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        {activeTasks}
                    </p>
                </div>

                <div
                    className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm transition-colors dark:border-neutral-700 dark:bg-neutral-950">
                    <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        Архив
                    </h2>
                    <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        {archivedTasks}
                    </p>
                </div>
            </div>
            <div className="mt-12 border-t border-dashed border-neutral-300 dark:border-neutral-700"/>
            <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">
                Управляй задачами, чтобы видеть здесь обновлённую статистику.
            </p>
        </div>
    );
}