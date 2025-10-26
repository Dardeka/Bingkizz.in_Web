import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import BingkizzinWeb from "../pages/BingkizzinWeb";
import DashboardAdmin from "../pages/Admin/Dashboard-Admin";
import KelolaProduk from "../pages/Admin/Kelola-produk";
import LoginPage from "../pages/LoginPage";
import RegistPage from "../pages/RegistPage";
import CheckoutPage from "../pages/CheckoutPage";
import KelolaPesanan from "../pages/Admin/KelolaPesanan";
import ProductPage from "../pages/ProductPage";
import KonfirmasiPembayaran from "../pages/Admin/AdminPesanan/konfirmasi-pembayaran";


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BingkizzinWeb />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegistPage/>}/>

        <Route path="/detail-product" element={<DetailPage />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin/>}/>
        <Route path="/KelolaPesanan" element={<KelolaPesanan/>}/>
        <Route path="/kelola-produk" element={<KelolaProduk/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/konfirmasi-pembayaran" element={<KonfirmasiPembayaran/>}/>
       
      </Routes>
    </Router>
  );
}

export default AppRouter;
