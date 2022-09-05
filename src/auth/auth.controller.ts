import {Body,Controller,Post,Get,UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {LoginDTO,RegisterDTO} from './auth.dto';
import {UserService} from 'src/shared/user.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,private userService: UserService){}
    @Post('login')
    async login(@Body() userDTO: LoginDTO){
        const user = await this.userService.findByLogin(userDTO);
        const payload = {
            email: user.email,
        }
        const token = await this.authService.signPayload(payload);
        return {
            user,token
        }
    }
    @Post('register')
    async register(@Body() userDTO: RegisterDTO){
        const user = await this.userService.create(userDTO);
        const payload = {
            email: user.email,
        }
        const token = await this.authService.signPayload(payload);
        return {user,token}
    }
}