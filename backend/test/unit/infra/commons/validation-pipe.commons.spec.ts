// const logger = {
//     debug: jest.fn(),
//     info: jest.fn(),
//     error: jest.fn(),
//     warn: jest.fn(),
// };

// IMPORTANT First mock winston
// jest.mock("winston", () => ({
//     createLogger: jest.fn().mockReturnValue(logger),
//     transports: {
//         Console: jest.fn()
//     }
// }));

// IMPORTANT import the mock after
// import * as winston from "winston";

import ValidationPipeCommons from "../../../../src/infra/commons/validation-pipe.commons";
import {BadRequestException} from "@nestjs/common";


describe('Given ValidationPipeCommons', () => {
    let validationPipeCommons: any;
    beforeEach(async () => {
  //      loggerClientProtocols = new LoggerClientProtocols();
        validationPipeCommons = ValidationPipeCommons();
    });
        it('When call to validation Pipe Should return Bad request result', async () => {
            const mock =[
                {
                    "target": {
                        "name": "",
                        "alias": "",
                        "quotes": [{ "alias": "USD", "price": 5.0557 }]
                    },
                    "value": "",
                    "property": "name",
                    "children": [],
                    "constraints": { "isNotEmpty": "name should not be empty" }
                }
            ]

            const exceptionResult = [
                {
                    "property": "name",
                    "message": "name should not be empty"
                },
                {
                    "property": "alias",
                    "message": "alias should not be empty"
                }
            ]
            const result = validationPipeCommons.exceptionFactory(mock)
            expect(result).toEqual(new BadRequestException(exceptionResult))
        });
});
