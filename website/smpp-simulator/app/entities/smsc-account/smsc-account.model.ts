export class ErrorRate {
  constructor(public error?: number, public rate?: number, public description?: string | null) {}
}
export interface ISmscAccount {
  id?: string;
  name?: string;
  description?: string | null;
  maxBinds?: number | null;
  systemID?: string;
  password?: string;
  bindType?: string | null;
  addressRange?: string | null;
  addressTON?: number | null;
  addressNPI?: number | null;
  acceptRatio?: ErrorRate[];
  deliveryRatio?: ErrorRate[];
}

export class SmscAccount implements ISmscAccount {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string | null,
    public maxBinds?: number | null,
    public systemID?: string,
    public password?: string,
    public bindType?: string | null,
    public addressRange?: string | null,
    public addressTON?: number | null,
    public addressNPI?: number | null,
    public acceptRatio?: ErrorRate[],
    public deliveryRatio?: ErrorRate[]
  ) {
    this.acceptRatio = [new ErrorRate(0, 100)];
    this.deliveryRatio = [new ErrorRate(0, 100)];
  }
}

export function getSmscAccountIdentifier(smscAccount: ISmscAccount): string | undefined {
  return smscAccount.id;
}
