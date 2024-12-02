import { API_BASE_URL } from '../api/config';

/**
 * Carga los resúmenes desde la API.
 */
export async function load() {
	try {
		const response = await fetch(`${API_BASE_URL}/summary/`);
		if (!response.ok) {
			throw new Error('Error al obtener el historial de resúmenes');
		}

		const summaries = await response.json();
		return { summaries };
	} catch (error) {
		return { error: error.message };
	}
}
