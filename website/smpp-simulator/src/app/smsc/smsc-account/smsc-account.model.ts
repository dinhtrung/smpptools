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
  moErrorRate?: number | null;
  moErrorCode?: number | null;
  dlrErrorRate?: number | null;
  dlrErrorCode?: number | null;
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
    public moErrorRate?: number | null,
    public moErrorCode?: number | null,
    public dlrErrorRate?: number | null,
    public dlrErrorCode?: number | null
  ) {}
}

export function getSmscAccountIdentifier(smscAccount: ISmscAccount): string | undefined {
  return smscAccount.id;
}
