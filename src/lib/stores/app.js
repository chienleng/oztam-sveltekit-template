import { formatRelative } from 'date-fns';
import { readable, writable, derived } from 'svelte/store';

export const appName = readable('Voz Stream');

/** @type {import('svelte/store').Readable<import('@skeletonlabs/skeleton').DrawerSettings>} */
export const drawerOptions = readable({
	position: 'right',
	rounded: 'rounded-l',
	bgDrawer: 'backdrop-blur-xl bg-white/60',
	bgBackdrop: 'variant-soft-surface'
});

export const lastRefreshed = writable(new Date());
export const lastRefreshedFormatted = derived(lastRefreshed, ($lastRefreshed) => {
	return formatRelative($lastRefreshed, new Date());
});
