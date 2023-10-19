import {LoggingInterceptor} from "../../../../src/infra/interceptor/logger.interceptor";


jest.mock("../../../../src/infra/protocols/logger/logger-client.protocols", () => {
    return {
        LoggerClientProtocols: jest.fn().mockImplementation(() => {
            return {
                setCtx: jest.fn().mockReturnValue({}),
                log: jest.fn()
            };
        }),
    };
});
import {LoggerClientProtocols} from "../../../../src/infra/protocols/logger/logger-client.protocols";


const executionContext = {
    switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
            path: '/v1/currency',
            method: 'GET',
            headers: {
                'x-request-id': '123',
                'x-correlation-id': '123',
            }
        }),
        getResponse: jest.fn().mockReturnValue({
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockReturnValue({}),
            }),
        }),
    }),
}

const callHandler = {
    handle: jest.fn().mockReturnValue({
        pipe: jest.fn().mockReturnValue({

        })
    })
};

describe('Given AllExceptionFilter', () => {
    let loggingInterceptor: LoggingInterceptor;

    beforeEach(async () => {
        loggingInterceptor = new LoggingInterceptor(new LoggerClientProtocols());
    });
    it('When call to catch Exception Should return the response with internal error', async () => {

        loggingInterceptor.intercept(executionContext as any, callHandler as any);
        expect(executionContext.switchToHttp).toBeCalled();
        expect(executionContext.switchToHttp().getRequest).toBeCalled();
        expect(callHandler.handle).toBeCalled();
    });
});
