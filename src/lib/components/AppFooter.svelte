<script>
	import { version } from '$app/environment';
</script>

<div class="flex items-center justify-between border-t border-slate-300 p-3 pb-0 text-slate-400">
	<span class="text-xs">
		&copy; OzTAM {new Date().getFullYear()}
	</span>
	<div class="flex gap-1">
		<span class="variant-soft-tertiary chip px-2 py-1 text-slate-500">app: {version}</span>
	</div>
</div>
