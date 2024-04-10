<script>
	import { page } from '$app/stores';
	import { popup } from '@skeletonlabs/skeleton';

	import { appName } from '$lib/stores/app';
	import { userEmail } from '$lib/stores/auth';
	import ArrowLeftOnRect from '$lib/components/icons/ArrowLeftOnRect.svelte';
	import ArrowSmallRight from '$lib/components/icons/ArrowSmallRight.svelte';
	import UserCircle from '$lib/components/icons/UserCircle.svelte';
	import LockClosed from '$lib/components/icons/LockClosed.svelte';

	/** @type {{ name: string, url: string, children?: * }[]} */
	const navList = [
		{
			name: 'Users',
			url: '/users/'
		}
	];

	$: classesActive = (/** @type {string} */ href) =>
		href === $page.url.pathname ? '!bg-primary-600 !text-primary-100 font-bold shadow-xl' : '';
	$: isActive = (/** @type {string} */ href) => href === $page.url.pathname;

	function drawerClose() {
		// drawerStore.close();
	}
</script>

<nav class="grid h-full grid-cols-1 content-between p-4">
	<div style="contents">
		<h2 class="p-3 text-center text-lg font-extrabold uppercase text-primary-600 drop-shadow-sm">
			{$appName}
		</h2>

		<div
			class="mb-4 grid grid-cols-1 place-items-center gap-2 border-b pb-4 text-xs text-slate-600"
		>
			<UserCircle classes="w-12 h-12 text-slate-600 drop-shadow" />
			<span>{$userEmail}</span>
		</div>

		<ul class="flex flex-col gap-1">
			{#each navList as { url, name, children }}
				<li>
					<a href={url} class={`${classesActive(url)} nav-link`} on:click={drawerClose}>
						<span>{name}</span>
						{#if isActive(url)}
							<span><ArrowSmallRight /></span>
						{/if}
					</a>

					{#if children}
						<ul class="ml-4 mt-1 border-l pl-2">
							{#each children as { name, url }}
								<li class="mb-1">
									<a href={url} class={`${classesActive(url)} nav-link`} on:click={drawerClose}>
										<span>{name}</span>
										{#if isActive(url)}
											<span><ArrowSmallRight /></span>
										{/if}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	</div>

	<div style="contents">
		<ul class="flex gap-1 text-slate-600">
			{#each [{ name: 'Change Password', href: '/change-password/', icon: LockClosed }, { name: 'Sign Out', href: '/sign-out', icon: ArrowLeftOnRect }] as { name, href, icon }}
				<li class="flex-1">
					<a
						{href}
						class={`${classesActive(href)} profile-link [&>*]:pointer-events-none`}
						use:popup={{
							event: 'hover',
							target: `tipTarget-${name}`,
							placement: 'top'
						}}
						title={name}
						on:click={drawerClose}
					>
						<span class="mx-auto"><svelte:component this={icon} classes="w-6 h-6" /></span>
						<span class="sr-only">{name}</span>
					</a>
					<div
						class="card rounded-lg bg-primary-800 p-3 text-xs text-white"
						data-popup={`tipTarget-${name}`}
					>
						<p>{name}</p>
						<div class="arrow bg-primary-800" />
					</div>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style lang="postcss">
	a:link {
		@apply bg-transparent;
	}
	a.nav-link {
		@apply flex justify-between rounded-lg p-3 text-sm text-surface-600 transition hover:bg-primary-200 hover:text-primary-900;
	}
	a.nav-link:active {
		@apply scale-90 shadow-inner;
	}
	a.profile-link {
		@apply flex w-full flex-col justify-center rounded-xl bg-surface-50 p-3 transition hover:bg-primary-200;
	}
	a.profile-link:active {
		@apply scale-90 shadow-inner;
	}
</style>
