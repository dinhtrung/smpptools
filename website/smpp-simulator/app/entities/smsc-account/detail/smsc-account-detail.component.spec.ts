import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmscAccountDetailComponent } from './smsc-account-detail.component';

describe('Component Tests', () => {
  describe('SmscAccount Management Detail Component', () => {
    let comp: SmscAccountDetailComponent;
    let fixture: ComponentFixture<SmscAccountDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SmscAccountDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ smscAccount: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(SmscAccountDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SmscAccountDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load smscAccount on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.smscAccount).toEqual(jasmine.objectContaining({ id: 'ABC' }));
      });
    });
  });
});
