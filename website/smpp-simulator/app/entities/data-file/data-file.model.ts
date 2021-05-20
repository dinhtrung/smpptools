export interface IDataFile {
  id?: string;
  name?: string | null;
  description?: string | null;
  fileIDContentType?: string | null;
  fileID?: string | null;
}

export class DataFile implements IDataFile {
  constructor(
    public id?: string,
    public name?: string | null,
    public description?: string | null,
    public fileIDContentType?: string | null,
    public fileID?: string | null
  ) {}
}

export function getDataFileIdentifier(dataFile: IDataFile): string | undefined {
  return dataFile.id;
}
