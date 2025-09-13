import { Routes, Route } from "react-router";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./Pages/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";

function App() {
  return (
    <Routes>
      {/* halaman login selalu terbuka */}
      <Route path="/login" element={<Login />} />

      {/* Root route pakai PrivateRoute */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* "/" → Home */}
        <Route index element={<Home />} />

        {/* kalau ada sub route lain, taruh di sini */}
        {/* <Route path="profile" element={<Profile />} /> */}
      </Route>

      {/* fallback kalau path tidak ada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
