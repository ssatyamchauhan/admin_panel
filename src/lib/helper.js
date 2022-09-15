import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

export const replaceBlankWithNA = (data) => {
  return data == "" ? "N/A" : data;
};

export const getFingerPrint = async () => {

  // get it from localStorage, if not then call api 
  const vId = getFromLocalStorage('visitorId');
  if(vId && vId.length) {
    return vId;
  }

  // We recommend to call `load` at application startup.
  const fp = await FingerprintJS.load({apiKey: 'yP0usgDZUE5Wtcv4MIxc', region: 'ap'});

  // The FingerprintJS agent is ready.
  // Get a visitor identifier when you'd like to.
  const result = await fp.get();

  // This is the visitor identifier:
  const visitorId = result.visitorId;
  localStorage.setItem("visitorId", visitorId);
  return visitorId;
}

export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key)
}

export const removeFromLocalStorage = (key) => {
  return localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
    return localStorage.clear();
}

export const saveInLocalStorage = (key, value) => {
    return localStorage.setItem(key, value);
}

export const isFloat = (n) => Number(n) === n && n % 1 !== 0;

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
