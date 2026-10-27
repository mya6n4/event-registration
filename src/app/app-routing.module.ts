
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
 { path: 'dashboard', component: DashboardComponent },
  { path: 'registrations', component: RegistrationsComponent },
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'admin', component: AdminComponent },

  // Temporary default route for dashboard development
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
