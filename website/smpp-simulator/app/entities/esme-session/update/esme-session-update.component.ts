import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IEsmeSession, EsmeSession } from '../esme-session.model';
import { EsmeSessionService } from '../service/esme-session.service';

@Component({
  selector: 'jhi-esme-session-update',
  templateUrl: './esme-session-update.component.html',
})
export class EsmeSessionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    localAddr: [],
    createdAt: [],
  });

  constructor(protected esmeSessionService: EsmeSessionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ esmeSession }) => {
      if (esmeSession.id === undefined) {
        const today = dayjs().startOf('day');
        esmeSession.createdAt = today;
      }

      this.updateForm(esmeSession);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const esmeSession = this.createFromForm();
    if (esmeSession.id !== undefined) {
      this.subscribeToSaveResponse(this.esmeSessionService.update(esmeSession));
    } else {
      this.subscribeToSaveResponse(this.esmeSessionService.create(esmeSession));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEsmeSession>>): void {
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

  protected updateForm(esmeSession: IEsmeSession): void {
    this.editForm.patchValue({
      id: esmeSession.id,
      localAddr: esmeSession.localAddr,
      createdAt: esmeSession.createdAt ? esmeSession.createdAt.format(DATE_TIME_FORMAT) : null,
    });
  }

  protected createFromForm(): IEsmeSession {
    return {
      ...new EsmeSession(),
      id: this.editForm.get(['id'])!.value,
      localAddr: this.editForm.get(['localAddr'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? dayjs(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }
}
