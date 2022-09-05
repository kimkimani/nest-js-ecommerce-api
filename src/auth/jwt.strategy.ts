import {HttpException,HttpStatus,Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt,Strategy,VerifiedCallback} from 'passport-jwt';
import {AuthService} from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    // define auth service and extract jwt
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        });
    }
    // validate user
    async validate(payload: any, done: VerifiedCallback){
        const user = await this.authService.validateUser(payload);
        if(!user){
            return done(new HttpException('Unauthorized',HttpStatus.UNAUTHORIZED));
        }
        return done(null,user,payload.iat);
    }
}