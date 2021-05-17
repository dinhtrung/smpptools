jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISmscInstance, SmscInstance } from '../smsc-instance.model';
import { SmscInstanceService } from '../service/smsc-instance.service';

import { SmscInstanceRoutingResolveService } from './smsc-instance-routing-resolve.service';

describe('Service Tests', () => {
  describe('SmscInstance routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: SmscInstanceRoutingResolveService;
    let service: SmscInstanceService;
    let resultSmscInstance: ISmscInstance | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(SmscInstanceRoutingResolveService);
      service = TestBed.inject(SmscInstanceService);
      resultSmscInstance = undefined;
    });

    describe('resolve', () => {
      it('should return ISmscInstance returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSmscInstance = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultSmscInstance).toEqual({ id: 'ABC' });
      });

      it('should return new ISmscInstance if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSmscInstance = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultSmscInstance).toEqual(new SmscInstance());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSmscInstance = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultSmscInstance).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
