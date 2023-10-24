export interface IMetric {
  histogramRecord(duration: number, field: any): void;
  start(): void;
}
