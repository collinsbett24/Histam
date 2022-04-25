import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { AddComponent } from './add/add.component';
import { DownloadComponent } from './download/download.component';
import { LoginComponent } from './login/login.component';
import { AdminMonitorComponent } from './admin-monitor/admin-monitor.component';
import { StatsComponent } from './stats/stats.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
{path: '', component:SearchComponent},
{path: 'search', component:SearchComponent},
{path: 'update/:id', component:UpdateComponent},
{path: 'stats', component:StatsComponent},
{path: 'add', component:AddComponent},
{path: 'download/:id', component:DownloadComponent},
{path: 'login', component:LoginComponent},
{path: 'monitor', component:AdminMonitorComponent}
];

@NgModule({
  //imports: [RouterModule.forRoot(routes, {useHash: true})],--for refreshhing purposes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
