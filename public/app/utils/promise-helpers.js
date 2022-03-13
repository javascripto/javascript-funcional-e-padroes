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

export const delay = (milliseconds) => (data) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(data), milliseconds)
  );
};

export const retry = (times, retryInterval, promiseInvoker) => {
  return promiseInvoker().catch((error) => {
    if (times > 0) {
      return delay(retryInterval)().then(() =>
        retry(times - 1, retryInterval, promiseInvoker)
      );
    }
    return Promise.reject(error);
  });
};
