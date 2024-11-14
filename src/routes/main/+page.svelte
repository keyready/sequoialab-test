<script lang="ts">
    import { Page } from '@/components/Page';
    import { USER_TOKEN } from '@/config/consts';
    import { goto } from '$app/navigation';
    import { api } from '@/config/api';
    import { type PaginationSettings, Paginator, ProgressRadial } from '@skeletonlabs/skeleton';
    import { Input } from '@/components/Input';
    import { Modal } from '@/components/Modal';

    // самая просто проверка на авторизацию - наличие токена в локалстораге
    // я полностью понимаю, что это неверно, но при первом же запросе сервер вернет 401,
    // и "моковый" токен удалится
    const token = localStorage.getItem(USER_TOKEN);
    if (!token) goto('/');

    let isLoading: boolean = $state(false);

    // интерфейс "опасного" груза
    interface IMDGItem {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        col17: string;
        col19: string;
    }

    // массив опасных грузов
    let IMDG: IMDGItem[] = $state([]);
    // Выбранный груз для просмотра
    let selectedIMDG: Partial<IMDGItem> = $state({});
    // поисковая строка для фильтрации
    let searchString: string = $state('');

    // настройки пагинатора
    // мне нужна опция amounts как массив,
    // поэтому я использовал Omit, чтобы убрать это поле из оригинального типа
    let paginationSettings: Omit<PaginationSettings, 'amounts'> & { amounts: number } = $state({
        page: 0,
        limit: 5,
        size: 0,
        amounts: 2,
    });

    // обработка смены страницы пагинатора
    const handlePageChange = async (page: { detail: number }) => {
        isLoading = true;
        const res = await api.get(`/api/imdg?perPage=5&page=${page.detail}&search=${searchString}`);
        if (res.status === 200) {
            IMDG = res.data;
        }
        isLoading = false;
    };

    // поиск грузов по подстроке
    const filterResults = async () => {
        isLoading = true;
        const res = await api.get(`/api/imdg?perPage=5&search=${searchString}`);
        if (res.status === 200) {
            IMDG = res.data;
        }
        isLoading = false;
    };

    // первоначальный запрос на получение первых 5 грузов
    const getIMGDData = async () => {
        isLoading = true;

        const res = await api.get(`/api/imdg?perPage=5&page=1`);
        if (res.status === 200) {
            IMDG = res.data;
        }
        isLoading = false;
    };

    getIMGDData();

    // получаем общее количество грузов (для пагинатора)
    const getTotalItems = async () => {
        isLoading = true;
        const res = await api.get(`/api/imdg/count?search=${searchString}`);
        if (res.status === 200) {
            paginationSettings.size = res.data;
        }
        isLoading = false;
    };

    getTotalItems();

    // при рендере компонента
    $effect(() => {
        filterResults();
        getTotalItems();
    });
</script>

<Page>
    <div class="flex flex-col justify-center items-center">
        <h1 class="font-bold text-center text-main text-4xl mb-10">Опасные вещества</h1>

        {#if isLoading}
            <div
                class="flex items-center bg-opacity-20 bg-black z-50 backdrop-blur-md justify-center fixed top-0 bottom-0 right-0 left-0"
            >
                <div>
                    <ProgressRadial
                        stroke={40}
                        meter="stroke-main"
                        track="stroke-main/30"
                        strokeLinecap="round"
                        value={undefined}
                    />
                </div>
            </div>
        {/if}

        {#if IMDG.length}
            <div class="w-full flex gap-10">
                <div class="">
                    <Input
                        value={searchString}
                        onChange={(value) => (searchString = value)}
                        placeholder="Строка поиска"
                    />
                </div>
                <div class="table-container w-full h-[75%]">
                    <table class="w-full table table-hover">
                        <thead>
                            <tr>
                                <th class="text-main">ID</th>
                                <th class="text-main">Название</th>
                                <th class="text-main">Создано</th>
                                <th class="text-main">Изменено</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each IMDG as item}
                                <tr class="cursor-pointer" onclick={() => (selectedIMDG = item)}>
                                    <td>{item.id}</td>
                                    <td>{item.name.slice(0, 105)}...</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td>{new Date(item.updatedAt).toLocaleDateString()}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                    <div class="mt-6 w-full flex justify-end">
                        <Paginator
                            buttonClasses="bg-main !hover:bg-main"
                            disabled={isLoading}
                            showNumerals
                            bind:settings={paginationSettings}
                            on:page={handlePageChange}
                            showFirstLastButtons={false}
                            showPreviousNextButtons={true}
                        />
                    </div>
                </div>
            </div>
        {:else}
            <div class="w-full h-[75%] flex gap-10">
                <div class="">
                    <Input
                        value={searchString}
                        onChange={(value) => (searchString = value)}
                        placeholder="Строка поиска"
                    />
                </div>
                <h1 class="w-[75%] h-[75%]">По заданным параметрам ничего не найдено</h1>
            </div>
        {/if}

        <Modal setIsOpened={() => (selectedIMDG = {})} isOpened={!!selectedIMDG.id}>
            <div class="flex flex-col gap-2">
                <h1 class="text-xl font-bold text-black/70">{selectedIMDG.name}</h1>
                <p class="text-start">Класс: {selectedIMDG.col17}</p>
                <p class="text-start">Тип: {selectedIMDG.col19}</p>
            </div>
        </Modal>
    </div>
</Page>
