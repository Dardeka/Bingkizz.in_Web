import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import BingkizzinWeb from "../pages/BingkizzinWeb";
import DashboardAdmin from "../pages/Admin/Dashboard-Admin";
import KelolaProduk from "../pages/Admin/Kelola-produk";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BingkizzinWeb />} />
        <Route path="/detail-product" element={<DetailPage />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin/>}/>
        <Route path="/kelola-produk" element={<KelolaProduk/>}/>
      </Routes>
    </Router>
  );
}

export default AppRouter;
