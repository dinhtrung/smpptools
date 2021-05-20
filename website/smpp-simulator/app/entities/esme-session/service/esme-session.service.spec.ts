import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEsmeSession, EsmeSession } from '../esme-session.model';

import { EsmeSessionService } from './esme-session.service';

describe('Service Tests', () => {
  describe('EsmeSession Service', () => {
    let service: EsmeSessionService;
    let httpMock: HttpTestingController;
    let elemDefault: IEsmeSession;
    let expectedResult: IEsmeSession | IEsmeSession[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EsmeSessionService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 'AAAAAAA',
        localAddr: 'AAAAAAA',
        createdAt: currentDate,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            createdAt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find('ABC').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a EsmeSession', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            createdAt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate,
          },
          returnedFromService
        );

        service.create(new EsmeSession()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EsmeSession', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            localAddr: 'BBBBBB',
            createdAt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a EsmeSession', () => {
        const patchObject = Object.assign(
          {
            createdAt: currentDate.format(DATE_TIME_FORMAT),
          },
          new EsmeSession()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            createdAt: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EsmeSession', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            localAddr: 'BBBBBB',
            createdAt: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a EsmeSession', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEsmeSessionToCollectionIfMissing', () => {
        it('should add a EsmeSession to an empty array', () => {
          const esmeSession: IEsmeSession = { id: 'ABC' };
          expectedResult = service.addEsmeSessionToCollectionIfMissing([], esmeSession);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(esmeSession);
        });

        it('should not add a EsmeSession to an array that contains it', () => {
          const esmeSession: IEsmeSession = { id: 'ABC' };
          const esmeSessionCollection: IEsmeSession[] = [
            {
              ...esmeSession,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addEsmeSessionToCollectionIfMissing(esmeSessionCollection, esmeSession);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EsmeSession to an array that doesn't contain it", () => {
          const esmeSession: IEsmeSession = { id: 'ABC' };
          const esmeSessionCollection: IEsmeSession[] = [{ id: 'CBA' }];
          expectedResult = service.addEsmeSessionToCollectionIfMissing(esmeSessionCollection, esmeSession);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(esmeSession);
        });

        it('should add only unique EsmeSession to an array', () => {
          const esmeSessionArray: IEsmeSession[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'virtual deposit' }];
          const esmeSessionCollection: IEsmeSession[] = [{ id: 'ABC' }];
          expectedResult = service.addEsmeSessionToCollectionIfMissing(esmeSessionCollection, ...esmeSessionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const esmeSession: IEsmeSession = { id: 'ABC' };
          const esmeSession2: IEsmeSession = { id: 'CBA' };
          expectedResult = service.addEsmeSessionToCollectionIfMissing([], esmeSession, esmeSession2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(esmeSession);
          expect(expectedResult).toContain(esmeSession2);
        });

        it('should accept null and undefined values', () => {
          const esmeSession: IEsmeSession = { id: 'ABC' };
          expectedResult = service.addEsmeSessionToCollectionIfMissing([], null, esmeSession, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(esmeSession);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
