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

<div class="flex flex-col">
	<NuevoResumen on:newsummary={handleNewSummary} />
	<Historial {summaries} />
</div>
