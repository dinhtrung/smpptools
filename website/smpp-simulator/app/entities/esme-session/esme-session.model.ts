import * as dayjs from 'dayjs';

export interface IEsmeSession {
  id?: string;
  localAddr?: string | null;
  createdAt?: dayjs.Dayjs | null;
}

export class EsmeSession implements IEsmeSession {
  constructor(public id?: string, public localAddr?: string | null, public createdAt?: dayjs.Dayjs | null) {}
}

export function getEsmeSessionIdentifier(esmeSession: IEsmeSession): string | undefined {
  return esmeSession.id;
}
