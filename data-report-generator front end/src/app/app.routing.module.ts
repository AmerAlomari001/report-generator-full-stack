import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UploadComponent } from './components/upload/upload.component';
import { ReportComponent } from './components/report/report.component';
import { HistoryComponent } from './components/history/history.component';
import { ChartComponent } from './components/chart/chart.component';
import { CsvPreviewComponent } from './components/csv-preview/csv-preview.component';

import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminReportsComponent } from './components/admin/admin-reports/admin-reports.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // User (Protected)
  { path: 'upload', component: UploadComponent, canActivate: [UserGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [UserGuard] },
  // { path: 'report', component: ReportComponent, canActivate: [UserGuard] },
  { path: 'report', component: ReportComponent },

  { path: 'chart', component: ChartComponent, canActivate: [UserGuard] },
  { path: 'csv-preview', component: CsvPreviewComponent, canActivate: [UserGuard] },

  // Admin (Protected)
  {
  path: 'admin',
  canActivate: [AdminGuard],
  children: [
    { path: '', component: AdminDashboardComponent }, // default
    { path: 'reports', component: AdminReportsComponent },
    { 
      path: 'reports/:id',   // ✅ صفحة تفاصيل التقرير
      loadComponent: () =>
        import('./components/admin/admin-report-details/admin-report-details.component')
          .then(m => m.AdminReportDetailsComponent)
    },
    { path: 'users', component: AdminUsersComponent }
  ]
}

 

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
