import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import BingkizzinWeb from "../pages/BingkizzinWeb";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BingkizzinWeb />} />
        <Route path="/detail-product" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
