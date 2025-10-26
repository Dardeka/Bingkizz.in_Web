import './KelolaPesanan.css';
import HeaderAdmin from "../components/header-admin"
import { useNavigate } from "react-router-dom";


function KelolaPesanan(){
    const navigate = useNavigate()
    
    const handleKonfirmasiPembayaran = () => {
        navigate("/konfirmasi-pembayaran")
    }

    const handleListPesanan = () => {
        navigate("/list-pesanan")
    }

    const handlePesananDikirim = () => {   
        navigate("/pesanan-dikirim")
    }

    const handlePesananSelesai = () => {
        navigate("/pesanan-selesai")
    }

    const handleComplain = () => {
        navigate("/complain")
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
                            <button className="list1" onClick={() => {handleComplain()}}>
                            <p>Complain</p>
                            </button>
                        </li>
                        </ul>

                </div> 
            </div>

        </div>
    )
}

export default KelolaPesanan;