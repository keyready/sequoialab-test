<script>
	import { user } from '@/lib/state.svelte';
	import { redirect } from '@sveltejs/kit';

	if (!$user) {
		throw redirect(307, '/');
	}
</script>

<slot />
