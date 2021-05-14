import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesComponent } from './pages/tables/tables.component';
import { FormsComponent } from './pages/forms/forms.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

const routes: Routes = [
  {path: '',   redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'esme',
    loadChildren: () => import('./esme/esme.module').then(m => m.EsmeModule)
  },
  {
    path: 'smsc',
    loadChildren: () => import('./smsc/smsc.module').then(m => m.SmscModule)
  },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'forms', component: FormsComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'typography', component: TypographyComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'notifications', component: NotificationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
