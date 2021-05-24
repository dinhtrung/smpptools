export const PATTERN_VARIANTS = [
  { value: 'STRESS_TEST', label: 'Stress Test' },
  { value: 'TRAFFIC_REDUCTION', label: 'Traffic Reduction' },
  { value: 'TIMESTAMP_SHIFT', label: 'Timestamp Shift' },
  { value: 'SPEED_VARIATION', label: 'Speed Variation' }
];
export interface ITestSession {
  id?: string;
  name?: string;
  description?: string | null;
  testSetup?: string | null;
  trafficFileContentType?: string | null;
  trafficFile?: string | null;
  patternVariant?: string | null;
  patternMin?: number | null;
  patternMax?: number | null;
}

export class TestSession implements ITestSession {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string | null,
    public testSetup?: string | null,
    public trafficFileContentType?: string | null,
    public trafficFile?: string | null,
    public patternVariant?: string | null,
    public patternMin?: number | null,
    public patternMax?: number | null,
  ) {}
}

export function getTestSessionIdentifier(testSession: ITestSession): string | undefined {
  return testSession.id;
}
