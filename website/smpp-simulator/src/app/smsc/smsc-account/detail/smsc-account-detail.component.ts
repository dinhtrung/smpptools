import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISmscAccount } from '../smsc-account.model';

@Component({
  selector: 'jhi-smsc-account-detail',
  templateUrl: './smsc-account-detail.component.html',
})
export class SmscAccountDetailComponent implements OnInit {
  smscAccount: ISmscAccount | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ smscAccount }) => {
      this.smscAccount = smscAccount;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
