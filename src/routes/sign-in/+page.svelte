<script>
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { appName } from '$lib/stores/app';
	import { login, loggedIn, setToken } from '$lib/stores/auth';

	import IconArrowRightOnRect from '$lib/components/icons/ArrowRightOnRect.svelte';
	import ActionButton from '$lib/components/ActionButton.svelte';

	/** @type {HTMLFormElement} */
	let form;
	let signingIn = false;

	const toastStore = getToastStore();

	$: if (browser && $loggedIn) goto('/');

	async function onLoginSubmitted() {
		const data = new FormData(form);
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (email && password) {
			try {
				signingIn = true;
				const res = await login(email, password);
				setToken(res.token);
			} catch (e) {
				console.log('login failed', e);
				showToastError();
			} finally {
				signingIn = false;
			}
		}
	}

	function showToastError() {
		console.log('here');
		toastStore.trigger({
			message: 'There is an issue with your email or password. Please check and retry.',
			background: 'variant-filled-error',
			autohide: false
		});
	}
</script>

<svelte:head>
	<title>Sign in — {$appName}</title>
</svelte:head>

<form
	bind:this={form}
	method="POST"
	on:submit|preventDefault={onLoginSubmitted}
	class="flex items-center justify-center px-2"
	style="height: calc(100vh - 69px)"
>
	<fieldset class="w-full sm:w-1/2 lg:w-1/3">
		<legend class="mb-3">
			<h1 class="ml-3 font-bold uppercase">{$appName}</h1>
		</legend>
		<div class="flex flex-col gap-3">
			<div class="relative -space-y-px rounded-md shadow-sm">
				<label>
					<span class="sr-only">Email address</span>
					<input
						name="email"
						class="rounded-t-md"
						title="Your email"
						type="email"
						autocomplete="email"
						required
						placeholder="Email address"
						disabled={signingIn}
						value="steven@steventan.com.au"
					/>
				</label>

				<label>
					<span class="sr-only">Password</span>
					<input
						name="password"
						class="rounded-b-md"
						title="Your password"
						type="password"
						required
						placeholder="Password"
						disabled={signingIn}
						value="stan"
					/>
				</label>
			</div>

			<ActionButton
				actionIcon={IconArrowRightOnRect}
				actionInProgress={signingIn}
				actionLabels={{ default: 'Sign in', inProgress: 'Signing you in...' }}
			/>
		</div>
	</fieldset>
</form>

<style lang="postcss">
	label span {
		@apply text-xs font-light;
	}
	label input {
		@apply relative w-full border-0 text-tertiary-600 ring-1 
			ring-inset ring-gray-100
			placeholder:text-xs placeholder:text-gray-400
			focus:z-10 focus:ring-2 focus:ring-inset
			focus:ring-primary-600 disabled:opacity-60 dark:bg-[rgb(var(--color-surface-700))] dark:text-[rgb(var(--color-surface-200))];
	}
</style>
