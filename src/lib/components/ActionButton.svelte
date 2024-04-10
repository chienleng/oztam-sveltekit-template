<script>
	import ProgressSpinner from '$lib/components/icons/ProgressSpinner.svelte';
	export let actionLabels = {
		inProgress: 'Signing you in...',
		default: 'Sign in'
	};
	export let actionInProgress = false;
	export let actionDisabled = false;
	/** @type {*} */
	export let actionIcon = null;
</script>

{#if actionInProgress}
	<button class="variant-filled-primary btn w-full text-white" disabled type="submit">
		{actionLabels.inProgress}
		<span class="ml-2"><ProgressSpinner /></span>
	</button>
{:else}
	<button
		class="variant-filled-primary btn w-full text-white"
		disabled={actionDisabled}
		type="submit"
		on:submit
	>
		{actionLabels.default}

		{#if actionIcon}
			<span class="ml-2">
				<svelte:component this={actionIcon} />
			</span>
		{/if}
	</button>
{/if}
