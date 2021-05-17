import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBaseSm } from '../base-sm.model';

@Component({
  selector: 'jhi-base-sm-detail',
  templateUrl: './base-sm-detail.component.html',
})
export class BaseSmDetailComponent implements OnInit {
  baseSm: IBaseSm | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ baseSm }) => {
      this.baseSm = baseSm;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
