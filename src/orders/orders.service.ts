import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/types/order';
import { OrderDTO,OrderIdDTO } from './orders.dto';

@Injectable()
export class OrdersService {
    // define a constructor to inject the model into the service
    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) { }

    // create a new order
    async create(order: OrderDTO): Promise<Order> {
        let new_order = {
            owner: order.owner,
            totalPrice: order.totalPrice,
            products:[
                {
                    product: order.product,
                    quantity: order.quantity
                }
            ]
        }
        const createdOrder = new this.orderModel(new_order);
        await createdOrder.save();
        return createdOrder;
    }

    // getting all orders
    async findAll(): Promise<Order[]> {
        return await this.orderModel.find().exec();
    }

    // getting order by id
    async findById(orderId: OrderIdDTO): Promise<Order> {
        const { id } = orderId;
        try{
            return await this.orderModel.findById(id).exec();
        }catch(error){
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }        
    }

    // updating an order
    async update(orderId: OrderIdDTO, order: OrderDTO): Promise<Order> {
        const { id } = orderId;
        let updated_order = {
            ...(order.owner && {owner:order.owner}),
            ...(order.totalPrice && {totalPrice: order.totalPrice}),
        }
        try{
            return await this.orderModel.findByIdAndUpdate(id, updated_order, { new: true }).exec();
        }catch(error){
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // deleting an order
    async delete(orderId: OrderIdDTO): Promise<any> {
        const { id } = orderId;
        try{
            return await this.orderModel.findByIdAndRemove(id).exec();
        }catch(error){
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}