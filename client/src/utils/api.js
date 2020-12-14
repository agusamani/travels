const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:1337' : 'https://travel-log-api.now.sh';

export async function listLogs() {
  const response = await fetch(`${API_URL}/api/logs`);
  return response.json();
}

export async function createLog(data) {
  const apiKey = data.apiKey;
  delete data.apiKey;
  const response = await fetch(`${API_URL}/api/logs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'KEY': apiKey, 
    },
    body: JSON.stringify(data),
  });
  let json;
  if (response.headers.get('content-type').includes('text/html')) {
    const message = await response.text();
    json = {
      message,
    };
  } else {
    json = await response.json();
  }
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}