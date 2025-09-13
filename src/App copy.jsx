import { Routes, Route } from "react-router";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";
import { Api1 } from "./utils/Api1";
import { useLocalStorageEncrypt } from "./helper/CostumHook";

function App() {
  const [menus, setMenus] = useState([]);
  const [token] = useLocalStorageEncrypt("token", null);
  console.log(token);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const { data, status } = await Api1("/menu", "GET", {}, {
          Authorization: `Bearer ${token}`,
        });
        if (status === 200) setMenus(data);
      } catch (err) {
        console.error("Gagal ambil menu:", err);
      }
    };

    if (token) {
      fetchMenus();
    } else {
      setMenus([]); // clear menu kalau belum login
    }
  }, [token]);

  return (
    <Routes>
      {/* Login terbuka */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard pakai PrivateRoute */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout menus={menus} />
          </PrivateRoute>
        }
      >
        {/* Index page */}
        <Route index element={<h1>Home</h1>} />

        {/* Generate route dari API */}
        {menus.map((menu) =>
          menu.submenus?.map((submenu) => (
            <Route
              key={submenu.id}
              path={submenu.path?.toLowerCase()}
              element={<h2>{submenu.nama_sub_menu} Page</h2>}
            />
          ))
        )}
      </Route>

      {/* Not found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
