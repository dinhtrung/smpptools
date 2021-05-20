jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IBaseSm, BaseSm } from '../base-sm.model';
import { BaseSmService } from '../service/base-sm.service';

import { BaseSmRoutingResolveService } from './base-sm-routing-resolve.service';

describe('Service Tests', () => {
  describe('BaseSm routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: BaseSmRoutingResolveService;
    let service: BaseSmService;
    let resultBaseSm: IBaseSm | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(BaseSmRoutingResolveService);
      service = TestBed.inject(BaseSmService);
      resultBaseSm = undefined;
    });

    describe('resolve', () => {
      it('should return IBaseSm returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBaseSm = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultBaseSm).toEqual({ id: 'ABC' });
      });

      it('should return new IBaseSm if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBaseSm = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultBaseSm).toEqual(new BaseSm());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBaseSm = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultBaseSm).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
