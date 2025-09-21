// src/context/AuthContext.js

import { createContext, useState, useEffect } from 'react';
import { useLocalStorageEncrypt } from './helper/CostumHook';
import { Api1 } from './utils/Api1';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorageEncrypt('token', null);
  const [user, setUser] = useLocalStorageEncrypt('user', null);
  const [akses, setAkses] = useLocalStorageEncrypt('akses', null);
  const [menus, setMenus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Efek ini akan mengambil menu kapanpun token berubah.
  useEffect(() => {
    const fetchMenus = async () => {
      if (token) {
        try {
          const { data, status } = await Api1("/menu", "GET", {}, {
            Authorization: `Bearer ${token}`,
          });
          if (status === 200) {
            setMenus(data);
          } else {
            setMenus([]);
          }
        } catch (err) {
          console.error("❌ Gagal mengambil menu:", err);
          setMenus([]);
        }
      } else {
        setMenus([]);
      }
      setIsLoading(false);
    };

    fetchMenus();
  }, [token]);

  // Fungsi untuk login. Ini akan dipanggil dari komponen Login.
  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
   // console.log(data.token);
    setAkses(data.akses);
    // Kita tidak perlu mengambil menu di sini, karena useEffect di atas akan melakukannya secara otomatis saat token diatur.
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAkses(null);
    setMenus(null);
  };

  const value = { user, token, akses, menus, isLoading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};