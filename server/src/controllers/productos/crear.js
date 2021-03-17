import { Product } from '../../schemas/productos';


export const crear = async (req, res) => {
        const products = new Product(req.body);
        const db = await products.save();
        res.status(201).json(db);
        
};