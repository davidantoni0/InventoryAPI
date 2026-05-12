import { AppDataSource } from "../data-source.js";
import { Product } from "../entities/Product.js";

export class ProductService{
    private productRepository = AppDataSource.getRepository(Product);

    create = async(name:string, quantity: number, price: number)=>{
        const newProduct = this.productRepository.create({
            name,
            quantity,
            price
        });
        return await this.productRepository.save(newProduct)
    };
    listAll = async () => {
        return await this.productRepository.find();
    };

    delete = async(productId: number)=>{

        await this.productRepository.findOne({ where:{id: productId}});
        return await this.productRepository.delete(productId);
    }
    update = async(productId: number, data: Partial<Product>)=>{
        const product= await this.productRepository.findOne({ where:{id: productId}});
        this.productRepository.merge(product!, data);
        return await this.productRepository.save(product!);
    }
}