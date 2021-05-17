import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEsmeSession } from '../esme-session.model';
import * as _ from 'lodash';

@Component({
  selector: 'jhi-esme-session-detail',
  templateUrl: './esme-session-detail.component.html',
})
export class EsmeSessionDetailComponent implements OnInit {
  esmeAccount: IEsmeSession | null = null;
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
