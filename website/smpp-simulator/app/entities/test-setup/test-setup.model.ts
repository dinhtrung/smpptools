export interface ITestSetup {
  id?: string;
  name?: string;
  description?: string | null;
  accountFileContentType?: string;
  accountFile?: string;
  connectionFileContentType?: string | null;
  connectionFile?: string | null;
  supplierFileContentType?: string | null;
  supplierFile?: string | null;
}

export class TestSetup implements ITestSetup {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string | null,
    public accountFileContentType?: string,
    public accountFile?: string,
    public connectionFileContentType?: string | null,
    public connectionFile?: string | null,
    public supplierFileContentType?: string | null,
    public supplierFile?: string | null
  ) {}
}

export function getTestSetupIdentifier(testSetup: ITestSetup): string | undefined {
  return testSetup.id;
}
