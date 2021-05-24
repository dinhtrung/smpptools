import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TestCaseComponent } from './list/test-case.component';
import { TestCaseDetailComponent } from './detail/test-case-detail.component';
import { TestCaseRoutingModule } from './route/test-case-routing.module';

@NgModule({
  imports: [SharedModule, TestCaseRoutingModule],
  declarations: [TestCaseComponent, TestCaseDetailComponent],
})
export class TestCaseModule {}
