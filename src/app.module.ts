import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsController } from 'src/products/products.controller';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersController } from 'src/orders/orders.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ecommerce'),
    SharedModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController,AuthController,ProductsController,OrdersController],
  providers: [AppService,AuthService],
})
export class AppModule {}
