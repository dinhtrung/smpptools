import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISmscSession } from '../smsc-session.model';
import * as _ from 'lodash';

@Component({
  selector: 'jhi-smsc-session-detail',
  templateUrl: './smsc-session-detail.component.html',
})
export class SmscSessionDetailComponent implements OnInit {
  smscSession: ISmscSession | null = null;
  smscSessions: any[] = [];

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ smscSession }) => {
      this.smscSession = smscSession;
      this.generateFakeSessions(smscSession.systemID);
    });
  }

  generateFakeSessions(prefix: string): void {
    for (let i = 0; i < 20; i += 1) {
      this.smscSessions.push({
        id: _.uniqueId(prefix),
        localAddr: `127.0.0.1:${String(_.random(1, Math.pow(2, 16)))}`,
      });
    }
  }

  previousState(): void {
    window.history.back();
  }
}
