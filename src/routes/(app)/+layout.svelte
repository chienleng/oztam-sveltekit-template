<script>
	import { AppBar, AppShell, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';

	import { appName } from '$lib/stores/app';
	import Bars4 from '$lib/components/icons/Bars4.svelte';
	import AppFooter from '$lib/components/AppFooter.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	const drawerStore = getDrawerStore();

	function drawerOpen() {
		drawerStore.open({
			meta: { component: Navigation },
			position: 'left',
			rounded: 'rounded-r-2xl',
			bgDrawer: 'backdrop-blur-xl bg-white/60',
			bgBackdrop: 'variant-soft-surface',
			labelledby: 'Menu'
		});
	}
</script>

<Drawer>
	<svelte:component this={$drawerStore.meta.component} />
</Drawer>

<AppShell
	slotSidebarLeft="w-0 lg:w-64 lg:m-4 shadow bg-slate-100 rounded-lg"
	slotPageFooter="m-4 lg:ml-0"
>
	<svelte:fragment slot="header">
		<AppBar class="lg:hidden">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="btn btn-sm mr-4" on:click={drawerOpen}>
						<Bars4 />
					</button>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<h1 class="font-black uppercase">{$appName}</h1>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<AppFooter />
	</svelte:fragment>
</AppShell>
