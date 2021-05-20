import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEsmeSession } from '../esme-session.model';

@Component({
  selector: 'jhi-esme-session-detail',
  templateUrl: './esme-session-detail.component.html',
})
export class EsmeSessionDetailComponent implements OnInit {
  esmeSession: IEsmeSession | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ esmeSession }) => {
      this.esmeSession = esmeSession;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
