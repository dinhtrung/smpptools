import * as dayjs from 'dayjs';
import { ISmscAccount, SmscAccount } from '../smsc-account/smsc-account.model';

export interface ISmscSession {
  id?: string;
  remoteAddr?: string | null;
  localAddr?: string | null;
  createdAt?: dayjs.Dayjs | null;
  account?: ISmscAccount | null;
}

export class SmscSession implements ISmscSession {
  constructor(
    public id?: string,
    public remoteAddr?: string | null,
    public localAddr?: string | null,
    public createdAt?: dayjs.Dayjs | null,
    public account?: SmscAccount | null
  ) {}
}

export function getSmscSessionIdentifier(smscSession: ISmscSession): string | undefined {
  return smscSession.id;
}
