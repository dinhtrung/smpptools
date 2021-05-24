import * as dayjs from 'dayjs';

export interface IUploadFile {
  id?: string;
  name?: string;
  contentType?: string;
  file?: string;
  size?: number;
  etag?: string;
  lastModified?: dayjs.Dayjs | null;
}

export class UploadFile implements IUploadFile {
  constructor(
    public id?: string,
    public name?: string,
    public contentType?: string,
    public file?: string,
    public size?: number,
    public etag?: string,
    public lastModified?: dayjs.Dayjs | null
  ) {}
}

export function getUploadFileIdentifier(uploadFile: IUploadFile): string | undefined {
  return uploadFile.name;
}
