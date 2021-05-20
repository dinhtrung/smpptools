import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmeSessionDetailComponent } from './esme-session-detail.component';

describe('Component Tests', () => {
  describe('EsmeSession Management Detail Component', () => {
    let comp: EsmeSessionDetailComponent;
    let fixture: ComponentFixture<EsmeSessionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EsmeSessionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ esmeSession: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(EsmeSessionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EsmeSessionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load esmeSession on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.esmeSession).toEqual(jasmine.objectContaining({ id: 'ABC' }));
      });
    });
  });
});
