// @ts-check
export const handleStatus = (response) => {
  if (response.ok) return response.json();
  return Promise.reject(response.statusText);
};

export const log = (param) => {
  console.log(param);
  return param;
};

export const timeoutPromise = (milliseconds, promise) => {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(`Promise timed out after ${milliseconds} ms`);
    }, milliseconds);
  });
  return Promise.race([promise, timeout]);
};
