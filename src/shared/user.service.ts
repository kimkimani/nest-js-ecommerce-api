import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/types/user';
import { LoginDTO, RegisterDTO } from 'src/auth/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    // define  a  constructor to inject  the  model  into  the  service
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    // create  a  new  user
    async create(userDTO: RegisterDTO): Promise<User> {
        const { email } = userDTO;
        const user = await this.userModel.findOne({ email });
        if (user) {
            // User already exists
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(userDTO);
        await createdUser.save();
        return createdUser;        
    }

    // find  a  user  by  email
    async findByLogin(userDTO: LoginDTO): Promise<User> {
        const {email,password} = userDTO;
        // find by email
        const user = await this.userModel.findOne({ email }).select('+password');
        if (!user) {
            // User not found
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        // check if password is correct
        const passworMatch = await bcrypt.compare(password, user.password);
        if (!passworMatch) {
            // Invalid credentials
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        // return the sanitized user
        return user;
    }

    // finding user by payload from jwt
    async findByPayload(payload: any) {
        const { email } = payload;
        const user = await this.userModel.findOne({ email });
        // return the sanitized user
        return user;
    }
}