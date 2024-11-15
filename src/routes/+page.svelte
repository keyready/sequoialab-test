<script lang="ts">
    import { Input } from '@/components/Input';
    import { api } from '@/config/api';
    import { goto } from '$app/navigation';
    import { Page } from '@/components/Page';

    import { USER_TOKEN } from '@/config/consts';
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { user } from '@/lib/state.svelte.js';
    import { Loader } from '@/components/Loader';

    // стейт для хранения кредов и флажок загрузки
    let username: string = $state('');
    let password: string = $state('');
    let isLoading: boolean = $state(false);

    const handleSubmitForm = async (event: SubmitEvent) => {
        /**
         * обработчик отправки формы. Принимает ивент отправки формы. Использует креды из переменных
         */

        // отменяем дефолтное поведение браузера (перезагрузку страницы) при отправке формы
        event.preventDefault();

        isLoading = true;

        // шлем запрос на авторизацию пользователя
        const res = await api.get('/api/authentication', {
            headers: {
                Authorization: 'Basic ' + btoa(username + ':' + password),
            },
        });

        isLoading = false;

        if (res.status === 200) {
            // в случае успеха записываем токен в локалстораге
            localStorage.setItem(USER_TOKEN, res.data.access.token);
            user.set({ token: res.data.access.token, username: username });
            // отправляем на главную страницу
            goto('/main');
        }
    };
</script>

<Page>
    <form
        class="w-3/4 h-full justify-self-center items-center justify-center flex flex-col gap-5"
        onsubmit={handleSubmitForm}
    >
        <div>
            <h1 class="text-3xl font-bold text-center text-main underline">Добро пожаловать!</h1>
            <h2 class="text-2xl font-bold text-center text-main">
                Для продолжения работы авторизуйтесь
            </h2>
        </div>
        <Input
            className="w-2/5"
            placeholder="Введите имя пользователя"
            value={username}
            onChange={(value) => (username = value)}
        />
        <Input
            className="w-2/5"
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(value) => (password = value)}
        />

        <button
            class="btn btn-md bg-main rounded-md variant-filled"
            disabled={!password || !username || isLoading}
            type="submit">Авторизоваться</button
        >

        <!--        Отображаю лоадер, чтобы пользователь не думал, что сайт упал -->
        {#if isLoading}
            <Loader />
        {/if}
    </form>
</Page>
