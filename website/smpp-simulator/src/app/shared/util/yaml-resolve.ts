import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as jsyaml from 'js-yaml';

@Injectable({ providedIn: 'root' })
export class YamlResolve implements Resolve<string> {
  constructor(private service: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const yamlFile = route.data.yamlFile
    if (yamlFile) {
      return this.service.get(`assets/${yamlFile}?time=` + new Date().getTime(), { responseType: 'text', observe: 'response' }).pipe(
        filter(response => response.ok),
        map(response => jsyaml.load(response.body || ''))
      )
    }
  }
}
