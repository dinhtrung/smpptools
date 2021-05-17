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

  constructor(protected smscAccountService: SmscSessionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ smscAccount }) => {
      this.updateForm(smscAccount);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const smscAccount = this.createFromForm();
    if (smscAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.smscAccountService.update(smscAccount));
    } else {
      this.subscribeToSaveResponse(this.smscAccountService.create(smscAccount));
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

  protected updateForm(smscAccount: ISmscSession): void {
    this.editForm.patchValue({
      id: smscAccount.id,
      name: smscAccount.name,
      description: smscAccount.description,
      isEnable: smscAccount.isEnable,
      isPersist: smscAccount.isPersist,
      numBinds: smscAccount.numBinds,
      host: smscAccount.host,
      port: smscAccount.port,
      systemID: smscAccount.systemID,
      password: smscAccount.password,
      bindType: smscAccount.bindType,
      addressRange: smscAccount.addressRange,
      addressTON: smscAccount.addressTON,
      addressNPI: smscAccount.addressNPI,
      moErrorRate: smscAccount.moErrorRate,
      moErrorCode: smscAccount.moErrorCode,
      dlrErrorRate: smscAccount.dlrErrorRate,
      dlrErrorCode: smscAccount.dlrErrorCode,
      mtThroughtput: smscAccount.mtThroughtput,
      enquireLinkInterval: smscAccount.enquireLinkInterval,
      connectionTimeout: smscAccount.connectionTimeout,
      windowSize: smscAccount.windowSize,
      reconnectDelay: smscAccount.reconnectDelay,
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
