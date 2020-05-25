import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PipesModule } from '../pipes/pipes.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';



@NgModule({
  declarations: [
    // PagesComponent,
    DashboardComponent,
    //ProgressComponent,
    //Graficas1Component,
    //IncrementadorComponent,
    //GraficoDonaComponent,
    AccountSettingsComponent,
    //PromesasComponent,
    //RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    //ModalUploadComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent
],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    //ChartsModule,
    PipesModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class PagesModule { }
