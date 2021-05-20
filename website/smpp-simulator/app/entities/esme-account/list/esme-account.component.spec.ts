import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EsmeAccountService } from '../service/esme-account.service';

import { EsmeAccountComponent } from './esme-account.component';

describe('Component Tests', () => {
  describe('EsmeAccount Management Component', () => {
    let comp: EsmeAccountComponent;
    let fixture: ComponentFixture<EsmeAccountComponent>;
    let service: EsmeAccountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EsmeAccountComponent],
      })
        .overrideTemplate(EsmeAccountComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EsmeAccountComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EsmeAccountService);

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
