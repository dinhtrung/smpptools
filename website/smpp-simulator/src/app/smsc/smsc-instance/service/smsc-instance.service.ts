import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISmscInstance, getSmscInstanceIdentifier } from '../smsc-instance.model';

export type EntityResponseType = HttpResponse<ISmscInstance>;
export type EntityArrayResponseType = HttpResponse<ISmscInstance[]>;

@Injectable({ providedIn: 'root' })
export class SmscInstanceService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/smsc-instances');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(smscInstance: ISmscInstance): Observable<EntityResponseType> {
    return this.http.post<ISmscInstance>(this.resourceUrl, smscInstance, { observe: 'response' });
  }

  update(smscInstance: ISmscInstance): Observable<EntityResponseType> {
    return this.http.put<ISmscInstance>(`${this.resourceUrl}/${getSmscInstanceIdentifier(smscInstance) as string}`, smscInstance, {
      observe: 'response',
    });
  }

  partialUpdate(smscInstance: ISmscInstance): Observable<EntityResponseType> {
    return this.http.patch<ISmscInstance>(`${this.resourceUrl}/${getSmscInstanceIdentifier(smscInstance) as string}`, smscInstance, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISmscInstance>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISmscInstance[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSmscInstanceToCollectionIfMissing(
    smscInstanceCollection: ISmscInstance[],
    ...smscInstancesToCheck: (ISmscInstance | null | undefined)[]
  ): ISmscInstance[] {
    const smscInstances: ISmscInstance[] = smscInstancesToCheck.filter(isPresent);
    if (smscInstances.length > 0) {
      const smscInstanceCollectionIdentifiers = smscInstanceCollection.map(
        smscInstanceItem => getSmscInstanceIdentifier(smscInstanceItem)!
      );
      const smscInstancesToAdd = smscInstances.filter(smscInstanceItem => {
        const smscInstanceIdentifier = getSmscInstanceIdentifier(smscInstanceItem);
        if (smscInstanceIdentifier == null || smscInstanceCollectionIdentifiers.includes(smscInstanceIdentifier)) {
          return false;
        }
        smscInstanceCollectionIdentifiers.push(smscInstanceIdentifier);
        return true;
      });
      return [...smscInstancesToAdd, ...smscInstanceCollection];
    }
    return smscInstanceCollection;
  }
}
