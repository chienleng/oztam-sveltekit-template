<script>
	import { onMount } from 'svelte';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	import { appName } from '$lib/stores/app';
	import { logout, loggedIn } from '$lib/stores/auth';

	$: if (browser && !$loggedIn) {
		setTimeout(() => {
			goto('/sign-in');
		}, 2000);
	}

	onMount(() => logout());
</script>

<svelte:head>
	<title>Sign out — {$appName}</title>
</svelte:head>

<main class="flex items-center justify-center px-2" style="height: calc(100vh - 69px)">
	<div>
		<p class="mb-2">Signing you out...</p>
		<ProgressBar meter="bg-secondary-500" track="bg-secondary-500/30" value={undefined} />
	</div>
</main>
