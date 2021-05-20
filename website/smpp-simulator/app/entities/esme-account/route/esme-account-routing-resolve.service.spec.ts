jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEsmeAccount, EsmeAccount } from '../esme-account.model';
import { EsmeAccountService } from '../service/esme-account.service';

import { EsmeAccountRoutingResolveService } from './esme-account-routing-resolve.service';

describe('Service Tests', () => {
  describe('EsmeAccount routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EsmeAccountRoutingResolveService;
    let service: EsmeAccountService;
    let resultEsmeAccount: IEsmeAccount | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EsmeAccountRoutingResolveService);
      service = TestBed.inject(EsmeAccountService);
      resultEsmeAccount = undefined;
    });

    describe('resolve', () => {
      it('should return IEsmeAccount returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEsmeAccount = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultEsmeAccount).toEqual({ id: 'ABC' });
      });

      it('should return new IEsmeAccount if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEsmeAccount = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEsmeAccount).toEqual(new EsmeAccount());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEsmeAccount = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultEsmeAccount).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
