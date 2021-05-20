export interface ISmscInstance {
  id?: string;
  name?: string;
  systemID?: string;
  description?: string | null;
  port?: number | null;
  isPersist?: boolean | null;
  allowAnonymous?: boolean | null;
  connectionTimeout?: number | null;
  windowSize?: number | null;
}

export class SmscInstance implements ISmscInstance {
  constructor(
    public id?: string,
    public name?: string,
    public systemID?: string,
    public description?: string | null,
    public port?: number | null,
    public isPersist?: boolean | null,
    public allowAnonymous?: boolean | null,
    public connectionTimeout?: number | null,
    public windowSize?: number | null
  ) {
    this.isPersist = this.isPersist ?? false;
    this.allowAnonymous = this.allowAnonymous ?? false;
  }
}

export function getSmscInstanceIdentifier(smscInstance: ISmscInstance): string | undefined {
  return smscInstance.id;
}
