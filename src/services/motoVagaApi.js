import { api } from './api';

// helpers para paginação da api
function normalizeList(res) {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.items)) return d.items;
  if (Array.isArray(d?.data)) return d.data;
  return [];
}

// moto
export async function listMotos() {
  const res = await api.get('/moto');
  return normalizeList(res);
}
export async function createMoto({ placa, marca, modelo, ano }) {
  const body = { placa, marca, modelo, ano: Number(ano) || 0 };
  const res = await api.post('/moto', body);
  return res.data;
}
export async function updateMoto(id, { placa, marca, modelo, ano }) {
  const body = { placa, marca, modelo, ano: Number(ano) || 0 };
  const res = await api.put(`/moto/${id}`, body);
  return res.data;
}
export async function deleteMoto(id) {
  const res = await api.delete(`/moto/${id}`);
  return res.data;
}

// vaga
export async function listVagas() {
  const res = await api.get('/vaga');
  return normalizeList(res);
}
export async function createVaga({ status, numero, patio }) {
  const body = { status, numero, patio };
  const res = await api.post('/vaga', body);
  return res.data;
}
export async function updateVaga(id, { status, numero, patio }) {
  const body = { status, numero, patio };
  const res = await api.put(`/vaga/${id}`, body);
  return res.data;
}
export async function deleteVaga(id) {
  const res = await api.delete(`/vaga/${id}`);
  return res.data;
}
