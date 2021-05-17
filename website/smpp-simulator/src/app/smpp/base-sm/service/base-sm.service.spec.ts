import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBaseSm, BaseSm } from '../base-sm.model';

import { BaseSmService } from './base-sm.service';

describe('Service Tests', () => {
  describe('BaseSm Service', () => {
    let service: BaseSmService;
    let httpMock: HttpTestingController;
    let elemDefault: IBaseSm;
    let expectedResult: IBaseSm | IBaseSm[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(BaseSmService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        serviceType: 'AAAAAAA',
        sourceTON: 0,
        sourceNPI: 0,
        sourceAddr: 'AAAAAAA',
        destinationTON: 0,
        destinationNPI: 0,
        destinationAddr: 'AAAAAAA',
        esmClass: 0,
        protocolID: 0,
        priorityFlag: 0,
        scheduleDeliveryTime: 'AAAAAAA',
        validityPeriod: 'AAAAAAA',
        registeredDelivery: 0,
        replaceIfPresentFlag: 0,
        dataCoding: 0,
        defaultMessageID: 0,
        text: 'AAAAAAA',
        udhParts: 'AAAAAAA',
        txtParts: 'AAAAAAA',
        tlvList: 'AAAAAAA',
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

      it('should create a BaseSm', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new BaseSm()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a BaseSm', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            serviceType: 'BBBBBB',
            sourceTON: 1,
            sourceNPI: 1,
            sourceAddr: 'BBBBBB',
            destinationTON: 1,
            destinationNPI: 1,
            destinationAddr: 'BBBBBB',
            esmClass: 1,
            protocolID: 1,
            priorityFlag: 1,
            scheduleDeliveryTime: 'BBBBBB',
            validityPeriod: 'BBBBBB',
            registeredDelivery: 1,
            replaceIfPresentFlag: 1,
            dataCoding: 1,
            defaultMessageID: 1,
            text: 'BBBBBB',
            udhParts: 'BBBBBB',
            txtParts: 'BBBBBB',
            tlvList: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a BaseSm', () => {
        const patchObject = Object.assign(
          {
            destinationNPI: 1,
            validityPeriod: 'BBBBBB',
            registeredDelivery: 1,
            replaceIfPresentFlag: 1,
            dataCoding: 1,
            text: 'BBBBBB',
            udhParts: 'BBBBBB',
            tlvList: 'BBBBBB',
          },
          new BaseSm()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of BaseSm', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            serviceType: 'BBBBBB',
            sourceTON: 1,
            sourceNPI: 1,
            sourceAddr: 'BBBBBB',
            destinationTON: 1,
            destinationNPI: 1,
            destinationAddr: 'BBBBBB',
            esmClass: 1,
            protocolID: 1,
            priorityFlag: 1,
            scheduleDeliveryTime: 'BBBBBB',
            validityPeriod: 'BBBBBB',
            registeredDelivery: 1,
            replaceIfPresentFlag: 1,
            dataCoding: 1,
            defaultMessageID: 1,
            text: 'BBBBBB',
            udhParts: 'BBBBBB',
            txtParts: 'BBBBBB',
            tlvList: 'BBBBBB',
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

      it('should delete a BaseSm', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addBaseSmToCollectionIfMissing', () => {
        it('should add a BaseSm to an empty array', () => {
          const baseSm: IBaseSm = { id: 'ABC' };
          expectedResult = service.addBaseSmToCollectionIfMissing([], baseSm);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(baseSm);
        });

        it('should not add a BaseSm to an array that contains it', () => {
          const baseSm: IBaseSm = { id: 'ABC' };
          const baseSmCollection: IBaseSm[] = [
            {
              ...baseSm,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addBaseSmToCollectionIfMissing(baseSmCollection, baseSm);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a BaseSm to an array that doesn't contain it", () => {
          const baseSm: IBaseSm = { id: 'ABC' };
          const baseSmCollection: IBaseSm[] = [{ id: 'CBA' }];
          expectedResult = service.addBaseSmToCollectionIfMissing(baseSmCollection, baseSm);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(baseSm);
        });

        it('should add only unique BaseSm to an array', () => {
          const baseSmArray: IBaseSm[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'Up-sized Infrastructure' }];
          const baseSmCollection: IBaseSm[] = [{ id: 'ABC' }];
          expectedResult = service.addBaseSmToCollectionIfMissing(baseSmCollection, ...baseSmArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const baseSm: IBaseSm = { id: 'ABC' };
          const baseSm2: IBaseSm = { id: 'CBA' };
          expectedResult = service.addBaseSmToCollectionIfMissing([], baseSm, baseSm2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(baseSm);
          expect(expectedResult).toContain(baseSm2);
        });

        it('should accept null and undefined values', () => {
          const baseSm: IBaseSm = { id: 'ABC' };
          expectedResult = service.addBaseSmToCollectionIfMissing([], null, baseSm, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(baseSm);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
