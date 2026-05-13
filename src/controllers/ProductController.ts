import type { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/ProductService.js";


export class ProductController{
    private productService = new ProductService();

    createProduct = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const{name, quantity, price} = req.body
            await this.productService.validateSchema(req.body)
            const newProduct = await this.productService.create(name,quantity, price)
            return res.status(200).json(newProduct)
        } catch (error) {
            next(error);
        }
    }

    listAllProducts = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const products = await this.productService.listAll();
      return res.json(products);
        } catch (error) {
            next(error)
        }
    }

    deleteProduct = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const id = Number(req.params.id);
            await this.productService.delete(id);
            return res.status(204).send();
        } catch (error) {
            next(error)
        }
    }
    updateProduct = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const productId = Number(req.params.id);
            await this.productService.validateSchema(req.body,true)
            const product = await this.productService.update(productId, req.body);
            return res.status(200).json(product);
        } catch (error) {
            next(error)
        }
    }

}