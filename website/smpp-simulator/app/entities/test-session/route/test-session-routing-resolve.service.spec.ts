jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITestSession, TestSession } from '../test-session.model';
import { TestSessionService } from '../service/test-session.service';

import { TestSessionRoutingResolveService } from './test-session-routing-resolve.service';

describe('Service Tests', () => {
  describe('TestSession routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TestSessionRoutingResolveService;
    let service: TestSessionService;
    let resultTestSession: ITestSession | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TestSessionRoutingResolveService);
      service = TestBed.inject(TestSessionService);
      resultTestSession = undefined;
    });

    describe('resolve', () => {
      it('should return ITestSession returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTestSession = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultTestSession).toEqual({ id: 'ABC' });
      });

      it('should return new ITestSession if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTestSession = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTestSession).toEqual(new TestSession());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTestSession = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultTestSession).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
