import { requestTimeoutInterceptor } from './request-timeout/request-timeout-interceptor';
import { timezoneInterceptor } from './timezone/timezone-interceptor';

export default [timezoneInterceptor, requestTimeoutInterceptor];
