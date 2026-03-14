import express from 'express';
const router = express.Router();

// 1. Temporary Mock Data (Right inside the route)
const mockProducts = [
  { _id: '1', name: 'Nexus Pro Headphones', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', category: 'Audio', countInStock: 10, rating: 4.5 },
  { _id: '2', name: 'Ultra Vision Watch', price: 199, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', category: 'Wearables', countInStock: 7, rating: 4.0 }
];

// 2. The Route
router.get('/', (req, res) => {
  console.log("GET request received at /api/products"); // Look at your terminal for this!
  res.json(mockProducts);
});

export default router;