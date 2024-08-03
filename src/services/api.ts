const apiUrl = process.env.API_URL || 'https://63bedcf7f5cfc0949b634fc8.mockapi.io'

export const fetchRecords = async (path: string) => {
    const response = await fetch(`${apiUrl}/${path}`)
    console.log(response)
    return response.json();
};