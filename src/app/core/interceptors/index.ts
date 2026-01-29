import { headersInterceptor } from './headers/headers-interceptor';
import { requestTimeoutInterceptor } from './request-timeout/request-timeout-interceptor';

export default [headersInterceptor, requestTimeoutInterceptor];
