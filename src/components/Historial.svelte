<script>
	import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	export let summaries;
    console.log(summaries)

	// Ordenar summaries por fecha, la más reciente primero
	$: sortedSummaries = $summaries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

	// Agrupar summaries por día
	function groupSummariesByDate(summaries) {
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		const groups = summaries.reduce((acc, summary) => {
			const date = new Date(summary.created_at);
			const isToday = date.toDateString() === today.toDateString();
			const isYesterday = date.toDateString() === yesterday.toDateString();
			const groupKey = isToday
				? 'Hoy'
				: isYesterday
					? 'Ayer'
					: date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

			if (!acc[groupKey]) acc[groupKey] = [];
			acc[groupKey].push(summary);

			return acc;
		}, {});

		return groups;
	}

	$: groupedSummaries = groupSummariesByDate(sortedSummaries);

	function formatDate(dateString) {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			timeZoneName: 'short'
		};
		const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Obtener la zona horaria del usuario
		return new Date(dateString).toLocaleString(undefined, { ...options, timeZone: userTimeZone });
	}

	// Colores de categoría
	const categoryColors = {
		Salud: 'bg-rose-400 hover:bg-rose-600 text-white',
		Cultura: 'bg-emerald-400 hover:bg-emerald-600 text-white',
		Deportes: 'bg-blue-400 hover:bg-blue-600 text-white',
		Economía: 'bg-yellow-400 hover:bg-yellow-600 text-black',
		Política: 'bg-purple-400 hover:bg-purple-600 text-white',
		Tecnología: 'bg-indigo-400 hover:bg-indigo-600 text-white'
	};

	// Información de niveles de fake news
	const fakeNewsLevels = {
		Ninguno: { color: 'bg-green-500', progress: 0 },
		Bajo: { color: 'bg-yellow-500', progress: 33 },
		Medio: { color: 'bg-orange-500', progress: 66 },
		Alto: { color: 'bg-red-500', progress: 100 }
	};
</script>

{#if $summaries.length > 0}
	<div class="container mx-auto py-8">
		<h1 class="mb-6 text-2xl font-bold">Historial de Noticias</h1>

		{#each Object.entries(groupedSummaries) as [date, summaries]}
			<div class="mb-8">
				<!-- Encabezado de la fecha -->
				<h2 class="mb-4 text-lg sm:text-xl font-semibold">{date}</h2>

				<!-- Lista de resúmenes -->
				<div class="grid grid-cols-1 gap-6">
					{#each summaries as summary (summary.id)}
						<div
							class="min-h-42 relative rounded-xl bg-neutral-50 p-4 shadow hover:bg-white"
							class:summary-new={summary.new}
						>
							<!-- Categoría y Tono -->
							<div class="inline-block mb-2">
								<span class={`rounded-md px-2 py-1 text-sm ${categoryColors[summary.category]}`}>
									{summary.category}
								</span>
								<span class="rounded-md px-2 py-1 text-sm bg-gray-200">{summary.tone}</span>
							</div>
							<!-- URL original -->
							<p class="mb-2 text-lg truncate">
								<a
									href={summary.original_url}
									target="_blank"
									class="text-indigo-500 hover:underline">{summary.original_url}</a
								>
							</p>
							<!-- Resumen -->
							<p class="mb-2 text-xl text-gray-800 my-4 text-justify">{summary.summary_text}</p>
							<!-- Fecha -->
							<!-- <p class="text-md text-gray-500 mb-2">{formatDate(summary.created_at)}</p> -->

							<!-- Nivel de Fake News -->
							<div class="mt-4 flex items-center gap-2">
								<span class="text-sm font-medium">Nivel de Fake News:</span>
								<div
									class={`progress-bar ${fakeNewsLevels[summary.fake_news_level] ? fakeNewsLevels[summary.fake_news_level].color : 'bg-gray-500'}`}
									style="width: ${fakeNewsLevels[summary.fake_news_level] ? fakeNewsLevels[summary.fake_news_level].progress + '%' : '0%'};"
								></div>
								<span class="text-sm">{summary.fake_news_level}</span>
							</div>
							<!-- Correo opcional -->
							{#if summary.email !== null}
								<p class="text-md mb-2 text-green-600">Enviado a: {summary.email}</p>
							{/if}
							
							<!-- Botones de acción -->
							<div class="absolute right-2 top-2 flex justify-end space-x-2">
								<button
									class="rounded-xl px-4 py-2 text-sm text-gray-400 hover:bg-gray-200"
									onclick={() => navigator.clipboard.writeText(summary.summary_text)}
								>
									<FontAwesomeIcon icon={faCopy} />
								</button>
								<!-- <button
                                class="text-sm px-4 py-2 rounded-xl hover:bg-gray-200 border border-gray-300"
                                onclick={() => deleteSummary(summary.id)}
                            >
                                <FontAwesomeIcon icon={faTrash} /> Eliminar
                            </button> -->
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.summary-new {
		border: 2px solid rgba(99, 102, 241, 1); /* Indigo */
		animation:
			borderPulse 10s ease-out,
			fadeIn 1s ease-in;
		background-color: #fff;
	}

	@keyframes borderPulse {
		0% {
			box-shadow: 0 0 0 rgba(99, 102, 241, 0.8);
		}
		50% {
			box-shadow: 0 0 10px rgba(99, 102, 241, 0.8);
		}
		100% {
			box-shadow: 0 0 0 rgba(99, 102, 241, 0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.progress-bar {
		height: 8px;
		border-radius: 4px;
	}
</style>
