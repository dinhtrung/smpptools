jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { BaseSmService } from '../service/base-sm.service';
import { IBaseSm, BaseSm } from '../base-sm.model';

import { BaseSmUpdateComponent } from './base-sm-update.component';

describe('Component Tests', () => {
  describe('BaseSm Management Update Component', () => {
    let comp: BaseSmUpdateComponent;
    let fixture: ComponentFixture<BaseSmUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let baseSmService: BaseSmService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [BaseSmUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(BaseSmUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BaseSmUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      baseSmService = TestBed.inject(BaseSmService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const baseSm: IBaseSm = { id: 'CBA' };

        activatedRoute.data = of({ baseSm });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(baseSm));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const baseSm = { id: 'ABC' };
        spyOn(baseSmService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ baseSm });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: baseSm }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(baseSmService.update).toHaveBeenCalledWith(baseSm);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const baseSm = new BaseSm();
        spyOn(baseSmService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ baseSm });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: baseSm }));
        saveSubject.complete();

        // THEN
        expect(baseSmService.create).toHaveBeenCalledWith(baseSm);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const baseSm = { id: 'ABC' };
        spyOn(baseSmService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ baseSm });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(baseSmService.update).toHaveBeenCalledWith(baseSm);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
