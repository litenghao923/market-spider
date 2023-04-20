import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {


  getHello(): string {
    return 'Hello World!';
  }


  sayHello(): void {
    console.log("hello:" + new Date().getTime())
  }
}
