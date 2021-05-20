import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ISmscSession, SmscSession } from '../smsc-session.model';
import { SmscSessionService } from '../service/smsc-session.service';

@Component({
  selector: 'jhi-smsc-session-update',
  templateUrl: './smsc-session-update.component.html',
})
export class SmscSessionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    remoteAddr: [],
    createdAt: [],
  });

  constructor(protected smscSessionService: SmscSessionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ smscSession }) => {
      if (smscSession.id === undefined) {
        const today = dayjs().startOf('day');
        smscSession.createdAt = today;
      }

      this.updateForm(smscSession);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const smscSession = this.createFromForm();
    if (smscSession.id !== undefined) {
      this.subscribeToSaveResponse(this.smscSessionService.update(smscSession));
    } else {
      this.subscribeToSaveResponse(this.smscSessionService.create(smscSession));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISmscSession>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(smscSession: ISmscSession): void {
    this.editForm.patchValue({
      id: smscSession.id,
      remoteAddr: smscSession.remoteAddr,
      createdAt: smscSession.createdAt ? smscSession.createdAt.format(DATE_TIME_FORMAT) : null,
    });
  }

  protected createFromForm(): ISmscSession {
    return {
      ...new SmscSession(),
      id: this.editForm.get(['id'])!.value,
      remoteAddr: this.editForm.get(['remoteAddr'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? dayjs(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }
}
