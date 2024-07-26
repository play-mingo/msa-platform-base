import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: any, done: CallableFunction) {
    console.log("======= LocalSerializer serializeUser user =======");
    console.log(user);
    done(null, user);
  }

  async deserializeUser(user: any, done: CallableFunction) {
    console.log("======= LocalSerializer deserializeUser user =======");
    console.log(user);
    done(null, user);
  }
}
