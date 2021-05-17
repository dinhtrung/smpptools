import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    FormlyModule,
    FormlyBootstrapModule,
    TranslateModule,
  ]
})
export class SharedModule { }
