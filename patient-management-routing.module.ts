import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { AuthGuard } from '../guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'patient_Management/patientInfo', component : PatientInfoComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers : [AuthGuard]
})
export class PatientManagementRoutingModule { }
