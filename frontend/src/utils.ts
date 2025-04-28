export interface Socket {
  id: number;
  name: string;
}

export interface CPU {
  id: number;
  brand: string;
  model: string;
  clockspeed: number;
  numberOfCores: number;
  numberOfThreads: number;
  tdp: number;
  priceEur: number;
  socket: Socket;
}

export interface CPURequest {
  brand: string;
  model: string;
  clockspeed: number;
  numberOfCores: number;
  numberOfThreads: number;
  tdp: number;
  priceEur: number;
  socketId: number;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchCPUs(): Promise<CPU[]> {
  const res = await fetch(`${API_BASE}/cpus`);
  if (!res.ok) throw new Error('Failed to fetch CPUs');
  return res.json();
}

export async function fetchSockets(): Promise<Socket[]> {
  const res = await fetch(`${API_BASE}/sockets`);
  if (!res.ok) throw new Error('Failed to fetch sockets');
  return res.json();
}

export async function createCPU(data: CPURequest): Promise<void> {
  const res = await fetch(`${API_BASE}/cpus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create CPU');
}

export async function updateCPU(id: number, data: CPURequest): Promise<void> {
  const res = await fetch(`${API_BASE}/cpus/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update CPU');
}

export async function deleteCPU(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/cpus/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete CPU');
}