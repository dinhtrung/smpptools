export interface IBaseSm {
  id?: string;
  name?: string;
  description?: string;
  serviceType?: string | null;
  sourceTON?: number;
  sourceNPI?: number;
  sourceAddr?: string | null;
  destinationTON?: number;
  destinationNPI?: number;
  destinationAddr?: string | null;
  esmClass?: number | null;
  protocolID?: number | null;
  priorityFlag?: number | null;
  scheduleDeliveryTime?: string | null;
  validityPeriod?: string | null;
  registeredDelivery?: number | null;
  replaceIfPresentFlag?: number | null;
  dataCoding?: number | null;
  defaultMessageID?: number | null;
  text?: string | null;
  udhParts?: string | null;
  txtParts?: string | null;
  tlvList?: string | null;
}

export class BaseSm implements IBaseSm {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string,
    public serviceType?: string | null,
    public sourceTON?: number,
    public sourceNPI?: number,
    public sourceAddr?: string | null,
    public destinationTON?: number,
    public destinationNPI?: number,
    public destinationAddr?: string | null,
    public esmClass?: number | null,
    public protocolID?: number | null,
    public priorityFlag?: number | null,
    public scheduleDeliveryTime?: string | null,
    public validityPeriod?: string | null,
    public registeredDelivery?: number | null,
    public replaceIfPresentFlag?: number | null,
    public dataCoding?: number | null,
    public defaultMessageID?: number | null,
    public text?: string | null,
    public udhParts?: string | null,
    public txtParts?: string | null,
    public tlvList?: string | null
  ) {
    this.sourceTON = -1;
    this.sourceNPI = -1;
    this.destinationTON = -1;
    this.destinationNPI = -1;
  }
}

export function getBaseSmIdentifier(baseSm: IBaseSm): string | undefined {
  return baseSm.id;
}
