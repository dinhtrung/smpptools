import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISmscInstance } from '../smsc-instance.model';

@Component({
  selector: 'jhi-smsc-instance-detail',
  templateUrl: './smsc-instance-detail.component.html',
})
export class SmscInstanceDetailComponent implements OnInit {
  smscInstance: ISmscInstance | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ smscInstance }) => {
      this.smscInstance = smscInstance;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
