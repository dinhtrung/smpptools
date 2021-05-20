import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

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

  create(esmeSession: IEsmeSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(esmeSession);
    return this.http
      .post<IEsmeSession>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(esmeSession: IEsmeSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(esmeSession);
    return this.http
      .put<IEsmeSession>(`${this.resourceUrl}/${getEsmeSessionIdentifier(esmeSession) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(esmeSession: IEsmeSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(esmeSession);
    return this.http
      .patch<IEsmeSession>(`${this.resourceUrl}/${getEsmeSessionIdentifier(esmeSession) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IEsmeSession>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEsmeSession[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addEsmeSessionToCollectionIfMissing(
    esmeSessionCollection: IEsmeSession[],
    ...esmeSessionsToCheck: (IEsmeSession | null | undefined)[]
  ): IEsmeSession[] {
    const esmeSessions: IEsmeSession[] = esmeSessionsToCheck.filter(isPresent);
    if (esmeSessions.length > 0) {
      const esmeSessionCollectionIdentifiers = esmeSessionCollection.map(esmeSessionItem => getEsmeSessionIdentifier(esmeSessionItem)!);
      const esmeSessionsToAdd = esmeSessions.filter(esmeSessionItem => {
        const esmeSessionIdentifier = getEsmeSessionIdentifier(esmeSessionItem);
        if (esmeSessionIdentifier == null || esmeSessionCollectionIdentifiers.includes(esmeSessionIdentifier)) {
          return false;
        }
        esmeSessionCollectionIdentifiers.push(esmeSessionIdentifier);
        return true;
      });
      return [...esmeSessionsToAdd, ...esmeSessionCollection];
    }
    return esmeSessionCollection;
  }

  protected convertDateFromClient(esmeSession: IEsmeSession): IEsmeSession {
    return Object.assign({}, esmeSession, {
      createdAt: esmeSession.createdAt?.isValid() ? esmeSession.createdAt.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? dayjs(res.body.createdAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((esmeSession: IEsmeSession) => {
        esmeSession.createdAt = esmeSession.createdAt ? dayjs(esmeSession.createdAt) : undefined;
      });
    }
    return res;
  }
}
