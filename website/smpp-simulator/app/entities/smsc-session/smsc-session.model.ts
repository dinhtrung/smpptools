import * as dayjs from 'dayjs';

export interface ISmscSession {
  id?: string;
  remoteAddr?: string | null;
  createdAt?: dayjs.Dayjs | null;
}

export class SmscSession implements ISmscSession {
  constructor(public id?: string, public remoteAddr?: string | null, public createdAt?: dayjs.Dayjs | null) {}
}

export function getSmscSessionIdentifier(smscSession: ISmscSession): string | undefined {
  return smscSession.id;
}
