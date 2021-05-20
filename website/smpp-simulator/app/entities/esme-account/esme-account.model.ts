export interface IEsmeAccount {
  id?: string;
  name?: string;
  description?: string | null;
  isEnable?: boolean | null;
  isPersist?: boolean | null;
  numBinds?: number | null;
  host?: string | null;
  port?: number | null;
  systemID?: string | null;
  password?: string | null;
  bindType?: string | null;
  systemType?: string | null;
  interfaceVersion?: number | null;
  addressRange?: string | null;
  addressTON?: number | null;
  addressNPI?: number | null;
  moErrorRate?: number | null;
  moErrorCode?: number | null;
  dlrErrorRate?: number | null;
  dlrErrorCode?: number | null;
  mtThroughtput?: number | null;
  enquireLinkInterval?: number | null;
  connectionTimeout?: number | null;
  windowSize?: number | null;
  reconnectDelay?: number | null;
}

export class EsmeAccount implements IEsmeAccount {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string | null,
    public isEnable?: boolean | null,
    public isPersist?: boolean | null,
    public numBinds?: number | null,
    public host?: string | null,
    public port?: number | null,
    public systemID?: string | null,
    public password?: string | null,
    public bindType?: string | null,
    public systemType?: string | null,
    public interfaceVersion?: number | null,
    public addressRange?: string | null,
    public addressTON?: number | null,
    public addressNPI?: number | null,
    public moErrorRate?: number | null,
    public moErrorCode?: number | null,
    public dlrErrorRate?: number | null,
    public dlrErrorCode?: number | null,
    public mtThroughtput?: number | null,
    public enquireLinkInterval?: number | null,
    public connectionTimeout?: number | null,
    public windowSize?: number | null,
    public reconnectDelay?: number | null
  ) {
    this.bindType = this.bindType ?? 'transceiver';
    this.isEnable = this.isEnable ?? false;
    this.isPersist = this.isPersist ?? false;
  }
}

export function getEsmeAccountIdentifier(esmeAccount: IEsmeAccount): string | undefined {
  return esmeAccount.id;
}
