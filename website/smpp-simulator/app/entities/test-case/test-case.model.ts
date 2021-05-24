import * as dayjs from 'dayjs';

export interface ITestCase {
  id?: string;
  name?: string | null;
  description?: string | null;
  testSession?: string | null;
  state?: number | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
}

export class TestCase implements ITestCase {
  constructor(
    public id?: string,
    public name?: string | null,
    public description?: string | null,
    public testSession?: string | null,
    public state?: number | null,
    public createdAt?: dayjs.Dayjs | null,
    public updatedAt?: dayjs.Dayjs | null
  ) {}
}

export function getTestCaseIdentifier(testCase: ITestCase): string | undefined {
  return testCase.id;
}
