<script lang="ts">
	import { onMount } from 'svelte';
	import CryptoJS from 'crypto-js';
	import { PUBLIC_API_URL } from '$env/static/public'

	let secretKey = '';
	let encryptionKey = '';
	let showRevealButton = false;
	let secretRetrieved = '';

	function revealSecret() {
		fetch(`${PUBLIC_API_URL}/${secretKey}`)
			.then((response) => {
				if (response.status === 404) {
					alert('Secret not found or already revealed');
					throw new Error('Secret not found');
				}
				return response.json();
			})
			.then((data) => {
				const bytes = CryptoJS.AES.decrypt(data.encryptedSecret, encryptionKey);
				secretRetrieved = bytes.toString(CryptoJS.enc.Utf8);
				showRevealButton = false;
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	function createNewSecret() {
		window.location.href = '/';
	}

	onMount(() => {
		if (window.location.pathname.startsWith('/secret/')) {
			secretKey = window.location.pathname.split('/')[2];
			encryptionKey = window.location.hash.substring(1); // remove the '#' at the start
			showRevealButton = true;
		}
	});
</script>

<div class="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
	<div class="space-y-4">
		<h1 class="text-3xl font-bold">One Time Secret</h1>
		{#if showRevealButton}
			<p class="text-gray-500">
				You have been given a secret. Click the button below to reveal it.
			</p>
			<button
				class="p-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
				on:click={revealSecret}>Reveal the Secret</button
			>
			<button
				class="p-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
				on:click={createNewSecret}>Create new secret</button
			>
		{/if}
		{#if secretRetrieved}
			<p class="text-gray-500">
				You have been given a secret. Make sure to copy it now, as it will be gone forever once you close this page.
			</p>
			<div class="flex flex-col space-y-2">
				<textarea class="border-2 border-gray-300 rounded-md p-2" readonly
					>{secretRetrieved}</textarea
				>
				<button
					class="p-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
					on:click={createNewSecret}>Create new secret</button
				>
			</div>
		{/if}
	</div>
</div>
