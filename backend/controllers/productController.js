import Product from '../models/productModel.js';

const mockProducts = [
  { _id: '1', name: 'Nexus Pro Headphones (Mock)', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', category: 'Audio', countInStock: 10, rating: 4.5 },
  { _id: '2', name: 'Ultra Vision Watch (Mock)', price: 199, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', category: 'Wearables', countInStock: 7, rating: 4.0 }
];

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    
    // If DB is empty or disconnected but not crashing, we can still send mock
    if (products.length === 0) {
       return res.json(mockProducts);
    }
    
    res.json(products);
  } catch (error) {
    console.error("Cloud Connection Pending... Serving Mock Data.");
    res.json(mockProducts); // This keeps the site running even if DB is blocked!
  }
};