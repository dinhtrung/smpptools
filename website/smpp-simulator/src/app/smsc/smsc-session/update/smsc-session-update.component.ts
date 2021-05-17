import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ISmscSession, SmscSession } from '../smsc-session.model';
import { SmscSessionService } from '../service/smsc-session.service';
import { SMPP_STATUS, SMPP_TON, SMPP_NPI } from 'app/config/smpp-error-codes.constants';

@Component({
  selector: 'jhi-smsc-session-update',
  templateUrl: './smsc-session-update.component.html',
})
export class SmscSessionUpdateComponent implements OnInit {
  isSaving = false;
  smppStatus = SMPP_STATUS;
  smppTON = SMPP_TON;
  smppNPI = SMPP_NPI;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(80)]],
    description: [],
    isEnable: [],
    isPersist: [],
    numBinds: [],
    host: [],
    port: [null, [Validators.min(1)]],
    systemID: [],
    password: [],
    bindType: [],
    addressRange: [],
    addressTON: [],
    addressNPI: [],
    moErrorRate: [null, [Validators.min(0), Validators.max(100)]],
    moErrorCode: [],
    dlrErrorRate: [null, [Validators.min(0), Validators.max(100)]],
    dlrErrorCode: [],
    mtThroughtput: [],
    enquireLinkInterval: [],
    connectionTimeout: [],
    windowSize: [],
    reconnectDelay: [],
  });

  constructor(protected smscSessionService: SmscSessionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ smscSession }) => {
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
      name: smscSession.name,
      description: smscSession.description,
      isEnable: smscSession.isEnable,
      isPersist: smscSession.isPersist,
      numBinds: smscSession.numBinds,
      host: smscSession.host,
      port: smscSession.port,
      systemID: smscSession.systemID,
      password: smscSession.password,
      bindType: smscSession.bindType,
      addressRange: smscSession.addressRange,
      addressTON: smscSession.addressTON,
      addressNPI: smscSession.addressNPI,
      moErrorRate: smscSession.moErrorRate,
      moErrorCode: smscSession.moErrorCode,
      dlrErrorRate: smscSession.dlrErrorRate,
      dlrErrorCode: smscSession.dlrErrorCode,
      mtThroughtput: smscSession.mtThroughtput,
      enquireLinkInterval: smscSession.enquireLinkInterval,
      connectionTimeout: smscSession.connectionTimeout,
      windowSize: smscSession.windowSize,
      reconnectDelay: smscSession.reconnectDelay,
    });
  }

  protected createFromForm(): ISmscSession {
    return {
      ...new SmscSession(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      isEnable: this.editForm.get(['isEnable'])!.value,
      isPersist: this.editForm.get(['isPersist'])!.value,
      numBinds: this.editForm.get(['numBinds'])!.value,
      host: this.editForm.get(['host'])!.value,
      port: this.editForm.get(['port'])!.value,
      systemID: this.editForm.get(['systemID'])!.value,
      password: this.editForm.get(['password'])!.value,
      bindType: this.editForm.get(['bindType'])!.value,
      addressRange: this.editForm.get(['addressRange'])!.value,
      addressTON: this.editForm.get(['addressTON'])!.value,
      addressNPI: this.editForm.get(['addressNPI'])!.value,
      moErrorRate: this.editForm.get(['moErrorRate'])!.value,
      moErrorCode: this.editForm.get(['moErrorCode'])!.value,
      dlrErrorRate: this.editForm.get(['dlrErrorRate'])!.value,
      dlrErrorCode: this.editForm.get(['dlrErrorCode'])!.value,
      mtThroughtput: this.editForm.get(['mtThroughtput'])!.value,
      enquireLinkInterval: this.editForm.get(['enquireLinkInterval'])!.value,
      connectionTimeout: this.editForm.get(['connectionTimeout'])!.value,
      windowSize: this.editForm.get(['windowSize'])!.value,
      reconnectDelay: this.editForm.get(['reconnectDelay'])!.value,
    };
  }
}
