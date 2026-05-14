import { validate } from "class-validator";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { ApiError, BadRequestError } from "../helpers/apiError";
import { formatErrors } from "../helpers/formatErrors";

export class ProductService{
    private productRepository = AppDataSource.getRepository(Product);

    validateSchema = async (data: Partial<Product>, partial = false) => {
        const temp = this.productRepository.create(data);
        const errors = await validate(temp, { skipMissingProperties: partial });
        if (errors.length > 0) {
          const formattedErrors = formatErrors(errors);
          throw new BadRequestError("Falha de validação", formattedErrors);
        }
      };

    create = async(name:string, quantity: number, price: number)=>{
        const newProduct = this.productRepository.create({
            name,
            quantity,
            price
        });
        await validate(newProduct)
        return await this.productRepository.save(newProduct)
    };
    listAll = async () => {
        return await this.productRepository.find();
    };

    delete = async(productId: number)=>{
        const product= await this.productRepository.findOne({ where:{id: productId}});
        if(!product){
            throw new ApiError("Product not found.", 404)
        }
        return await this.productRepository.delete(productId);
    }
    update = async(productId: number, data: Partial<Product>)=>{
        const product= await this.productRepository.findOne({ where:{id: productId}});
        if(!product){
            throw new ApiError("Product not found.", 404)
        }
        this.productRepository.merge(product, data);
        await validate(product)
        return await this.productRepository.save(product);
    }
}