import { API_BASE_URL } from './config';

/**
 * Obtiene el historial de resúmenes.
 * @returns {Promise<Array>} Lista de resúmenes.
 */
export async function getSummaries() {
	try {
		const response = await fetch(`${API_BASE_URL}/summary`);
		if (!response.ok) {
			throw new Error('Error al obtener los resúmenes');
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

/**
 * Crea un nuevo resumen.
 * @param {string} url URL del artículo.
 * @param {string} email Correo electrónico opcional.
 * @returns {Promise<Object>} Resumen generado.
 */
export async function createSummary(url, email = null) {
	try {
		const response = await fetch(`${API_BASE_URL}/summary`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url, email })
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || 'Error al crear el resumen');
		}
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}
