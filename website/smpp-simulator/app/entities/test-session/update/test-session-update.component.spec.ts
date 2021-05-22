jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TestSessionService } from '../service/test-session.service';
import { ITestSession, TestSession } from '../test-session.model';

import { TestSessionUpdateComponent } from './test-session-update.component';

describe('Component Tests', () => {
  describe('TestSession Management Update Component', () => {
    let comp: TestSessionUpdateComponent;
    let fixture: ComponentFixture<TestSessionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let testSessionService: TestSessionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TestSessionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TestSessionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TestSessionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      testSessionService = TestBed.inject(TestSessionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const testSession: ITestSession = { id: 'CBA' };

        activatedRoute.data = of({ testSession });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(testSession));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const testSession = { id: 'ABC' };
        spyOn(testSessionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ testSession });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: testSession }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(testSessionService.update).toHaveBeenCalledWith(testSession);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const testSession = new TestSession();
        spyOn(testSessionService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ testSession });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: testSession }));
        saveSubject.complete();

        // THEN
        expect(testSessionService.create).toHaveBeenCalledWith(testSession);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const testSession = { id: 'ABC' };
        spyOn(testSessionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ testSession });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(testSessionService.update).toHaveBeenCalledWith(testSession);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
