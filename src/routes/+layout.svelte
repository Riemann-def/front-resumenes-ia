<script>
	import '../app.css'; // Asegúrate de que está importando el CSS global
	import Navbar from '../components/Navbar.svelte';
	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
	<Navbar />
	<main class="flex-grow flex items-center justify-center p-4">
		{@render children()}
	</main>
</div>
