import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEsmeAccount, EsmeAccount } from '../esme-account.model';

import { EsmeAccountService } from './esme-account.service';

describe('Service Tests', () => {
  describe('EsmeAccount Service', () => {
    let service: EsmeAccountService;
    let httpMock: HttpTestingController;
    let elemDefault: IEsmeAccount;
    let expectedResult: IEsmeAccount | IEsmeAccount[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EsmeAccountService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        name: 'AAAAAAA',
        description: 'AAAAAAA',
        isEnable: false,
        isPersist: false,
        numBinds: 0,
        host: 'AAAAAAA',
        port: 0,
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
        mtThroughtput: 0,
        enquireLinkInterval: 0,
        connectionTimeout: 0,
        windowSize: 0,
        reconnectDelay: 0,
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

      it('should create a EsmeAccount', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EsmeAccount()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EsmeAccount', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            isEnable: true,
            isPersist: true,
            numBinds: 1,
            host: 'BBBBBB',
            port: 1,
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
            mtThroughtput: 1,
            enquireLinkInterval: 1,
            connectionTimeout: 1,
            windowSize: 1,
            reconnectDelay: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a EsmeAccount', () => {
        const patchObject = Object.assign(
          {
            name: 'BBBBBB',
            numBinds: 1,
            host: 'BBBBBB',
            systemID: 'BBBBBB',
            password: 'BBBBBB',
            addressRange: 'BBBBBB',
            moErrorRate: 1,
            moErrorCode: 1,
            dlrErrorRate: 1,
            mtThroughtput: 1,
            enquireLinkInterval: 1,
            connectionTimeout: 1,
          },
          new EsmeAccount()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EsmeAccount', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            name: 'BBBBBB',
            description: 'BBBBBB',
            isEnable: true,
            isPersist: true,
            numBinds: 1,
            host: 'BBBBBB',
            port: 1,
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
            mtThroughtput: 1,
            enquireLinkInterval: 1,
            connectionTimeout: 1,
            windowSize: 1,
            reconnectDelay: 1,
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

      it('should delete a EsmeAccount', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEsmeAccountToCollectionIfMissing', () => {
        it('should add a EsmeAccount to an empty array', () => {
          const esmeAccount: IEsmeAccount = { id: 'ABC' };
          expectedResult = service.addEsmeAccountToCollectionIfMissing([], esmeAccount);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(esmeAccount);
        });

        it('should not add a EsmeAccount to an array that contains it', () => {
          const esmeAccount: IEsmeAccount = { id: 'ABC' };
          const esmeAccountCollection: IEsmeAccount[] = [
            {
              ...esmeAccount,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addEsmeAccountToCollectionIfMissing(esmeAccountCollection, esmeAccount);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EsmeAccount to an array that doesn't contain it", () => {
          const esmeAccount: IEsmeAccount = { id: 'ABC' };
          const esmeAccountCollection: IEsmeAccount[] = [{ id: 'CBA' }];
          expectedResult = service.addEsmeAccountToCollectionIfMissing(esmeAccountCollection, esmeAccount);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(esmeAccount);
        });

        it('should add only unique EsmeAccount to an array', () => {
          const esmeAccountArray: IEsmeAccount[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'redefine Missouri Checking' }];
          const esmeAccountCollection: IEsmeAccount[] = [{ id: 'ABC' }];
          expectedResult = service.addEsmeAccountToCollectionIfMissing(esmeAccountCollection, ...esmeAccountArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const esmeAccount: IEsmeAccount = { id: 'ABC' };
          const esmeAccount2: IEsmeAccount = { id: 'CBA' };
          expectedResult = service.addEsmeAccountToCollectionIfMissing([], esmeAccount, esmeAccount2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(esmeAccount);
          expect(expectedResult).toContain(esmeAccount2);
        });

        it('should accept null and undefined values', () => {
          const esmeAccount: IEsmeAccount = { id: 'ABC' };
          expectedResult = service.addEsmeAccountToCollectionIfMissing([], null, esmeAccount, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(esmeAccount);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
