import { Catch, RpcExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class AllRpcExceptionsFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log("error", exception.message, exception.stack);
    return throwError(() => {
      console.log("error", exception.message, exception.stack);
      return {
        code: 500,
        message: exception.message,
        data: null,
      };
    });
  }
}
