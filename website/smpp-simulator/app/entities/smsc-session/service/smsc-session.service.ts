import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISmscSession, getSmscSessionIdentifier } from '../smsc-session.model';

export type EntityResponseType = HttpResponse<ISmscSession>;
export type EntityArrayResponseType = HttpResponse<ISmscSession[]>;

@Injectable({ providedIn: 'root' })
export class SmscSessionService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/smsc-sessions');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(smscSession: ISmscSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(smscSession);
    return this.http
      .post<ISmscSession>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(smscSession: ISmscSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(smscSession);
    return this.http
      .put<ISmscSession>(`${this.resourceUrl}/${getSmscSessionIdentifier(smscSession) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(smscSession: ISmscSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(smscSession);
    return this.http
      .patch<ISmscSession>(`${this.resourceUrl}/${getSmscSessionIdentifier(smscSession) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ISmscSession>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISmscSession[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSmscSessionToCollectionIfMissing(
    smscSessionCollection: ISmscSession[],
    ...smscSessionsToCheck: (ISmscSession | null | undefined)[]
  ): ISmscSession[] {
    const smscSessions: ISmscSession[] = smscSessionsToCheck.filter(isPresent);
    if (smscSessions.length > 0) {
      const smscSessionCollectionIdentifiers = smscSessionCollection.map(smscSessionItem => getSmscSessionIdentifier(smscSessionItem)!);
      const smscSessionsToAdd = smscSessions.filter(smscSessionItem => {
        const smscSessionIdentifier = getSmscSessionIdentifier(smscSessionItem);
        if (smscSessionIdentifier == null || smscSessionCollectionIdentifiers.includes(smscSessionIdentifier)) {
          return false;
        }
        smscSessionCollectionIdentifiers.push(smscSessionIdentifier);
        return true;
      });
      return [...smscSessionsToAdd, ...smscSessionCollection];
    }
    return smscSessionCollection;
  }

  protected convertDateFromClient(smscSession: ISmscSession): ISmscSession {
    return Object.assign({}, smscSession, {
      createdAt: smscSession.createdAt?.isValid() ? smscSession.createdAt.toJSON() : undefined,
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
      res.body.forEach((smscSession: ISmscSession) => {
        smscSession.createdAt = smscSession.createdAt ? dayjs(smscSession.createdAt) : undefined;
      });
    }
    return res;
  }
}
