jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IIsdnList, IsdnList } from '../isdn-list.model';
import { IsdnListService } from '../service/isdn-list.service';

import { IsdnListRoutingResolveService } from './isdn-list-routing-resolve.service';

describe('Service Tests', () => {
  describe('IsdnList routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: IsdnListRoutingResolveService;
    let service: IsdnListService;
    let resultIsdnList: IIsdnList | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(IsdnListRoutingResolveService);
      service = TestBed.inject(IsdnListService);
      resultIsdnList = undefined;
    });

    describe('resolve', () => {
      it('should return IIsdnList returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultIsdnList = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultIsdnList).toEqual({ id: 'ABC' });
      });

      it('should return new IIsdnList if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultIsdnList = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultIsdnList).toEqual(new IsdnList());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultIsdnList = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultIsdnList).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
