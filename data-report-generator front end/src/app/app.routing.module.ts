import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UploadComponent } from './components/upload/upload.component';
import { ReportComponent } from './components/report/report.component';
import { HistoryComponent } from './components/history/history.component';
import { ChartComponent } from './components/chart/chart.component';
import { CsvPreviewComponent } from './components/csv-preview/csv-preview.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
   { path: 'upload', component: UploadComponent, canActivate: [UserGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [UserGuard] },
  { path: 'report', component: ReportComponent, canActivate: [UserGuard] },

  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },

  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'chart', component: ChartComponent, canActivate: [AuthGuard] },
  { path: 'csv-preview', component: CsvPreviewComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
