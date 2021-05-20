import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsmeAccountDetailComponent } from './esme-account-detail.component';

describe('Component Tests', () => {
  describe('EsmeAccount Management Detail Component', () => {
    let comp: EsmeAccountDetailComponent;
    let fixture: ComponentFixture<EsmeAccountDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [EsmeAccountDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ esmeAccount: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(EsmeAccountDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EsmeAccountDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load esmeAccount on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.esmeAccount).toEqual(jasmine.objectContaining({ id: 'ABC' }));
      });
    });
  });
});
