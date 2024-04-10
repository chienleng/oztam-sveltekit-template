<script>
	import { createEventDispatcher } from 'svelte';
	import IconEye from '$lib/components/icons/Eye.svelte';
	import IconEyeSlash from '$lib/components/icons/EyeSlash.svelte';
	export let value = '';
	export let disabled = false;
	export let required = false;

	const dispatch = createEventDispatcher();

	let showPassword = false;

	$: type = showPassword ? 'text' : 'password';

	/**
	 * @param {Event} evt
	 */
	function input(evt) {
		dispatch('input', {
			// @ts-ignore
			value: evt.target.value
		});
	}
</script>

<span class="relative">
	<input
		class="input font-bold text-gray-700"
		{type}
		{required}
		{disabled}
		{value}
		on:input={input}
	/>

	<button
		class="btn absolute right-0"
		type="button"
		on:click={() => (showPassword = !showPassword)}
	>
		{#if showPassword}
			<span class="sr-only">Hide password</span>
			<IconEye classes="w-6 h-6 text-slate-500" />
		{:else}
			<span class="sr-only">Show password</span>
			<IconEyeSlash classes="w-6 h-6 text-slate-500" />
		{/if}
	</button>
</span>
