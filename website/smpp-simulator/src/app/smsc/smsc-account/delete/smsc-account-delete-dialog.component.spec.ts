jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SmscAccountService } from '../service/smsc-account.service';

import { SmscAccountDeleteDialogComponent } from './smsc-account-delete-dialog.component';

describe('Component Tests', () => {
  describe('SmscAccount Management Delete Component', () => {
    let comp: SmscAccountDeleteDialogComponent;
    let fixture: ComponentFixture<SmscAccountDeleteDialogComponent>;
    let service: SmscAccountService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SmscAccountDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(SmscAccountDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SmscAccountDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(SmscAccountService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('ABC');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('ABC');
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
