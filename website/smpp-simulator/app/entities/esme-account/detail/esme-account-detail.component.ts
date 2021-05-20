import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IEsmeAccount } from '../esme-account.model';
import { IEsmeSession } from '../../esme-session/esme-session.model';

// + baseSM
import { FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { IBaseSm, BaseSm } from '../../base-sm/base-sm.model';
import { BaseSmService } from '../../base-sm/service/base-sm.service';
import { SMPP_TON, SMPP_NPI, SMPP_TLV, SMPP_CHARSET } from 'app/config/smpp-error-codes.constants';

@Component({
  selector: 'jhi-esme-account-detail',
  templateUrl: './esme-account-detail.component.html',
})
export class EsmeAccountDetailComponent implements OnInit {
  esmeAccount: IEsmeAccount | null = null;
  esmeSessions: IEsmeSession[] = [];

  // + SMPP parameters
  isLoading = false;
  baseSms?: IBaseSm[];

  baseSm: IBaseSm = new BaseSm();
  isSaving = false;
  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    serviceType: [],
    sourceTON: [],
    sourceNPI: [],
    sourceAddr: [],
    destinationTON: [],
    destinationNPI: [],
    destinationAddr: [],
    esmClass: [],
    protocolID: [],
    priorityFlag: [],
    scheduleDeliveryTime: [],
    validityPeriod: [],
    registeredDelivery: [],
    replaceIfPresentFlag: [],
    dataCoding: [],
    defaultMessageID: [],
    text: [],
    isConcatTlv: [],
    charset: [],
    shortMessages: this.fb.array([]),
    tlvList: this.fb.array([]),
  });

  smppTON = SMPP_TON;
  smppNPI = SMPP_NPI;
  tlvOptions = SMPP_TLV;
  charsets = SMPP_CHARSET;

  constructor(
    protected httpClient: HttpClient,
    protected activatedRoute: ActivatedRoute,
    protected baseSmService: BaseSmService,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ esmeAccount }) => {
      this.esmeAccount = esmeAccount;
      this.loadAll(esmeAccount.id);
      this.loadAllBaseSM();
    });
  }

  loadAllBaseSM(): void {
    this.baseSmService.query().subscribe(
      (res: HttpResponse<IBaseSm[]>) => {
        this.isLoading = false;
        this.baseSms = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  loadAll(accountID: string): void {
    this.httpClient
      .get<IEsmeSession[]>(`api/esme-accounts/${accountID}/sessions`, { observe: 'response' })
      .subscribe((res: HttpResponse<IEsmeSession[]>) => (this.esmeSessions = res.body ?? []));
  }
  stopAllEsmeSession(accountID: string): void {
    this.httpClient
      .delete<{}>(`api/esme-accounts/${accountID}/sessions`, { observe: 'response' })
      .subscribe(() => this.loadAll(accountID));
  }
  createNewEsmeSession(): void {
    this.httpClient.post<IEsmeSession>(`api/esme-sessions`, this.esmeAccount).subscribe(() => this.loadAll(this.esmeAccount!.id!));
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const baseSm = this.createFromForm();
    if (baseSm.id) {
      this.subscribeToSaveResponse(this.baseSmService.update(baseSm));
    } else {
      delete baseSm.id;
      this.subscribeToSaveResponse(this.baseSmService.create(baseSm));
    }
  }

  // TLV List
  get TlvList(): FormArray {
    return this.editForm.get('tlvList') as FormArray;
  }

  addTlv(): void {
    this.TlvList.push(this.fb.group({ tag: '', value: '' }));
  }

  delTlv(index: number): void {
    this.TlvList.removeAt(index);
  }

  // ShortMessages
  get ShortMessages(): FormArray {
    return this.editForm.get('shortMessages') as FormArray;
  }
  addShortMessage(): void {
    this.ShortMessages.push(this.fb.group({ udhPart: '', txtPart: '' }));
  }
  delShortMessage(index: number): void {
    this.ShortMessages.removeAt(index);
  }

  subscribeToSaveResponse(result: Observable<HttpResponse<IBaseSm>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  removeBaseSmID(): void {
    this.editForm.patchValue({
      id: undefined,
    });
  }

  onSaveSuccess(): void {
    // notification on save success
    this.loadAllBaseSM();
  }

  onSaveError(): void {
    // Api for inheritance.
  }

  onSaveFinalize(): void {
    this.isSaving = false;
  }

  updateForm(baseSm: IBaseSm): void {
    this.editForm.patchValue({
      id: baseSm.id,
      name: baseSm.name,
      description: baseSm.description,
      serviceType: baseSm.serviceType,
      sourceTON: baseSm.sourceTON,
      sourceNPI: baseSm.sourceNPI,
      sourceAddr: baseSm.sourceAddr,
      destinationTON: baseSm.destinationTON,
      destinationNPI: baseSm.destinationNPI,
      destinationAddr: baseSm.destinationAddr,
      esmClass: baseSm.esmClass,
      protocolID: baseSm.protocolID,
      priorityFlag: baseSm.priorityFlag,
      scheduleDeliveryTime: baseSm.scheduleDeliveryTime,
      validityPeriod: baseSm.validityPeriod,
      registeredDelivery: baseSm.registeredDelivery,
      replaceIfPresentFlag: baseSm.replaceIfPresentFlag,
      dataCoding: baseSm.dataCoding,
      defaultMessageID: baseSm.defaultMessageID,
      text: baseSm.text,
      isConcatTlv: baseSm.isConcatTlv,
      charset: baseSm.charset,
    });
    this.patchTlvList(baseSm);
    this.patchShortMessages(baseSm);
  }

  patchTlvList(baseSm: IBaseSm): void {
    this.TlvList.clear();
    if (baseSm.tlvList) {
      for (const entry of baseSm.tlvList) {
        this.TlvList.push(this.fb.group(entry));
      }
    }
  }
  patchShortMessages(baseSm: IBaseSm): void {
    this.ShortMessages.clear();
    if (baseSm.shortMessages) {
      for (const entry of baseSm.shortMessages) {
        this.ShortMessages.push(this.fb.group(entry));
      }
    }
  }

  createFromForm(): IBaseSm {
    return {
      ...new BaseSm(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      serviceType: this.editForm.get(['serviceType'])!.value,
      sourceTON: this.editForm.get(['sourceTON'])!.value,
      sourceNPI: this.editForm.get(['sourceNPI'])!.value,
      sourceAddr: this.editForm.get(['sourceAddr'])!.value,
      destinationTON: this.editForm.get(['destinationTON'])!.value,
      destinationNPI: this.editForm.get(['destinationNPI'])!.value,
      destinationAddr: this.editForm.get(['destinationAddr'])!.value,
      esmClass: this.editForm.get(['esmClass'])!.value,
      protocolID: this.editForm.get(['protocolID'])!.value,
      priorityFlag: this.editForm.get(['priorityFlag'])!.value,
      scheduleDeliveryTime: this.editForm.get(['scheduleDeliveryTime'])!.value,
      validityPeriod: this.editForm.get(['validityPeriod'])!.value,
      registeredDelivery: this.editForm.get(['registeredDelivery'])!.value,
      replaceIfPresentFlag: this.editForm.get(['replaceIfPresentFlag'])!.value,
      dataCoding: this.editForm.get(['dataCoding'])!.value,
      defaultMessageID: this.editForm.get(['defaultMessageID'])!.value,
      text: this.editForm.get(['text'])!.value,
      isConcatTlv: this.editForm.get(['isConcatTlv'])!.value,
      charset: this.editForm.get(['charset'])!.value,
      shortMessages: this.editForm.get(['shortMessages'])!.value,
      tlvList: this.editForm.get(['tlvList'])!.value,
    };
  }

  sendSms(accountID: string): void {
    this.performConvertText().subscribe(() => {
      const baseSm = this.createFromForm();
      this.httpClient.post(`api/esme-accounts/${accountID}/send-mt`, baseSm).subscribe();
    });
  }

  sendSmsOnSession(sessionID: string): void {
    this.performConvertText().subscribe(() => {
      const baseSm = this.createFromForm();
      this.httpClient.post(`api/esme-sessions/${sessionID}/send-mt`, baseSm).subscribe();
    });
  }

  deleteEsmeSession(sessionID: string): void {
    this.httpClient.delete(`api/esme-sessions/${sessionID}`).subscribe(() => this.loadAll(this.esmeAccount!.id!));
  }

  convertText(): void {
    this.performConvertText().subscribe();
  }

  protected performConvertText(): Observable<IBaseSm> {
    return this.httpClient
      .post(`api/base-sms/convert-text`, {
        text: this.editForm.get(['text'])!.value,
        dataCoding: this.editForm.get(['dataCoding'])!.value,
        charset: this.editForm.get(['charset'])!.value,
        isConcatTlv: this.editForm.get(['isConcatTlv'])!.value,
      })
      .pipe(tap((res: IBaseSm) => this.patchShortMessages(res)));
  }
}
