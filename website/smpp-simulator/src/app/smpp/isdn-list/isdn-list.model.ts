export interface IIsdnList {
  id?: string;
  name?: string;
  description?: string | null;
  content?: string | null;
  cnt?: number;
}

export class IsdnList implements IIsdnList {
  constructor(
    public id?: string,
    public name?: string,
    public description?: string | null,
    public content?: string | null,
    public cnt?: number
  ) {
    this.cnt = 100000;
  }
}

export function getIsdnListIdentifier(isdnList: IIsdnList): string | undefined {
  return isdnList.id;
}
