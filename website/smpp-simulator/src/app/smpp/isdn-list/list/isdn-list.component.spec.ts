import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { IsdnListService } from '../service/isdn-list.service';

import { IsdnListComponent } from './isdn-list.component';

describe('Component Tests', () => {
  describe('IsdnList Management Component', () => {
    let comp: IsdnListComponent;
    let fixture: ComponentFixture<IsdnListComponent>;
    let service: IsdnListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [IsdnListComponent],
      })
        .overrideTemplate(IsdnListComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IsdnListComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(IsdnListService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 'ABC' }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.isdnLists?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
