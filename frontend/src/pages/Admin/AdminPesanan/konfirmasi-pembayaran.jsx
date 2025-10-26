import HeaderAdmin from "../../components/header-admin"
import { useNavigate } from "react-router-dom";

function KonfirmasiPembayaran(){
    const navigate = useNavigate();
    
    return(
        <div>
            <HeaderAdmin/>
            <div className="container-konfirmasi-pembayaran">
                <h1>Konfirmasi Pembayaran Page</h1>
            </div>

        </div>

    )
}

export default KonfirmasiPembayaran