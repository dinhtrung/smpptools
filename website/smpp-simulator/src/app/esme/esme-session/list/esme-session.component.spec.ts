import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EsmeSessionService } from '../service/esme-session.service';

import { EsmeSessionComponent } from './esme-session.component';

describe('Component Tests', () => {
  describe('EsmeSession Management Component', () => {
    let comp: EsmeSessionComponent;
    let fixture: ComponentFixture<EsmeSessionComponent>;
    let service: EsmeSessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EsmeSessionComponent],
      })
        .overrideTemplate(EsmeSessionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EsmeSessionComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EsmeSessionService);

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
      expect(comp.esmeAccounts?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
