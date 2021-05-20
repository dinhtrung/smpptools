import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDataFile, getDataFileIdentifier } from '../data-file.model';

export type EntityResponseType = HttpResponse<IDataFile>;
export type EntityArrayResponseType = HttpResponse<IDataFile[]>;

@Injectable({ providedIn: 'root' })
export class DataFileService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/data-files');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(dataFile: IDataFile): Observable<EntityResponseType> {
    return this.http.post<IDataFile>(this.resourceUrl, dataFile, { observe: 'response' });
  }

  update(dataFile: IDataFile): Observable<EntityResponseType> {
    return this.http.put<IDataFile>(`${this.resourceUrl}/${getDataFileIdentifier(dataFile) as string}`, dataFile, { observe: 'response' });
  }

  partialUpdate(dataFile: IDataFile): Observable<EntityResponseType> {
    return this.http.patch<IDataFile>(`${this.resourceUrl}/${getDataFileIdentifier(dataFile) as string}`, dataFile, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDataFile>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDataFile[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDataFileToCollectionIfMissing(dataFileCollection: IDataFile[], ...dataFilesToCheck: (IDataFile | null | undefined)[]): IDataFile[] {
    const dataFiles: IDataFile[] = dataFilesToCheck.filter(isPresent);
    if (dataFiles.length > 0) {
      const dataFileCollectionIdentifiers = dataFileCollection.map(dataFileItem => getDataFileIdentifier(dataFileItem)!);
      const dataFilesToAdd = dataFiles.filter(dataFileItem => {
        const dataFileIdentifier = getDataFileIdentifier(dataFileItem);
        if (dataFileIdentifier == null || dataFileCollectionIdentifiers.includes(dataFileIdentifier)) {
          return false;
        }
        dataFileCollectionIdentifiers.push(dataFileIdentifier);
        return true;
      });
      return [...dataFilesToAdd, ...dataFileCollection];
    }
    return dataFileCollection;
  }
}
