import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { IBaseSm, BaseSm } from '../base-sm.model';
import { BaseSmService } from '../service/base-sm.service';
import { SMPP_TON, SMPP_NPI, SMPP_TLV, SMPP_CHARSET } from 'app/config/smpp-error-codes.constants';

@Component({
  selector: 'jhi-base-sm-update',
  templateUrl: './base-sm-update.component.html',
})
export class BaseSmUpdateComponent implements OnInit {
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
    protected baseSmService: BaseSmService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ baseSm }) => {
      this.updateForm(baseSm);
    });
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

  convertText(): void {
    this.httpClient
      .post(`api/base-sms/convert-text`, {
        text: this.editForm.get(['text'])!.value,
        dataCoding: this.editForm.get(['dataCoding'])!.value,
        charset: this.editForm.get(['charset'])!.value,
        isConcatTlv: this.editForm.get(['isConcatTlv'])!.value,
      })
      .subscribe((res: IBaseSm) => this.patchShortMessages(res));
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBaseSm>>): void {
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

  protected updateForm(baseSm: IBaseSm): void {
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
    });
    this.patchTlvList(baseSm);
    this.patchShortMessages(baseSm);
  }

  protected patchTlvList(baseSm: IBaseSm): void {
    this.TlvList.clear();
    if (baseSm.tlvList) {
      for (const entry of baseSm.tlvList) {
        this.TlvList.push(this.fb.group(entry));
      }
    }
  }
  protected patchShortMessages(baseSm: IBaseSm): void {
    this.ShortMessages.clear();
    if (baseSm.shortMessages) {
      for (const entry of baseSm.shortMessages) {
        this.ShortMessages.push(this.fb.group(entry));
      }
    }
  }

  protected createFromForm(): IBaseSm {
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
      tlvList: this.editForm.get(['tlvList'])!.value,
      shortMessages: this.editForm.get(['shortMessages'])!.value,
    };
  }
}
