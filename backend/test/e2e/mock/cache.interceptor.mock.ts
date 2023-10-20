import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";


export class CacheInterceptorMock implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle();
    }

}