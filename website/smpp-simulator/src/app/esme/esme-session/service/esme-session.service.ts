import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEsmeSession, getEsmeSessionIdentifier } from '../esme-session.model';

export type EntityResponseType = HttpResponse<IEsmeSession>;
export type EntityArrayResponseType = HttpResponse<IEsmeSession[]>;

@Injectable({ providedIn: 'root' })
export class EsmeSessionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/esme-sessions');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(esmeAccount: IEsmeSession): Observable<EntityResponseType> {
    return this.http.post<IEsmeSession>(this.resourceUrl, esmeAccount, { observe: 'response' });
  }

  update(esmeAccount: IEsmeSession): Observable<EntityResponseType> {
    return this.http.put<IEsmeSession>(`${this.resourceUrl}/${getEsmeSessionIdentifier(esmeAccount) as string}`, esmeAccount, {
      observe: 'response',
    });
  }

  partialUpdate(esmeAccount: IEsmeSession): Observable<EntityResponseType> {
    return this.http.patch<IEsmeSession>(`${this.resourceUrl}/${getEsmeSessionIdentifier(esmeAccount) as string}`, esmeAccount, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEsmeSession>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEsmeSession[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEsmeSessionToCollectionIfMissing(
    esmeAccountCollection: IEsmeSession[],
    ...esmeAccountsToCheck: (IEsmeSession | null | undefined)[]
  ): IEsmeSession[] {
    const esmeAccounts: IEsmeSession[] = esmeAccountsToCheck.filter(isPresent);
    if (esmeAccounts.length > 0) {
      const esmeAccountCollectionIdentifiers = esmeAccountCollection.map(esmeAccountItem => getEsmeSessionIdentifier(esmeAccountItem)!);
      const esmeAccountsToAdd = esmeAccounts.filter(esmeAccountItem => {
        const esmeAccountIdentifier = getEsmeSessionIdentifier(esmeAccountItem);
        if (esmeAccountIdentifier == null || esmeAccountCollectionIdentifiers.includes(esmeAccountIdentifier)) {
          return false;
        }
        esmeAccountCollectionIdentifiers.push(esmeAccountIdentifier);
        return true;
      });
      return [...esmeAccountsToAdd, ...esmeAccountCollection];
    }
    return esmeAccountCollection;
  }
}
