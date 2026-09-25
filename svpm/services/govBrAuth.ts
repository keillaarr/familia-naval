import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import { govBrAuthConfig } from '@/constants/auth';

type GovBrAuthResult =
  | { type: 'success'; code: string; state: string | null }
  | { type: 'cancel' }
  | { type: 'error'; message: string };

const base64UrlEncode = (value: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(value)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

const createRandomString = (size = 48) => {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

const createCodeChallenge = async (codeVerifier: string) => {
  const bytes = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return base64UrlEncode(digest);
};

const buildAuthorizeUrl = async () => {
  const state = createRandomString(16);
  const nonce = createRandomString(16);
  const codeVerifier = createRandomString(48);
  const codeChallenge = await createCodeChallenge(codeVerifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: govBrAuthConfig.clientId,
    scope: govBrAuthConfig.scope,
    redirect_uri: govBrAuthConfig.redirectUri,
    nonce,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  return {
    state,
    codeVerifier,
    url: `${govBrAuthConfig.authorizationEndpoint}?${params.toString()}`,
  };
};

export const signInWithGovBr = async (): Promise<GovBrAuthResult> => {
  if (govBrAuthConfig.clientId === 'SEU_CLIENT_ID_GOV_BR') {
    return {
      type: 'error',
      message: 'Configure o clientId do gov.br em constants/auth.ts.',
    };
  }

  const request = await buildAuthorizeUrl();
  const result = await WebBrowser.openAuthSessionAsync(request.url, govBrAuthConfig.redirectUri);

  if (result.type !== 'success') {
    return { type: 'cancel' };
  }

  const parsedUrl = Linking.parse(result.url);
  const code = parsedUrl.queryParams?.code;
  const returnedState = parsedUrl.queryParams?.state;

  if (returnedState !== request.state) {
    return { type: 'error', message: 'Retorno de autenticação inválido.' };
  }

  if (typeof code !== 'string') {
    return { type: 'error', message: 'O gov.br não retornou o código de autenticação.' };
  }

  // Envie code + request.codeVerifier para seu backend.
  // O backend deve chamar o endpoint /token do gov.br e criar a sessão do app.
  return { type: 'success', code, state: returnedState ?? null };
};

