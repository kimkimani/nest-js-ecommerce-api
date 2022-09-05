import {Injectable} from '@nestjs/common';
import {sign} from 'jsonwebtoken';
import {UserService} from 'src/shared/user.service';


@Injectable()
export class AuthService {
    // define user service
    constructor(private userService: UserService) {}

    // create a new token
    async signPayload(payload: any) {
        let token =  sign(payload, 'secretKey', { expiresIn: '12h' }); // token to expire in 12 hours
        return token;
    }

    // validate user
    async validateUser(payload: any) {
        return await this.userService.findByPayload(payload);
    }
}