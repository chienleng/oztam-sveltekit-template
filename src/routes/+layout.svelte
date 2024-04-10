<script>
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { initializeStores, storePopup, Toast } from '@skeletonlabs/skeleton';
	import '../app.css';

	import AppFooter from '$lib/components/AppFooter.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
</script>

<Toast rounded="rounded-lg" position="t" />

<slot />

<div class="p-4">
	<AppFooter />
</div>
