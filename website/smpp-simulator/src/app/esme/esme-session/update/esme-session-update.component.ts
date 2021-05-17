import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEsmeSession, EsmeSession } from '../esme-session.model';
import { EsmeSessionService } from '../service/esme-session.service';
import { SMPP_STATUS, SMPP_TON, SMPP_NPI } from 'app/config/smpp-error-codes.constants';

@Component({
  selector: 'jhi-esme-session-update',
  templateUrl: './esme-session-update.component.html',
})
export class EsmeSessionUpdateComponent implements OnInit {
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

  constructor(protected esmeAccountService: EsmeSessionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ esmeAccount }) => {
      this.updateForm(esmeAccount);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const esmeAccount = this.createFromForm();
    if (esmeAccount.id !== undefined) {
      this.subscribeToSaveResponse(this.esmeAccountService.update(esmeAccount));
    } else {
      this.subscribeToSaveResponse(this.esmeAccountService.create(esmeAccount));
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

  protected updateForm(esmeAccount: IEsmeSession): void {
    this.editForm.patchValue({
      id: esmeAccount.id,
      name: esmeAccount.name,
      description: esmeAccount.description,
      isEnable: esmeAccount.isEnable,
      isPersist: esmeAccount.isPersist,
      numBinds: esmeAccount.numBinds,
      host: esmeAccount.host,
      port: esmeAccount.port,
      systemID: esmeAccount.systemID,
      password: esmeAccount.password,
      bindType: esmeAccount.bindType,
      addressRange: esmeAccount.addressRange,
      addressTON: esmeAccount.addressTON,
      addressNPI: esmeAccount.addressNPI,
      moErrorRate: esmeAccount.moErrorRate,
      moErrorCode: esmeAccount.moErrorCode,
      dlrErrorRate: esmeAccount.dlrErrorRate,
      dlrErrorCode: esmeAccount.dlrErrorCode,
      mtThroughtput: esmeAccount.mtThroughtput,
      enquireLinkInterval: esmeAccount.enquireLinkInterval,
      connectionTimeout: esmeAccount.connectionTimeout,
      windowSize: esmeAccount.windowSize,
      reconnectDelay: esmeAccount.reconnectDelay,
    });
  }

  protected createFromForm(): IEsmeSession {
    return {
      ...new EsmeSession(),
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
