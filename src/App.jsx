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
import Akses from "./Pages/MenuMaster/akses/Akses";
import DetailAkses from "./Pages/MenuMaster/akses/DetailAkses";
import SubMenu from "./Pages/MenuMaster/SubMenu/SubMenu";
import Medicine from "./Pages/Storage/Medicine/Medicine";
import MasterObat from "./Pages/MenuMaster/MasterObat/MasterObat";
import KategoriObat from "./Pages/MenuMaster/KategoriObat/KategoriObat";
import SatuanObat from "./Pages/MenuMaster/SatuanObat/SatuanObat";
import MasterMitra from "./Pages/MenuMaster/MasterMitra/MasterMitra";
import MedicineIn from "./Pages/StorageIn/MedicineIn/MedicineIn";
import MasterPoli from "./Pages/MenuMaster/MasterPoli/MasterPoli";
// import { useLocalStorageEncrypt } from "./helper/CostumHook";

function App() {
  const { menus, isLoading } = useContext(AuthContext); // Dapatkan state dari context
  
  const pageComponents = {
    home: <Home />,
    menu: <Menu />,
    akses: <Akses />,
    detailakses: <DetailAkses />,
    submenu:<SubMenu/>,
    medicine:<Medicine/>,
    masterobat:<MasterObat/>,
    kategoriobat:<KategoriObat/>,
    satuanobat:<SatuanObat/>,
    mastermitra:<MasterMitra/>,
    medicinein:<MedicineIn/>,
    masterpoli:<MasterPoli/>,
  };

  if (isLoading) {
    return <div>Memuat...</div>;
  }
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
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
            const url = submenu.url?.toLowerCase();
            return (
              <Route
                key={submenu.id}
                path={url}
                element={pageComponents[path] || <NotFound />}
              />
            );
          })
        )}
      <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;