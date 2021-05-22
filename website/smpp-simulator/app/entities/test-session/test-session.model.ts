export interface ITestSession {
  id?: string;
  name?: string;
  description?: string | null;
  testSetup?: string | null;
  trafficFileContentType?: string | null;
  trafficFile?: string | null;
  patternVariant?: string | null;
}

export class TestSession implements ITestSession {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string | null,
    public testSetup?: string | null,
    public trafficFileContentType?: string | null,
    public trafficFile?: string | null,
    public patternVariant?: string | null
  ) {}
}

export function getTestSessionIdentifier(testSession: ITestSession): string | undefined {
  return testSession.id;
}
