import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmscInstanceDetailComponent } from './smsc-instance-detail.component';

describe('Component Tests', () => {
  describe('SmscInstance Management Detail Component', () => {
    let comp: SmscInstanceDetailComponent;
    let fixture: ComponentFixture<SmscInstanceDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SmscInstanceDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ smscInstance: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(SmscInstanceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SmscInstanceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load smscInstance on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.smscInstance).toEqual(jasmine.objectContaining({ id: 'ABC' }));
      });
    });
  });
});
