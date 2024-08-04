import { MedicalRecord } from "../models/record";

const apiUrl = process.env.API_URL || 'https://63bedcf7f5cfc0949b634fc8.mockapi.io'

export const fetchRecords = async (path: string) => {
    const response = await fetch(`${apiUrl}/${path}`)

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

    return response.json();
};

export const postRecord = async (path: string, payload: MedicalRecord) => {
    const response = await fetch(`${apiUrl}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

    return response.json();
  };

  export const editRecord = async (path: string, payload: MedicalRecord) => {
    const response = await fetch(`${apiUrl}/${path}/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

    return response.json();
  };