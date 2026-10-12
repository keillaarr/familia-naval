const API_BASE_URL = 'http://10.0.2.2:8080/api/v1';

export async function apiRequest(endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error);
    throw error;
  }
}

export const userService = {
  getUsuarioLogado: () => apiRequest('/usuario/logado'),
  getDependentes: (nip: string | number) => apiRequest(`/pessoa/dependentes/usuario/${nip}`),
  getDadosPessoa: (nip: string | number) => apiRequest(`/pessoa/usuario/${nip}`),
  enviarProventos: (dados: any) => apiRequest('/proventos', { method: 'POST', body: JSON.stringify(dados) }),
  enviarInspSaude: (dados: any) => apiRequest('/inspsaude', { method: 'POST', body: JSON.stringify(dados) }),
  marcarComunicadoLido: (id: string) => apiRequest(`/comunicados/${id}/ler`, { method: 'PUT' }),
};