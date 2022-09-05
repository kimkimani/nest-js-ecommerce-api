import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {OrdersController} from './orders.controller';
import {OrdersService} from './orders.service';
import { orderSchema } from 'src/models/order.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Order', schema: orderSchema}])],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService]
})
export class OrdersModule {}