import { useNavigate } from "react-router-dom";
import './konfirmasi-pembayaran.css'
import HeaderAdmin from "../../components/header-admin";

function Complain(){
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/admin/pesanan-selesai");
    }

    const handleNext = () => {
        navigate("/admin/kelola-pesanan");
    }


    
    return(
        <div>
            <HeaderAdmin/>
            <div className="container-konfirmasi-pembayaran">
                <div className="move">
                    <div className="left"><button className="!bg-red-500 !text-white" onClick={handleBack}>Lihat Pesanan Selesai</button></div>
                    <div className="right"><button className="!bg-red-500 !text-white" onClick={handleNext}>Kembali ke Kelola Pesanan</button></div>
                </div>
                <div>
                    <table class="table-auto">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Detail Pesanan</th>
                                <th>Alamat Penerima</th>
                                <th>Nama Penerima</th>
                                <th>Total yang harus dibayar</th>
                                <th>Konfirmasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ToTheBones</td>
                                <td>1x Pinky hampers </td>
                                <td>jl. Malcolm Lockyer</td>
                                <td>Mr bones</td>
                                <td>Rp. 25.000</td>
                                <td><button className=" !bg-red-500 !text-white px-2 py-1 rounded">Kirim</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}

export default Complain