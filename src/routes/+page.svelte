<script lang="ts">
	import { Button } from '../components/Button';
	import { Input } from '../components/Input';
	import { api } from '@/config/api';
	import { UserStore } from '@/config/store/state.svelte';

	let username = $state('');
	let password = $state('');

	const handleSubmitForm = async (event: SubmitEvent) => {
		event.preventDefault()

		const res = await api.get('/api/authentication', {
			headers: {
				Authorization: "Basic " + btoa(username + ':' + password)
			},
		})

		if (res.status === 200) {
			alert(res.data.access.token)
			UserStore.user.token = res.data.access.token
		}
	}

</script>

<section class="main-section">
	<form onsubmit={handleSubmitForm}>
		<div>
			<h1 class="greeting">Добро пожаловать!</h1>
			<h2 class="greeting">Для продолжения работы авторизуйтесь</h2>
		</div>
		<Input placeholder="Введите имя пользователя" value={username} onChange={value => username = value} />
		<Input type="password" placeholder="Введите пароль" value={password} onChange={value => password = value} />
		<Button isDisabled={!password || !username} type="submit">Отправить форму</Button>
	</form>
</section>

<style>
	.main-section {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
	}

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
      background: lightblue;
			border-radius: 12px;
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