jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TestSetupService } from '../service/test-setup.service';
import { ITestSetup, TestSetup } from '../test-setup.model';

import { TestSetupUpdateComponent } from './test-setup-update.component';

describe('Component Tests', () => {
  describe('TestSetup Management Update Component', () => {
    let comp: TestSetupUpdateComponent;
    let fixture: ComponentFixture<TestSetupUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let testSetupService: TestSetupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TestSetupUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TestSetupUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TestSetupUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      testSetupService = TestBed.inject(TestSetupService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const testSetup: ITestSetup = { id: 'CBA' };

        activatedRoute.data = of({ testSetup });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(testSetup));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const testSetup = { id: 'ABC' };
        spyOn(testSetupService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ testSetup });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: testSetup }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(testSetupService.update).toHaveBeenCalledWith(testSetup);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const testSetup = new TestSetup();
        spyOn(testSetupService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ testSetup });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: testSetup }));
        saveSubject.complete();

        // THEN
        expect(testSetupService.create).toHaveBeenCalledWith(testSetup);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const testSetup = { id: 'ABC' };
        spyOn(testSetupService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ testSetup });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(testSetupService.update).toHaveBeenCalledWith(testSetup);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
