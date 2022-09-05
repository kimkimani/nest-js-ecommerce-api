// Here we will define the methods that will be used to interact with the database
// We will use the @InjectModel decorator to inject the model into the service
// We will use the Model decorator to define the model
// We will use the Injectable decorator to define the service as a dependency injection
// We will use the HttpException to throw an error
// We will use the HttpStatus to define the status of the error
// The methods are creating a product, finding a product by id, finding all products,updating a product, deleting a product

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/types/product';
import { ProductDTO,ProductIdDTO } from './products.dto';

@Injectable()
export class ProductsService {
    // define a constructor to inject the model into the service
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    // create a new product
    async create(product: ProductDTO): Promise<Product> {
        const createdProduct = new this.productModel(product);
        await createdProduct.save();
        return createdProduct;
    }

    // getting all products
    async findAll(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }

    // getting product by id
    async findById(productId: ProductIdDTO): Promise<Product> {
        const { id } = productId;
        try{
            return await this.productModel.findById(id).exec();
        }catch(error){
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }

    // updating a product
    async update(productId: ProductIdDTO, product: ProductDTO): Promise<Product> {
        const { id } = productId;
        try{
            return await this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
        }catch(error){
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // deleting a product
    async delete(productId: ProductIdDTO): Promise<any> {
        const { id } = productId;
        try{
            return await this.productModel.findByIdAndRemove(id).exec();
        }catch(error){
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}