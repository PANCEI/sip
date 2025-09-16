// src/App.js
import { Routes, Route } from "react-router";
import { useContext } from 'react';
import { AuthContext } from "./AuthContext";

import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import Home from "./Pages/home/Home";
import Menu from "./Pages/MenuMaster/menu/Menu";
import { useLocalStorageEncrypt } from "./helper/CostumHook";

function App() {
  const { menus, isLoading } = useContext(AuthContext); // Dapatkan state dari context
  
  const pageComponents = {
    home: <Home />,
    menu: <Menu />,
  };

  if (isLoading) {
    return <div>Memuat...</div>;
  }
  
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
        
        {menus?.map((item) =>
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