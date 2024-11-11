<script lang="ts">
	import { Button } from '../components/Button';
	import { Input } from '../components/Input';
	import { api } from '@/config/api';
	import { goto } from '$app/navigation';
	import { Page } from '@/components/Page';

	import { USER_TOKEN } from '@/config/consts';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { user } from '@/lib/state.svelte.js';

	let username: string = $state('');
	let password: string = $state('');
	let isLoading: boolean = $state(false);

	const handleSubmitForm = async (event: SubmitEvent) => {
		event.preventDefault();

		isLoading = true;

		const res = await api.get('/api/authentication', {
			headers: {
				Authorization: 'Basic ' + btoa(username + ':' + password)
			}
		});

		isLoading = false;

		if (res.status === 200) {
			localStorage.setItem(USER_TOKEN, res.data.access.token);
			user.set({ token: res.data.access.token, username: username })
			goto('/main');
		}
	};

</script>

<Page>
	<form onsubmit={handleSubmitForm}>
		<div>
			<h1 class="greeting">
				Добро пожаловать!</h1>
			<h2 class="greeting">Для продолжения работы авторизуйтесь</h2>
		</div>
		<Input placeholder="Введите имя пользователя" value={username} onChange={value => username = value} />
		<Input type="password" placeholder="Введите пароль" value={password} onChange={value => password = value} />
		<Button isDisabled={!password || !username || isLoading} type="submit">Отправить форму</Button>
		{#if isLoading}
			<div class="flex items-center bg-opacity-20 bg-black z-50 backdrop-blur-md justify-center fixed top-0 bottom-0 right-0 left-0">
				<div>
					<ProgressRadial
						stroke={40}
						meter="stroke-emerald-500"
						track="stroke-emerald-500/30"
						strokeLinecap="round"
						value={undefined} />
				</div>
			</div>
		{/if}
	</form>
</Page>

<style>
    .greeting {
        text-align: center;
        font-family: Roboto, sans-serif;
        font-size: 18px;
    }

    .greeting:first-child {
        font-size: 24px;
        font-weight: bold;
    }

    form {
        width: 75%;
        height: 50%;
        padding: 12px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
    }
</style>