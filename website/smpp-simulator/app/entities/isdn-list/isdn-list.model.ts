export interface IIsdnList {
  id?: string;
  name?: string;
  description?: string | null;
  content?: string | null;
}

export class IsdnList implements IIsdnList {
  constructor(public id?: string, public name?: string, public description?: string | null, public content?: string | null) {}
}

export function getIsdnListIdentifier(isdnList: IIsdnList): string | undefined {
  return isdnList.id;
}
