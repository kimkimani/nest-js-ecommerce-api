import {Body,Controller,Post,Get,Param, Query,UseGuards} from '@nestjs/common';
import {ProductsService} from './products.service';
import {ProductDTO,ProductIdDTO} from './products.dto';
import {AuthGuard} from '@nestjs/passport';

@Controller('products')
export class ProductsController {
    // define the products service
    constructor(private  productsService: ProductsService){}

    @Get()
    async findAll(){
        let all_products =  await this.productsService.findAll();
        return all_products;
    }

    @Get('/:id')    
    async findById(@Query() productId: ProductIdDTO){
        let product = await this.productsService.findById(productId);
        return product;
    }

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() product: ProductDTO){
        let created_product = await this.productsService.create(product);
        return created_product;
    }

    
    @Post('/update')
    @UseGuards(AuthGuard('jwt'))
    async update(@Query() productId: ProductIdDTO, @Body() product: ProductDTO){
        let updated_product = await this.productsService.update(productId,product);
        return updated_product;
    }

    @Post('/delete')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Query() productId: ProductIdDTO){
        let deleted_product = await this.productsService.delete(productId);
        return deleted_product;
    }
}