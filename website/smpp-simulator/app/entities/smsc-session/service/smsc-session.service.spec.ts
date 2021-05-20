import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISmscSession, SmscSession } from '../smsc-session.model';

import { SmscSessionService } from './smsc-session.service';

describe('Service Tests', () => {
  describe('SmscSession Service', () => {
    let service: SmscSessionService;
    let httpMock: HttpTestingController;
    let elemDefault: ISmscSession;
    let expectedResult: ISmscSession | ISmscSession[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SmscSessionService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 'AAAAAAA',
        remoteAddr: 'AAAAAAA',
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

      it('should create a SmscSession', () => {
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

        service.create(new SmscSession()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SmscSession', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            remoteAddr: 'BBBBBB',
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

      it('should partial update a SmscSession', () => {
        const patchObject = Object.assign(
          {
            createdAt: currentDate.format(DATE_TIME_FORMAT),
          },
          new SmscSession()
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

      it('should return a list of SmscSession', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            remoteAddr: 'BBBBBB',
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

      it('should delete a SmscSession', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSmscSessionToCollectionIfMissing', () => {
        it('should add a SmscSession to an empty array', () => {
          const smscSession: ISmscSession = { id: 'ABC' };
          expectedResult = service.addSmscSessionToCollectionIfMissing([], smscSession);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(smscSession);
        });

        it('should not add a SmscSession to an array that contains it', () => {
          const smscSession: ISmscSession = { id: 'ABC' };
          const smscSessionCollection: ISmscSession[] = [
            {
              ...smscSession,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addSmscSessionToCollectionIfMissing(smscSessionCollection, smscSession);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a SmscSession to an array that doesn't contain it", () => {
          const smscSession: ISmscSession = { id: 'ABC' };
          const smscSessionCollection: ISmscSession[] = [{ id: 'CBA' }];
          expectedResult = service.addSmscSessionToCollectionIfMissing(smscSessionCollection, smscSession);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(smscSession);
        });

        it('should add only unique SmscSession to an array', () => {
          const smscSessionArray: ISmscSession[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'middleware Creative Bacon' }];
          const smscSessionCollection: ISmscSession[] = [{ id: 'ABC' }];
          expectedResult = service.addSmscSessionToCollectionIfMissing(smscSessionCollection, ...smscSessionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const smscSession: ISmscSession = { id: 'ABC' };
          const smscSession2: ISmscSession = { id: 'CBA' };
          expectedResult = service.addSmscSessionToCollectionIfMissing([], smscSession, smscSession2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(smscSession);
          expect(expectedResult).toContain(smscSession2);
        });

        it('should accept null and undefined values', () => {
          const smscSession: ISmscSession = { id: 'ABC' };
          expectedResult = service.addSmscSessionToCollectionIfMissing([], null, smscSession, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(smscSession);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
