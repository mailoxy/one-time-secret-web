<script lang="ts">
	import CryptoJS from 'crypto-js';
	import { PUBLIC_API_URL } from '$env/static/public';

	let secret = '';
	let secretKey = '';
	let oneTimeSecretUrl = '';

	function createSecret() {
		const encryptionKey = CryptoJS.lib.WordArray.random(256 / 8).toString();
		const encryptedSecret = CryptoJS.AES.encrypt(secret, encryptionKey).toString();
		if (secret === '') {
			alert('Please enter a secret');
			return;
		}
		fetch(PUBLIC_API_URL, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ encryptedSecret })
		})
			.then((response) => response.json())
			.catch((error) => {
				console.error('Error:', error);
				alert('Something went wrong. Please try again later.');
			})
			.then((data) => {
				secretKey = data.secretKey;
				const hostname = window.location.hostname;
				const scheme = window.location.protocol;
				const port = window.location.port;
				if (port) {
					oneTimeSecretUrl = `${scheme}//${hostname}:${port}/secret/${secretKey}#${encryptionKey}`;
					return;
				}
				oneTimeSecretUrl = `${scheme}//${hostname}/secret/${secretKey}#${encryptionKey}`;
			});
	}

	function createNewSecret() {
		window.location.href = '/';
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(oneTimeSecretUrl);
	}
</script>

<svelte:head>
	<title>One Time Secret | Create</title>
</svelte:head>

<div class="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
	<div class="space-y-4">
		<h1 class="text-3xl font-bold">One Time Secret</h1>
		{#if !oneTimeSecretUrl}
			<p class="text-gray-500">
				Create a secret and share it with your friends or colleagues. Once they have seen it, it will
				be gone forever.
			</p>
			<div class="flex flex-col space-y-2">
				<textarea
					class="border-2 border-gray-300 rounded-md p-2"
					bind:value={secret}
					placeholder="Type your secret here..."
				/>
				<button
					class="p-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
					on:click={createSecret}>Create Secret</button
				>
			</div>
		{/if}
		{#if oneTimeSecretUrl}
			<p class="text-gray-500">
				Your secret has been created. Share the link below with your friends or colleagues.
			</p>
			<div class="flex flex-col space-y-2">
				<input class="border-2 border-gray-300 rounded-md p-2" bind:value={oneTimeSecretUrl} />
				<button
					class="p-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
					on:click={copyToClipboard}>Copy to Clipboard</button
				>
				<button
					class="p-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
					on:click={createNewSecret}>Create new secret</button
				>
			</div>
		{/if}
	</div>
</div>
