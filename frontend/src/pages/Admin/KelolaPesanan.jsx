import './KelolaPesanan.css';
import HeaderAdmin from "../components/header-admin"
import { useNavigate } from "react-router-dom";


function KelolaPesanan(){
    const navigate = useNavigate()
    
    const handleKonfirmasiPembayaran = () => {
        navigate("/admin/konfirmasi-pembayaran")
    }

    const handleListPesanan = () => {
        navigate("/admin/list-pesanan")
    }

    const handlePesananDikirim = () => {   
        navigate("/admin/pesanan-dikirim")
    }

    const handlePesananSelesai = () => {
        navigate("/admin/pesanan-selesai")
    }

    const handleReview = () => {
        navigate("/admin/reviews")
    }


    return(
        <div >
            <div className='container-pesanan'>
                <HeaderAdmin/>
                <div className="kelola-pesanan"> 
                    <div className='judul'> KELOLA PESANAN </div>
                    <div className='gap'></div>
                    <ul>
                        <li>
                            <button className="list1" onClick={handleKonfirmasiPembayaran}>
                            <p>Konfirmasi Pembayaran</p>
                            </button>
                        </li>
                        <li>
                            <button className="list2" onClick={() => {handleListPesanan()}}>
                            <p>List Pesanan</p>
                            </button>
                        </li>
                        <li>
                            <button className="list1" onClick={() => {handlePesananDikirim()}}>
                            <p>Pesanan Dikirim</p>
                            </button>
                        </li>
                        <li>
                            <button className="list1" onClick={() => {handlePesananSelesai()}}>
                            <p>Pesanan Selesai</p>
                            </button>
                        </li>
                        <li>
                            <button className="list1" onClick={() => {handleReview()}}>
                            <p>Reviews</p>
                            </button>
                        </li>
                        </ul>

                </div> 
            </div>

        </div>
    )
}

export default KelolaPesanan;