import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      "hello": "world"
    };
  }

  goodMorning():string{
    return "Good Morning";
  }
}
