// src/utils/cryptoHelper.js
import CryptoJS from "crypto-js";

const SECRET_KEY = "12345678901234567890123456789012";
const IV = "1234567890123456"; 

export function encryptData(plainText) {
  const encrypted = CryptoJS.AES.encrypt(
    plainText,
    CryptoJS.enc.Utf8.parse(SECRET_KEY),
    {
      iv: CryptoJS.enc.Utf8.parse(IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).ciphertext;

  return encrypted.toString(CryptoJS.enc.Hex); // Hex encoding
}
