import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEsmeAccount } from '../esme-account.model';
import * as _ from 'lodash';

@Component({
  selector: 'jhi-esme-account-detail',
  templateUrl: './esme-account-detail.component.html',
})
export class EsmeAccountDetailComponent implements OnInit {
  esmeAccount: IEsmeAccount | null = null;
  esmeSessions: any[] = [];

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ esmeAccount }) => {
      this.esmeAccount = esmeAccount;
      this.generateFakeSessions(esmeAccount.systemID);
    });
  }

  generateFakeSessions(prefix: string): void {
    for (let i = 0; i < 20; i += 1) {
      this.esmeSessions.push({
        id: _.uniqueId(prefix),
        localAddr: `127.0.0.1:${String(_.random(1, Math.pow(2, 16)))}`,
      });
    }
  }

  previousState(): void {
    window.history.back();
  }
}
