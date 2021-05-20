import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISmscSession } from '../smsc-session.model';

@Component({
  selector: 'jhi-smsc-session-detail',
  templateUrl: './smsc-session-detail.component.html',
})
export class SmscSessionDetailComponent implements OnInit {
  smscSession: ISmscSession | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ smscSession }) => {
      this.smscSession = smscSession;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
