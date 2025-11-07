import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UploadComponent } from './components/upload/upload.component';
import { ReportComponent } from './components/report/report.component';
import { HistoryComponent } from './components/history/history.component';
import { ChartComponent } from './components/chart/chart.component';
import { CsvPreviewComponent } from './components/csv-preview/csv-preview.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './serviecs/auth.service';
import { DataService } from './serviecs/data.service';
import { ReportService } from './serviecs/report.service';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),

     RouterModule,
    // Standalone Components
    LoginComponent,
    SignupComponent,
    UploadComponent,
    ReportComponent,
    HistoryComponent,
    ChartComponent,
    CsvPreviewComponent
  ],
  providers: [AuthGuard, AuthService, DataService, ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
