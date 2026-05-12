import { Router } from "express";
import { ProductController } from "../controllers/ProductController.js";



const router = Router();
const productController = new ProductController();

router.get("/", productController.listAllProducts);
router.post("/", productController.createProduct);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id", productController.updateProduct);

export const productRoutes = router;