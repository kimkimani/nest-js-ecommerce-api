import {Body,Controller,Post,Get,Query,UseGuards} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {OrderDTO,OrderIdDTO} from './orders.dto';
import {AuthGuard} from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
    // define the products service
    constructor(private  ordersService: OrdersService){}

    @Get()
    async findAll(){
        let all_orders =  await this.ordersService.findAll();
        return all_orders;
    }

    @Get('/:id')    
    async findById(@Query() orderId: OrderIdDTO){
        let order = await this.ordersService.findById(orderId);
        return order;
    }

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() order: OrderDTO){
        let created_order = await this.ordersService.create(order);
        return created_order;
    }

    @Post('/update')
    @UseGuards(AuthGuard('jwt'))
    async update(@Query() orderId: OrderIdDTO, @Body() order: OrderDTO){
        let updated_order = await this.ordersService.update(orderId,order);
        return updated_order;
    }

    @Post('/delete')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Query() orderId: OrderIdDTO){
        let deleted_order = await this.ordersService.delete(orderId);
        return deleted_order;
    }
}