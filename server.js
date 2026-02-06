const express = require('express');
const app = express();
app.use(express.json());

// 1. DỮ LIỆU CATEGORIES ĐẦY ĐỦ (Đã thêm ID 17, 18 và các id khác)
let categories = [
  {
    "id": 7,
    "name": "Clothes",
    "slug": "clothes",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "creationAt": "2026-02-05T16:51:34.000Z",
    "updatedAt": "2026-02-05T16:51:34.000Z"
  },
  {
    "id": 8,
    "name": "Electronics",
    "slug": "electronics",
    "image": "https://i.imgur.com/ZANVnHE.jpeg",
    "creationAt": "2026-02-05T16:51:35.000Z",
    "updatedAt": "2026-02-05T16:51:35.000Z"
  },
  {
    "id": 9,
    "name": "Furniture",
    "slug": "furniture",
    "image": "https://i.imgur.com/Qphac99.jpeg",
    "creationAt": "2026-02-05T16:51:36.000Z",
    "updatedAt": "2026-02-05T16:51:36.000Z"
  },
  {
    "id": 10,
    "name": "Shoes",
    "slug": "shoes",
    "image": "https://i.imgur.com/qNOjJje.jpeg",
    "creationAt": "2026-02-05T16:51:36.000Z",
    "updatedAt": "2026-02-05T16:51:36.000Z"
  },
  {
    "id": 11,
    "name": "Miscellaneous",
    "slug": "miscellaneous",
    "image": "https://i.imgur.com/BG8J0Fj.jpg",
    "creationAt": "2026-02-05T16:51:37.000Z",
    "updatedAt": "2026-02-05T16:51:37.000Z"
  },
  {
    "id": 13,
    "name": "gargantilla",
    "slug": "gargantilla",
    "image": "https://firebasestorage.googleapis.com/v0/b/pruebasalejandro-597ed.firebasestorage.app/o/gargantilla.jpg?alt=media&token=6bbf8234-5112-4ca8-b130-5e49ed1f3140",
    "creationAt": "2026-02-05T21:09:36.000Z",
    "updatedAt": "2026-02-05T21:09:36.000Z"
  },
  {
    "id": 15,
    "name": "category_B",
    "slug": "category-b",
    "image": "https://pravatar.cc/",
    "creationAt": "2026-02-05T22:04:27.000Z",
    "updatedAt": "2026-02-05T22:04:27.000Z"
  },
  {
    "id": 16,
    "name": "string",
    "slug": "string",
    "image": "https://pravatar.cc/",
    "creationAt": "2026-02-05T22:04:28.000Z",
    "updatedAt": "2026-02-05T22:04:28.000Z"
  },
  {
    "id": 17,
    "name": "Anillos",
    "slug": "anillos",
    "image": "https://firebasestorage.googleapis.com/v0/b/pruebasalejandro-597ed.firebasestorage.app/o/Anillos.jpg?alt=media&token=b7de8064-d4eb-4680-a4e2-ad917838c6c8",
    "creationAt": "2026-02-06T02:40:20.000Z",
    "updatedAt": "2026-02-06T02:40:20.000Z"
  },
  {
    "id": 18,
    "name": "Testing Category",
    "slug": "testing-category",
    "image": "https://placeimg.com/640/480/any",
    "creationAt": "2026-02-06T06:04:54.000Z",
    "updatedAt": "2026-02-06T06:04:54.000Z"
  }
];

// 2. DỮ LIỆU PRODUCTS MẪU (Để test API lấy sản phẩm theo ID danh mục)
let products = [
    { "id": 101, "name": "Áo sơ mi nam", "categoryId": 7 },
    { "id": 102, "name": "Quần tây", "categoryId": 7 },
    { "id": 103, "name": "iPhone 15", "categoryId": 8 },
    { "id": 104, "name": "Nhẫn kim cương", "categoryId": 17 },
    { "id": 105, "name": "Sản phẩm thử nghiệm", "categoryId": 18 }
];

// --- CÁC HÀM HTTP REQUEST ---

// Get All + Query theo name
app.get('/api/v1/categories', (req, res) => {
    const { name } = req.query;
    if (name) {
        const filtered = categories.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
        return res.json(filtered);
    }
    res.json(categories);
});

// Get by ID
app.get('/api/v1/categories/:id', (req, res) => {
    const item = categories.find(c => c.id === parseInt(req.params.id));
    item ? res.json(item) : res.status(404).json({ message: "Không tìm thấy ID này" });
});

// Get by Slug
app.get('/api/v1/categories/slug/:slug', (req, res) => {
    const item = categories.find(c => c.slug === req.params.slug);
    item ? res.json(item) : res.status(404).json({ message: "Không tìm thấy Slug này" });
});

// Create
app.post('/api/v1/categories', (req, res) => {
    const newCate = { 
        id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1, 
        ...req.body,
        creationAt: new Date(),
        updatedAt: new Date()
    };
    categories.push(newCate);
    res.status(201).json(newCate);
});

// Edit (PUT)
app.put('/api/v1/categories/:id', (req, res) => {
    const index = categories.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Không tìm thấy để sửa" });
    
    categories[index] = { 
        ...categories[index], 
        ...req.body,
        updatedAt: new Date() 
    };
    res.json(categories[index]);
});

// Delete
app.delete('/api/v1/categories/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const initialLength = categories.length;
    categories = categories.filter(c => c.id !== idToDelete);
    
    if (categories.length === initialLength) {
        return res.status(404).json({ message: "ID không tồn tại để xóa" });
    }
    res.json({ message: "Xóa thành công", id: idToDelete });
});

// Get Products by Category ID
app.get('/api/v1/categories/:id/products', (req, res) => {
    const catId = parseInt(req.params.id);
    const result = products.filter(p => p.categoryId === catId);
    res.json(result);
});

app.listen(3000, () => console.log("Server đang chạy tại http://localhost:3000"));

