import { useNavigate } from "react-router-dom";
import './konfirmasi-pembayaran.css'

function KonfirmasiPembayaran(){
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/KelolaPesanan");
    }

    const handleNext = () => {
        navigate("/list-pesanan");
    }


    
    return(
        <div>
            <div className="container-konfirmasi-pembayaran">
                <div className="move">
                    <div className="left"><button onClick={handleBack}>Back</button></div>
                    <div className="right"><button onClick={handleNext}>Lihat List Pesanan</button></div>
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
                                <td><button className=" bg-red-500 text-red px-2 py-1 rounded">Acc</button></td>
                            </tr>
                            <tr>
                                <td>BlackMamba</td>
                                <td>1x Blueming hampers </td>
                                <td>jl. Underpass pramuka</td>
                                <td>rani</td>
                                <td>Rp. 25.000</td>
                                <td>Button acc</td>
                            </tr>
                            <tr>
                                <td>shineonyou</td>
                                <td>1x Pinky hampers </td>
                                <td>jl. Bikini Bottom</td>
                                <td>Ira</td>
                                <td>Rp. 25.000</td>
                                <td>Button acc</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}

export default KonfirmasiPembayaran