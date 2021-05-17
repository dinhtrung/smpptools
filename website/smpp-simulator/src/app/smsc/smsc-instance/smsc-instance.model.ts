export interface ISmscInstance {
  id?: string;
  name?: string;
  description?: string | null;
  port?: number | null;
  isPersist?: boolean | null;
  connectionTimeout?: number | null;
  windowSize?: number | null;
}

export class SmscInstance implements ISmscInstance {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string | null,
    public port?: number | null,
    public isPersist?: boolean | null,
    public connectionTimeout?: number | null,
    public windowSize?: number | null
  ) {
    this.isPersist = this.isPersist ?? false;
  }
}

export function getSmscInstanceIdentifier(smscInstance: ISmscInstance): string | undefined {
  return smscInstance.id;
}
