jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SmscAccountService } from '../service/smsc-account.service';
import { ISmscAccount, SmscAccount } from '../smsc-account.model';

import { SmscAccountUpdateComponent } from './smsc-account-update.component';

describe('Component Tests', () => {
  describe('SmscAccount Management Update Component', () => {
    let comp: SmscAccountUpdateComponent;
    let fixture: ComponentFixture<SmscAccountUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let smscAccountService: SmscAccountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SmscAccountUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SmscAccountUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SmscAccountUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      smscAccountService = TestBed.inject(SmscAccountService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const smscAccount: ISmscAccount = { id: 'CBA' };

        activatedRoute.data = of({ smscAccount });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(smscAccount));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const smscAccount = { id: 'ABC' };
        spyOn(smscAccountService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ smscAccount });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: smscAccount }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(smscAccountService.update).toHaveBeenCalledWith(smscAccount);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const smscAccount = new SmscAccount();
        spyOn(smscAccountService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ smscAccount });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: smscAccount }));
        saveSubject.complete();

        // THEN
        expect(smscAccountService.create).toHaveBeenCalledWith(smscAccount);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const smscAccount = { id: 'ABC' };
        spyOn(smscAccountService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ smscAccount });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(smscAccountService.update).toHaveBeenCalledWith(smscAccount);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
