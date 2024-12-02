<script>
    import { API_BASE_URL } from '../api/config';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	// Estado local
	let url = '';
	let email = '';
	let showModal = false;
	let sendByEmail = false;
	let loading = false; // Estado para el spinner

	// Dispatcher para notificar al padre
	const dispatch = createEventDispatcher();

	// Función para enviar el resumen
	async function createSummary() {
		const payload = { url, ...(sendByEmail && email ? { email } : {}) };
		loading = true; // Activar el estado de carga

		try {
			const response = await fetch(`${API_BASE_URL}/summary/`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(`Error al crear el resumen: ${errorData.message || 'Error desconocido'}`);
			}

			const data = await response.json();
			// Crear un objeto completo con valores por defecto para evitar errores
            const completeData = {
                new: true,
                id: data.id,
                original_url: url,
                summary_text: data.summary.resumen,
				fake_news_level: data.summary.fake_news_level,
				category: data.summary.category,
				tone: data.summary.tone,
                email: sendByEmail ? email : null,
                created_at: new Date(Date.now() + 0 * 60 * 60 * 1000).toISOString() // Rellenar con la fecha actual en UTC 0
            };

            dispatch('newsummary', completeData); // Notificar al padre con el objeto completo
			resetForm();
		} catch (error) {
			console.error('Error en createSummary:', error); // Agregar log de error para depuración
			alert('Hubo un problema al crear el resumen: ' + error.message);
		} finally {
			loading = false; // Desactivar el estado de carga
		}
	}

	// Resetear el formulario
	function resetForm() {
		url = '';
		email = '';
		showModal = false;
		sendByEmail = false;
	}
</script>

<!-- Formulario para crear resumen -->
<div class="container mx-auto py-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-0">

	<div class="flex flex-col w-full space-y-4">
		<!-- Input para URL -->
		<div>
			<label for="url" class="block text-sm font-medium text-gray-700 mb-1">URL del artículo</label>
			<input
				id="url"
				type="url"
				bind:value={url}
				placeholder="https://ejemplo.com"
				class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
			/>
		</div>

		<!-- Botón para abrir modal -->
		<button
			type="button"
			class="bg-gray-800 w-48 text-white px-4 py-2 rounded hover:bg-gray-700"
			onclick={() => (showModal = true)}
			disabled={!url.trim()}
		>
			Generar Resumen
		</button>
	</div>
</div>

<!-- Modal para confirmar envío por correo -->
{#if showModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
		<div class="bg-white p-6 rounded-lg shadow-xl w-96">
			<h3 class="text-lg font-semibold mb-4">¿Quieres enviar el resumen por correo?</h3>

			<div class="flex flex-col space-y-4">
				<!-- Checkbox para enviar por correo -->
				<div>
					<label class="flex items-center space-x-2">
						<input
							type="checkbox"
							bind:checked={sendByEmail}
							class="h-5 w-5 text-gray-600 focus:ring-gray-500"
						/>
						<span class="text-sm text-gray-700">Sí, quiero enviarlo por correo</span>
					</label>
				</div>

				<!-- Input para correo -->
				{#if sendByEmail}
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							placeholder="usuario@ejemplo.com"
							class="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
						/>
					</div>
				{/if}

				<!-- Botones de acción -->
				<div class="flex justify-end space-x-4">
					<button
						type="button"
						class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
						onclick={resetForm}
					>
						Cancelar
					</button>
					<button
						type="button"
						class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
						onclick={createSummary}
						disabled={loading}
					>
						{#if loading}
							Cargando... <!-- Mensaje de carga -->
						{:else}
							Confirmar
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
