import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISmscAccount, SmscAccount } from '../smsc-account.model';

import { SmscAccountService } from './smsc-account.service';

describe('Service Tests', () => {
  describe('SmscAccount Service', () => {
    let service: SmscAccountService;
    let httpMock: HttpTestingController;
    let elemDefault: ISmscAccount;
    let expectedResult: ISmscAccount | ISmscAccount[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SmscAccountService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        name: 'AAAAAAA',
        description: 'AAAAAAA',
        maxBinds: 0,
        systemID: 'AAAAAAA',
        password: 'AAAAAAA',
        bindType: 'AAAAAAA',
        addressRange: 'AAAAAAA',
        addressTON: 0,
        addressNPI: 0,
        moErrorRate: 0,
        moErrorCode: 0,
        dlrErrorRate: 0,
        dlrErrorCode: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('ABC').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a SmscAccount', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new SmscAccount()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SmscAccount', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            maxBinds: 1,
            systemID: 'BBBBBB',
            password: 'BBBBBB',
            bindType: 'BBBBBB',
            addressRange: 'BBBBBB',
            addressTON: 1,
            addressNPI: 1,
            moErrorRate: 1,
            moErrorCode: 1,
            dlrErrorRate: 1,
            dlrErrorCode: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a SmscAccount', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            maxBinds: 1,
            password: 'BBBBBB',
            bindType: 'BBBBBB',
            addressRange: 'BBBBBB',
            addressNPI: 1,
            moErrorRate: 1,
          },
          new SmscAccount()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SmscAccount', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            maxBinds: 1,
            systemID: 'BBBBBB',
            password: 'BBBBBB',
            bindType: 'BBBBBB',
            addressRange: 'BBBBBB',
            addressTON: 1,
            addressNPI: 1,
            moErrorRate: 1,
            moErrorCode: 1,
            dlrErrorRate: 1,
            dlrErrorCode: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SmscAccount', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSmscAccountToCollectionIfMissing', () => {
        it('should add a SmscAccount to an empty array', () => {
          const smscAccount: ISmscAccount = { id: 'ABC' };
          expectedResult = service.addSmscAccountToCollectionIfMissing([], smscAccount);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(smscAccount);
        });

        it('should not add a SmscAccount to an array that contains it', () => {
          const smscAccount: ISmscAccount = { id: 'ABC' };
          const smscAccountCollection: ISmscAccount[] = [
            {
              ...smscAccount,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addSmscAccountToCollectionIfMissing(smscAccountCollection, smscAccount);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a SmscAccount to an array that doesn't contain it", () => {
          const smscAccount: ISmscAccount = { id: 'ABC' };
          const smscAccountCollection: ISmscAccount[] = [{ id: 'CBA' }];
          expectedResult = service.addSmscAccountToCollectionIfMissing(smscAccountCollection, smscAccount);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(smscAccount);
        });

        it('should add only unique SmscAccount to an array', () => {
          const smscAccountArray: ISmscAccount[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'integrate withdrawal solid' }];
          const smscAccountCollection: ISmscAccount[] = [{ id: 'ABC' }];
          expectedResult = service.addSmscAccountToCollectionIfMissing(smscAccountCollection, ...smscAccountArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const smscAccount: ISmscAccount = { id: 'ABC' };
          const smscAccount2: ISmscAccount = { id: 'CBA' };
          expectedResult = service.addSmscAccountToCollectionIfMissing([], smscAccount, smscAccount2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(smscAccount);
          expect(expectedResult).toContain(smscAccount2);
        });

        it('should accept null and undefined values', () => {
          const smscAccount: ISmscAccount = { id: 'ABC' };
          expectedResult = service.addSmscAccountToCollectionIfMissing([], null, smscAccount, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(smscAccount);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
