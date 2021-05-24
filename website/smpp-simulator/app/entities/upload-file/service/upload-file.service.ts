import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUploadFile, getUploadFileIdentifier } from '../upload-file.model';

export type EntityResponseType = HttpResponse<IUploadFile>;
export type EntityArrayResponseType = HttpResponse<IUploadFile[]>;

@Injectable({ providedIn: 'root' })
export class UploadFileService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/file-browser');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(uploadFile: IUploadFile): Observable<EntityResponseType> {
    return this.http.post<IUploadFile>(this.resourceUrl, uploadFile, { observe: 'response' });
  }

  update(uploadFile: IUploadFile): Observable<EntityResponseType> {
    return this.http.put<IUploadFile>(`${this.resourceUrl}/${getUploadFileIdentifier(uploadFile) as string}`, uploadFile, {
      observe: 'response',
    });
  }

  partialUpdate(uploadFile: IUploadFile): Observable<EntityResponseType> {
    return this.http.patch<IUploadFile>(`${this.resourceUrl}/${getUploadFileIdentifier(uploadFile) as string}`, uploadFile, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IUploadFile>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUploadFile[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addUploadFileToCollectionIfMissing(
    uploadFileCollection: IUploadFile[],
    ...uploadFilesToCheck: (IUploadFile | null | undefined)[]
  ): IUploadFile[] {
    const uploadFiles: IUploadFile[] = uploadFilesToCheck.filter(isPresent);
    if (uploadFiles.length > 0) {
      const uploadFileCollectionIdentifiers = uploadFileCollection.map(uploadFileItem => getUploadFileIdentifier(uploadFileItem)!);
      const uploadFilesToAdd = uploadFiles.filter(uploadFileItem => {
        const uploadFileIdentifier = getUploadFileIdentifier(uploadFileItem);
        if (uploadFileIdentifier == null || uploadFileCollectionIdentifiers.includes(uploadFileIdentifier)) {
          return false;
        }
        uploadFileCollectionIdentifiers.push(uploadFileIdentifier);
        return true;
      });
      return [...uploadFilesToAdd, ...uploadFileCollection];
    }
    return uploadFileCollection;
  }
}
