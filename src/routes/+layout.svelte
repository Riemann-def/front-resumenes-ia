<script>
	import '../app.css'; // Asegúrate de que está importando el CSS global
	import Navbar from '../components/Navbar.svelte';
	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen w-full h-screen sm:h-auto">
	<Navbar class="md:w-1/4" />
	<main class="flex-grow flex flex-col items-center justify-center p-4 md:w-3/4 mx-auto">
	  {@render children()}
	</main>
  </div>
  