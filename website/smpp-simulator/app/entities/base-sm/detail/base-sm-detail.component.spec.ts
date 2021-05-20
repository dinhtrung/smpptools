import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BaseSmDetailComponent } from './base-sm-detail.component';

describe('Component Tests', () => {
  describe('BaseSm Management Detail Component', () => {
    let comp: BaseSmDetailComponent;
    let fixture: ComponentFixture<BaseSmDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [BaseSmDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ baseSm: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(BaseSmDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BaseSmDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load baseSm on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.baseSm).toEqual(jasmine.objectContaining({ id: 'ABC' }));
      });
    });
  });
});
