const MAP = {
  'auth/email-already-in-use': 'errors.emailEmUso',
  'auth/invalid-email': 'errors.emailInvalido',
  'auth/invalid-new-email': 'errors.emailNovoInvalido',
  'auth/weak-password': 'errors.senhaFraca',
  'auth/missing-password': 'errors.senhaObrigatoria',
  'auth/user-not-found': 'errors.usuarioNaoEncontrado',
  'auth/wrong-password': 'errors.senhaIncorreta',
  'auth/network-request-failed': 'errors.rede',
  'auth/too-many-requests': 'errors.muitasTentativas',
  'auth/requires-recent-login': 'errors.requerReautenticacao',
  'auth/operation-not-allowed': 'errors.operacaoNaoPermitida',
};

export function authErrorMessage(err, t) {
  const code = err?.code || '';
  const key = MAP[code] || 'errors.desconhecido';
  return t(key);
}
