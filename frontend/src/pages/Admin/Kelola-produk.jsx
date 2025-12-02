import React, { useState, useRef, useEffect } from 'react';
import HeaderAdmin from "../components/header-admin"
import { Button } from "../../components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

function KelolaProduk(){
    // 1. STATE PRODUK DAN STATUS
    const [products, setProducts] = useState([]); // State untuk menampung data produk dari DB
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    
    // 2. STATE FORM TAMBAH PRODUK
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const fileInputRef = useRef(null);
    const [addFormData, setAddFormData] = useState({
        name: '',
        desc: '',
        stock: '',
        price: '',
        image: null,
    });

    // --- LOGIKA FETCH DATA DARI DB ---
    const fetchProducts = async () => {
        setLoading(true);
        setFetchError(null);
        try {
            // Ganti URL jika endpoint Anda berbeda
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/show-products`); 
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();
            
            const formattedProducts = data.map(item => ({
                id: item._id,
                name: item.productName,
                image: item.productImg,
                stock: item.productStock,
                price: item.productPrice,
                status: item.productStatus || 'active'
            }));

            console.log("Fetched products:", formattedProducts);
            
            setProducts(formattedProducts);
        } catch (error) {
            setFetchError(error.message);
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    
    // --- LOGIKA SUBMIT FORM TAMBAH PRODUK ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        // Validasi wajib isi
        if (!addFormData.name || !addFormData.stock || !addFormData.price) {
            setSubmitError('Nama, stok, dan harga wajib diisi.');
            return;
        }

        const fd = new FormData();
        fd.append('productName', addFormData.name);
        fd.append('productStock', addFormData.stock);
        fd.append('productPrice', addFormData.price);
        fd.append('productDesc', addFormData.desc || '');
        if (addFormData.image instanceof File) {
            fd.append('image', addFormData.image); // name 'image' harus match multer single('image') di backend
        }

        setSubmitting(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/add-product`, {
                method: 'POST',
                body: fd 
            });
            
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(`Server ${res.status}: ${txt}`);
            }
            const created = await res.json();

            // Tambahkan produk baru ke state products
            setProducts(prev => [
                ...prev,
                {
                    id: created.id,
                    name: created.productName,
                    stock: created.productStock,
                    price: created.productPrice,
                    image: created.productImage,
                    desc: created.productDesc,
                    status: 'active' // Asumsi status default
                }
            ]);

            // Reset form + tutup dialog
            setAddFormData({ name: '', desc: '', stock: '', price: '', image: null });
            setIsAddDialogOpen(false);
        } catch (err) {
            setSubmitError(err.message || 'Gagal membuat produk baru');
        } finally {
            setSubmitting(false);
        }
    };

    // Handler untuk mengubah nilai input form
    const handleAddFormChange = (e) => {
        const { name, value } = e.target;
        setAddFormData({ ...addFormData, [name]: value });
    };

    // Handler untuk gambar
    const handleAddImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const limit = 2000
            const size = file.size / 1024
            if(size > limit){
                alert("Ukuran file terlalu besar! Maksimal 2MB.")
                return false
            }else{
                setAddFormData({ ...addFormData, image: file });
            }
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    
    // Handler untuk membuka dialog dan reset form
    const handleAddProduct = () => {
        setAddFormData({
            name: '',
            desc: '',
            stock: '',
            price: '',
            image: null,
        });
        setSubmitError(null);
        setIsAddDialogOpen(true);
    }

    const handleUpdateStatus = async (productId, newStatus) => {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/update/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: productId,
                targetUpdate: "Status", 
                newState: newStatus,
            })
        })
    }

    return(
        <div className="static top-0 pt-32 h-[1920px] w-screen left-0 bg-[url(/images/Background.png)]">
            <HeaderAdmin/>
            <div className="flex flex-col w-[1096px] mr-auto ml-auto">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col text-start">
                        <h3 className="font-bold text-3xl">Kelola Produk</h3>
                        <p>Atur produk yang tersedia di toko Anda</p>
                    </div>
                    
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            {/* Memanggil handleAddProduct untuk membuka dialog dan mereset form */}
                            <Button variant="outline" className="!bg-[#9F152F] text-white" onClick={handleAddProduct}>Tambah Produk</Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-[425px]">
                            {/* Form di sini agar handleSubmit bisa menangkap event */}
                            <form onSubmit={handleSubmit}>
                                <DialogHeader>
                                    <DialogTitle>Tambah Produk</DialogTitle>
                                    <DialogDescription>
                                        Masukkan data-data produk yang ingin dimasukkan
                                    </DialogDescription>
                                </DialogHeader>
                                
                                <div className="grid gap-4 py-4">
                                    {/* Nama Produk */}
                                    <div className="grid gap-3">
                                        <label htmlFor="name">Nama Produk</label>
                                        <Input id="name" name="name" value={addFormData.name} onChange={handleAddFormChange} required/>
                                    </div>
                                    {/* Deskripsi Produk */}
                                    <div className="grid gap-3">
                                        <label htmlFor="desc">Deskripsi Produk</label>
                                        <Textarea id="desc" name="desc" value={addFormData.desc} onChange={handleAddFormChange} rows={5}/>
                                    </div>
                                    {/* Jumlah Stok */}
                                    <div className="grid gap-3">
                                        <label htmlFor="stock">Jumlah Stok</label>
                                        <Input id="stock" name="stock" type="number" value={addFormData.stock} onChange={handleAddFormChange} required/>
                                    </div>
                                    {/* Harga Produk */}
                                    <div className="grid gap-3">
                                        <label htmlFor="price">Harga Produk</label>
                                        <Input id="price" name="price" type="number" value={addFormData.price} onChange={handleAddFormChange} required/>
                                    </div>
                                    
                                    {/* Upload Gambar */}
                                    <div className="grid gap-3">
                                        <label htmlFor="imageUpload" className="text-left">Gambar</label>
                                        <Button type="button" variant="outline" onClick={handleButtonClick} className="outline-2 outline-offset-2 outline-solid">
                                            {addFormData.image ? addFormData.image.name : 'Pilih Foto'}
                                        </Button>
                                        <input id="imageUpload" name="imageUpload" type="file" accept="image/*" onChange={handleAddImageChange} ref={fileInputRef} style={{ display: 'none' }} />
                                    
                                        {addFormData.image && (
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <span className="col-span-1"></span>
                                                <div className="col-span-3">
                                                    <img src={URL.createObjectURL(addFormData.image)} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Menampilkan Error */}
                                    {submitError && <p className="text-red-500 text-sm mt-2">{submitError}</p>}
                                </div>
                                
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" type="button" disabled={submitting}>Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={submitting} className="!bg-red-500">
                                        {submitting ? 'Menambah...' : 'Tambah'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                
                {/* Tabel */}
                <div className="w-auto px-3 min-h-[100px] h-auto bg-[#9F152F] rounded-[12px] mt-5 p-10">
                    <Table className="rounded-[12px] bg-white">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] text-center">ID Produk</TableHead>
                                <TableHead className="text-center">Nama produk</TableHead>
                                <TableHead className="text-center">Jumlah Stok</TableHead>
                                <TableHead className="text-center">Harga jual</TableHead>
                                <TableHead className="text-center">Status Penjualan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">Memuat data produk...</TableCell>
                                </TableRow>
                            )}
                            {fetchError && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-red-500">Gagal memuat produk: {fetchError}</TableCell>
                                </TableRow>
                            )}
                            {!loading && products.length === 0 && !fetchError && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">Belum ada produk yang terdaftar.</TableCell>
                                </TableRow>
                            )}
                            {/* Loop data dari state products yang telah di-fetch */}
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</TableCell>
                                    <TableCell className="flex flex-row items-center justify-center">
                                        <NativeSelect defaultValue={product.status} onChange={(event) => handleUpdateStatus(product.id, event.target.value)}>
                                            <NativeSelectOption value="Active" className="bg-green-400 text-white">Active</NativeSelectOption>
                                            <NativeSelectOption value="Inactive" >Inactive</NativeSelectOption>
                                        </NativeSelect>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                
            </div>
        </div>
    )
}

export default KelolaProduk