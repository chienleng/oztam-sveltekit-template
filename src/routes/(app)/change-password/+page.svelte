<script>
	import { getToastStore } from '@skeletonlabs/skeleton';

	import { appName } from '$lib/stores/app';
	import { changePassword, changingPassword } from '$lib/stores/auth';
	import ActionButton from '$lib/components/ActionButton.svelte';
	import PasswordInput from '$lib/components/PasswordInput.svelte';

	let currentPassword = '';
	let newPassword = '';

	const toastStore = getToastStore();

	async function onPasswordChange() {
		const success = await changePassword({
			password: currentPassword,
			newPassword
		});

		if (success) {
			currentPassword = '';
			newPassword = '';
			toastStore.trigger({
				message: 'Your password is changed.',
				background: 'variant-filled-primary',
				autohide: true
			});
		} else {
			showToastError();
		}
	}

	function showToastError() {
		toastStore.trigger({
			message: 'There is an issue changing your password. Please check and retry.',
			background: 'variant-filled-error',
			autohide: true
		});
	}
</script>

<svelte:head>
	<title>Change Password — {$appName}</title>
</svelte:head>

<form
	method="POST"
	on:submit|preventDefault={onPasswordChange}
	class="flex items-center justify-center px-2"
	style="height: calc(100vh - 69px)"
>
	<fieldset class="w-full max-w-screen-sm">
		<div class="flex flex-col gap-2">
			<label for="currentPassword" class="label">
				<span>Current Password</span>
				<PasswordInput
					required
					value={currentPassword}
					disabled={$changingPassword}
					on:input={(evt) => (currentPassword = evt.detail.value)}
				/>
			</label>

			<label for="newPassword" class="label">
				<span>New Password</span>
				<PasswordInput
					required
					value={newPassword}
					disabled={$changingPassword}
					on:input={(evt) => (newPassword = evt.detail.value)}
				/>
			</label>

			<hr />
			<ActionButton
				actionInProgress={$changingPassword}
				actionLabels={{ default: 'Change Password', inProgress: 'Updating...' }}
			/>
		</div>
	</fieldset>
</form>
