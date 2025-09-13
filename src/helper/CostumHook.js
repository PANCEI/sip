import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const SECRET_KEY = "rahasiaBanget123"; // ganti dengan key aman

// fungsi helper
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    return null;
  }
};

// custom hook
export function useLocalStorageEncrypt(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? decryptData(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (storedValue === null || storedValue === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, encryptData(storedValue));
      }
    } catch (error) {
      console.error("Gagal menyimpan ke localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
