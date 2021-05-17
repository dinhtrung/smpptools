jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SmscInstanceService } from '../service/smsc-instance.service';
import { ISmscInstance, SmscInstance } from '../smsc-instance.model';

import { SmscInstanceUpdateComponent } from './smsc-instance-update.component';

describe('Component Tests', () => {
  describe('SmscInstance Management Update Component', () => {
    let comp: SmscInstanceUpdateComponent;
    let fixture: ComponentFixture<SmscInstanceUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let smscInstanceService: SmscInstanceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SmscInstanceUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SmscInstanceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SmscInstanceUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      smscInstanceService = TestBed.inject(SmscInstanceService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const smscInstance: ISmscInstance = { id: 'CBA' };

        activatedRoute.data = of({ smscInstance });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(smscInstance));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const smscInstance = { id: 'ABC' };
        spyOn(smscInstanceService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ smscInstance });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: smscInstance }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(smscInstanceService.update).toHaveBeenCalledWith(smscInstance);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const smscInstance = new SmscInstance();
        spyOn(smscInstanceService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ smscInstance });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: smscInstance }));
        saveSubject.complete();

        // THEN
        expect(smscInstanceService.create).toHaveBeenCalledWith(smscInstance);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const smscInstance = { id: 'ABC' };
        spyOn(smscInstanceService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ smscInstance });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(smscInstanceService.update).toHaveBeenCalledWith(smscInstance);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
