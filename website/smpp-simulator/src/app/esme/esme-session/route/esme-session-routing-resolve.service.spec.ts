jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEsmeSession, EsmeSession } from '../esme-session.model';
import { EsmeSessionService } from '../service/esme-session.service';

import { EsmeSessionRoutingResolveService } from './esme-session-routing-resolve.service';

describe('Service Tests', () => {
  describe('EsmeSession routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EsmeSessionRoutingResolveService;
    let service: EsmeSessionService;
    let resultEsmeSession: IEsmeSession | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EsmeSessionRoutingResolveService);
      service = TestBed.inject(EsmeSessionService);
      resultEsmeSession = undefined;
    });

    describe('resolve', () => {
      it('should return IEsmeSession returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEsmeSession = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultEsmeSession).toEqual({ id: 'ABC' });
      });

      it('should return new IEsmeSession if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEsmeSession = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEsmeSession).toEqual(new EsmeSession());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEsmeSession = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultEsmeSession).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
