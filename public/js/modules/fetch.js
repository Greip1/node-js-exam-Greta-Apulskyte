const baseUrl = 'http://localhost:3001';

export async function getFetch(endpoint, token) {
  try {
    const resp = await fetch(`${baseUrl}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataInJs = await resp.json();
    return dataInJs;
  } catch (error) {
    console.warn('error in getFetch', error);
  }
}
export async function postFetch(endpoint, token, value) {
  try {
    const resp = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token} ` },
      body: JSON.stringify(value),
    });
    const atsinJs = await resp.json();
    return atsinJs;
  } catch (error) {
    console.warn('error in postFetch', error);
  }
}
