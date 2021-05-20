import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SmscAccountService } from '../service/smsc-account.service';

import { SmscAccountComponent } from './smsc-account.component';

describe('Component Tests', () => {
  describe('SmscAccount Management Component', () => {
    let comp: SmscAccountComponent;
    let fixture: ComponentFixture<SmscAccountComponent>;
    let service: SmscAccountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SmscAccountComponent],
      })
        .overrideTemplate(SmscAccountComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SmscAccountComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SmscAccountService);

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
      expect(comp.smscAccounts?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
