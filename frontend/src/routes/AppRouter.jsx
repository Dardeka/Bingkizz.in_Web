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
import ListPesanan from "../pages/Admin/AdminPesanan/list-pesanan";
import PesananDikirim from "../pages/Admin/AdminPesanan/pesanan-dikirim";
import PesananSelesai from "../pages/Admin/AdminPesanan/pesanan-selesai";
import Complain from "../pages/Admin/AdminPesanan/complain";
import OrderForm from "../pages/OrderForm";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BingkizzinWeb />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegistPage/>}/>

        {/* Customer */}
        <Route path="/detail-product/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CheckoutPage/>}/>
        <Route path="/order-form" element={<OrderForm/>}/>
        <Route path="/ProductPage" element={<ProductPage />} />
        
        {/* Admin */}
        <Route path="/admin" element={<DashboardAdmin/>}/>
        <Route path="/admin/kelola-pesanan" element={<KelolaPesanan/>}/>
        <Route path="/admin/kelola-produk" element={<KelolaProduk/>}/>
        <Route path="/admin/konfirmasi-pembayaran" element={<KonfirmasiPembayaran/>}/>
        <Route path="/admin/list-pesanan" element={<ListPesanan/>}/>
        <Route path="/admin/pesanan-dikirim" element={<PesananDikirim />}/>
        <Route path="/admin/pesanan-selesai" element={<PesananSelesai />}/>
        <Route path="/admin/complain" element={<Complain />}/>
       
      </Routes>
    </Router>
  );
}

export default AppRouter;
