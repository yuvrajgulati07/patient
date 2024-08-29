import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientManagementRoutingModule } from './patient-management-routing.module';
import { PatientInfoComponent } from './patient-info/patient-info.component';
import { SharedModule } from '../shared/shared.module';
import { AddPatientModalComponent } from './add-patient-modal/add-patient-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { DeletePatientModalComponent } from './delete-patient-modal/delete-patient-modal.component';


@NgModule({
  declarations: [
    PatientInfoComponent,
    AddPatientModalComponent,
    DeletePatientModalComponent
  ],
  imports: [
    CommonModule,
    PatientManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgOtpInputModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [provideNgxMask()]
})
export class PatientManagementModule { }
