export const handleStatus = (response) => {
  if (response.ok) return response.json();
  return Promise.reject(response.statusText);
};
