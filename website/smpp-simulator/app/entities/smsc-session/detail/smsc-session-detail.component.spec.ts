import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmscSessionDetailComponent } from './smsc-session-detail.component';

describe('Component Tests', () => {
  describe('SmscSession Management Detail Component', () => {
    let comp: SmscSessionDetailComponent;
    let fixture: ComponentFixture<SmscSessionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SmscSessionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ smscSession: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(SmscSessionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SmscSessionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load smscSession on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.smscSession).toEqual(jasmine.objectContaining({ id: 'ABC' }));
      });
    });
  });
});
