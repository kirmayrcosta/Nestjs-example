import {TraceTelemetryProtocol} from "../../../../src/infra/protocols/telemetry/trace-telemetry.protocol";


jest.mock("@opentelemetry/auto-instrumentations-node", () => {
    return {
        getNodeAutoInstrumentations: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
})

jest.mock("@opentelemetry/exporter-trace-otlp-grpc", () => {
    return {
        OTLPTraceExporter: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
})

jest.mock("@opentelemetry/sdk-node", () => {
    return {
        NodeSDK: jest.fn().mockImplementation(() => {
            return {
                start: jest.fn().mockImplementation(() => {}),
                shutdown: jest.fn().mockImplementation(() => {}),
            };
        }),
    };
})

jest.mock("@opentelemetry/resources", () => {
    return {
        Resource: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
})

describe('Given TraceTelemetryProtocol', () => {
    let traceTelemetryProtocol: TraceTelemetryProtocol;
    beforeEach(async () => {
        traceTelemetryProtocol = new TraceTelemetryProtocol();
    });
    it('When called to send trace Then return success', async () => {

        traceTelemetryProtocol.start();
        expect(traceTelemetryProtocol).toBeDefined();
        expect(traceTelemetryProtocol.shutdown).toBeDefined();
        expect(traceTelemetryProtocol.start).toBeDefined();
    });

});
