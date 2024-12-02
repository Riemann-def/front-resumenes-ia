<script>
	import { writable } from 'svelte/store';
	import Historial from '../components/Historial.svelte';
	import NuevoResumen from '../components/NuevoResumen.svelte';

	let { data } = $props();
	let summaries = writable(data.summaries || []);

	// Agregar nuevo resumen al historial
	function handleNewSummary(event) {
		summaries.update((current) => [event.detail, ...current]);
	}
</script>

<div class="flex flex-col w-full max-w-6xl mx-auto space-y-8">
	<NuevoResumen class="w-full" on:newsummary={handleNewSummary} />
	<Historial class="w-full md:w-3/5" {summaries} />
  </div>
  
