<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { loggedIn } from '$lib/stores/auth';

	$: if (browser && $loggedIn) goto('/users');
	$: if (browser && !$loggedIn) goto('/sign-in');
</script>
