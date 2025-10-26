import './KelolaPesanan.css';
import HeaderAdmin from "../components/header-admin"

function KelolaPesanan(){
    return(
        <div >
            <div className='container-pesanan'>
                <HeaderAdmin/>
                <div className="kelola-pesanan"> 
                    <div className='judul'> KELOLA PESANAN </div>
                    <div className='gap'></div>
                    <ul > 
                        <li>
                            <div className='list1'>
                                <p>Konfirmasi Pembayaran</p>
                            </div>
                        </li>
                        <li>
                            <div className='list2'>
                                <p>List Pesanan</p>
                            </div>
                        </li>
                        <li>
                            <div className='list1'>
                                <p>Pesanan Dikirim</p>
                            </div>
                        </li>
                        <li>
                            <div className='list1'>
                                <p>Pesanan Selesai</p>
                            </div>
                        </li>
                        <li>
                            <div className='list1'>
                                <p>Complain</p>
                            </div>
                        </li>
                    </ul>
                </div> 
            </div>

        </div>
    )
}

export default KelolaPesanan;