jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISmscAccount, SmscAccount } from '../smsc-account.model';
import { SmscAccountService } from '../service/smsc-account.service';

import { SmscAccountRoutingResolveService } from './smsc-account-routing-resolve.service';

describe('Service Tests', () => {
  describe('SmscAccount routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: SmscAccountRoutingResolveService;
    let service: SmscAccountService;
    let resultSmscAccount: ISmscAccount | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(SmscAccountRoutingResolveService);
      service = TestBed.inject(SmscAccountService);
      resultSmscAccount = undefined;
    });

    describe('resolve', () => {
      it('should return ISmscAccount returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSmscAccount = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultSmscAccount).toEqual({ id: 'ABC' });
      });

      it('should return new ISmscAccount if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSmscAccount = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultSmscAccount).toEqual(new SmscAccount());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSmscAccount = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultSmscAccount).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
