import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { MatToolbarModule} from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterPipe } from './filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { AddComponent } from './add/add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DownloadComponent } from './download/download.component';
import { LoginComponent } from './login/login.component';
import { AdminMonitorComponent } from './admin-monitor/admin-monitor.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { StatsComponent } from './stats/stats.component';
import { MostSearchedComponent } from './most-searched/most-searched.component';
import { LeastSearchedComponent } from './least-searched/least-searched.component';
import { NoResultComponent } from './no-result/no-result.component';
import { SFooterComponent } from './s-footer/s-footer.component';
import { UpdateComponent } from './update/update.component';
import { LabComponent } from './lab/lab.component';


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    SearchComponent,
    AddComponent,
    DownloadComponent,
    LoginComponent,
    AdminMonitorComponent,
    StatsComponent,
    MostSearchedComponent,
    LeastSearchedComponent,
    NoResultComponent,
    SFooterComponent,
    UpdateComponent,
    LabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule ,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    FormsModule, 
    ReactiveFormsModule, NgbModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
