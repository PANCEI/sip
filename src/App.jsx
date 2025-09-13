import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";


function App() {
  const [menus, setMenus] = useState([]);

  // Mapping submenu.path → Komponen
  const pageComponents = {
    home: <Home />,
    menu: <Menu />,
  };

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = [
          {
            id: 1,
            id_menu: 1,
            id_akses: 1,
            menu: {
              id: 1,
              menu: "Dashboard",
              urutan: "1",
              jenis: "File",
              submenus: [
                {
                  id: 1,
                  nama_sub_menu: "Dashboard",
                  url: "Home",
                  path: "Home",
                  icon: "Dashboard",
                },
              ],
            },
          },
          {
            id: 2,
            id_menu: 2,
            id_akses: 1,
            menu: {
              id: 2,
              menu: "Master",
              urutan: "2",
              jenis: "Folder",
              submenus: [
                {
                  id: 2,
                  nama_sub_menu: "Akses",
                  url: "Akses",
                  path: "Akses",
                  icon: "Key",
                },
                {
                  id: 3,
                  nama_sub_menu: "Menu",
                  url: "Menu",
                  path: "Menu",
                  icon: "List",
                },
              ],
            },
          },
          {
            id: 3,
            id_menu: 3,
            id_akses: 1,
            menu: {
              id: 3,
              menu: "Master2",
              urutan: "2",
              jenis: "Folder",
              submenus: [
                {
                  id: 4,
                  nama_sub_menu: "Akses",
                  url: "Akses",
                  path: "Akses",
                  icon: "Key",
                },
                {
                  id: 5,
                  nama_sub_menu: "Menu",
                  url: "Menu",
                  path: "Menu",
                  icon: "List",
                },
              ],
            },
          },
        ];

        setMenus(data);
      } catch (err) {
        console.error("❌ Gagal ambil data menu:", err);
      }
    };

    fetchMenus();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout menus={menus} />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />

        {menus.map((item) =>
          (item.menu?.submenus || []).map((submenu) => {
            const path = submenu.path?.toLowerCase();
            return (
              <Route
                key={submenu.id}
                path={path}
                element={pageComponents[path] || <NotFound />}
              />
            );
          })
        )}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
