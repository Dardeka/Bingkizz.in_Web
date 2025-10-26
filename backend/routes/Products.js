const express = require('express')
const router = express.Router()
const {Products} = require('../models')
const multer = require('multer')
const path = require('path')

// Get all product
router.get('/', async (req, res) => {
    try{
        const listOfProducts = await Products.findAll();
        res.json(listOfProducts);
    }catch (err){
        console.error("Error fetching products:", err);
        res.status(500).json({ error: 'Gagal mengambil data dari database.', details: err.message });
    }
});

// Get one product
router.get('/:id', async (req, res) => {
  const id = req.params.id
  try{
    const detailProduct = await Products.findByPk(id);
    res.json(detailProduct);
  }catch (err){
      console.error("Error fetching products:", err);
      res.status(500).json({ error: 'Gagal mengambil data dari database.', details: err.message });
  }
});


// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'images'))
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + ext);
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })

// Post product
router.post('/', upload.single('image'), async (req, res) => {
    try {
    // req.body dan req.file sekarang sudah terisi oleh Multer
    const { productName = '', productStock = 0, productPrice = 0, productDesc = '' } = req.body 
    const productImage = req.file ? `/images/${req.file.filename}` : ''
    
    const product = await Products.create({
        productName,
        productDesc, // Tambahkan productDesc
        productImage,
        productStock: parseInt(productStock, 10) || 0,
        productPrice: parseInt(productPrice, 10) || 0
    })

    res.json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message || 'Failed to create product' })
    }
});

module.exports = router