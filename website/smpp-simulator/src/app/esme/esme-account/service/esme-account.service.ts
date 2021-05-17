import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEsmeAccount, getEsmeAccountIdentifier } from '../esme-account.model';

export type EntityResponseType = HttpResponse<IEsmeAccount>;
export type EntityArrayResponseType = HttpResponse<IEsmeAccount[]>;

@Injectable({ providedIn: 'root' })
export class EsmeAccountService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/esme-accounts');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(esmeAccount: IEsmeAccount): Observable<EntityResponseType> {
    return this.http.post<IEsmeAccount>(this.resourceUrl, esmeAccount, { observe: 'response' });
  }

  update(esmeAccount: IEsmeAccount): Observable<EntityResponseType> {
    return this.http.put<IEsmeAccount>(`${this.resourceUrl}/${getEsmeAccountIdentifier(esmeAccount) as string}`, esmeAccount, {
      observe: 'response',
    });
  }

  partialUpdate(esmeAccount: IEsmeAccount): Observable<EntityResponseType> {
    return this.http.patch<IEsmeAccount>(`${this.resourceUrl}/${getEsmeAccountIdentifier(esmeAccount) as string}`, esmeAccount, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IEsmeAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEsmeAccount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEsmeAccountToCollectionIfMissing(
    esmeAccountCollection: IEsmeAccount[],
    ...esmeAccountsToCheck: (IEsmeAccount | null | undefined)[]
  ): IEsmeAccount[] {
    const esmeAccounts: IEsmeAccount[] = esmeAccountsToCheck.filter(isPresent);
    if (esmeAccounts.length > 0) {
      const esmeAccountCollectionIdentifiers = esmeAccountCollection.map(esmeAccountItem => getEsmeAccountIdentifier(esmeAccountItem)!);
      const esmeAccountsToAdd = esmeAccounts.filter(esmeAccountItem => {
        const esmeAccountIdentifier = getEsmeAccountIdentifier(esmeAccountItem);
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
