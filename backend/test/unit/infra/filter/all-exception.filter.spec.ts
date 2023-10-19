import {AllExceptionFilter} from "../../../../src/infra/filter/all-exception.filter";

jest.mock("../../../../src/infra/protocols/logger/logger-client.protocols", () => {
    return {
        LoggerClientProtocols: jest.fn().mockImplementation(() => {
            return {
                setCtx: jest.fn().mockReturnValue({}),
                error: jest.fn(),
                warn: jest.fn(),
            };
        }),
    };
});
import {LoggerClientProtocols} from "../../../../src/infra/protocols/logger/logger-client.protocols";
import {HttpException} from "@nestjs/common";


const logger = {
    error: jest.fn(),
    warn: jest.fn(),
};


const host = {
    switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
            path: '/v1/currency',
            method: 'GET',
        }),
        getResponse: jest.fn().mockReturnValue({
            status: jest.fn().mockReturnValue({
                json: jest.fn().mockReturnValue({}),
            }),
        }),
    }),
}

const exception = {
    getStatus: jest.fn().mockReturnValue(500),
    getResponse: jest.fn().mockReturnValue({})
}


describe('Given AllExceptionFilter', () => {
    let allExceptionFilter: AllExceptionFilter;

    beforeEach(async () => {
        allExceptionFilter = new AllExceptionFilter(new LoggerClientProtocols());
    });
    it('When call to catch Exception Should return the response with internal error', async () => {
        allExceptionFilter.catch(new Error("Ocorreu um erro"), host as any);
        // const httpException = new HttpException({}, 400);
        expect(host.switchToHttp).toBeCalled();
        expect(exception.getStatus).toBeCalledTimes(0);
        expect(host.switchToHttp().getResponse().status).toBeCalledWith(500);
        expect(host.switchToHttp().getResponse().status().json).toBeCalledWith({
            "message": "Ocorreu um erro",
            "statusCode": 500
        });
    });

    it('When call to catch Exception Should return the response with Business error', async () => {
        const httpException = new HttpException({
            "message": "Ocorreu um erro",
        }, 400);
        allExceptionFilter.catch(httpException, host as any);

        expect(host.switchToHttp).toBeCalled();
        expect(exception.getStatus).toBeCalledTimes(0);
        expect(host.switchToHttp().getResponse().status).toBeCalledWith(400);
        expect(host.switchToHttp().getResponse().status().json).toBeCalledWith({
            "message": "Ocorreu um erro",
            "statusCode": 400
        });
    });

    it('When call to catch Exception Should return the response with Empty Error', async () => {
        const httpException = new HttpException({
        }, 400);
        allExceptionFilter.catch(httpException, host as any);

        expect(host.switchToHttp).toBeCalled();
        expect(exception.getStatus).toBeCalledTimes(0);
        expect(host.switchToHttp().getResponse().status).toBeCalledWith(400);
        expect(host.switchToHttp().getResponse().status().json).toBeCalledWith({
            "message": "Ocorreu um erro",
            "statusCode": 400
        });
    });
});
