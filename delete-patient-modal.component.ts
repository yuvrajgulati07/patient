import { Component, Input, OnInit } from '@angular/core';
import { PatientServiceService } from '../service/patient-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-patient-modal',
  templateUrl: './delete-patient-modal.component.html',
  styleUrls: ['./delete-patient-modal.component.css']
})
export class DeletePatientModalComponent {
  patientId : any;

  constructor(private patientService : PatientServiceService, private toastr : ToastrService){}


  DeletePatientId(id : number){
    this.patientId = id;
  }


  deleteReservedRoom() {
    this.patientService.removePatient(this.patientId).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(response.message, 'Successfully!');
          window.location.reload();
        }
      },
      error: (error) => {
        if (error.error && error.error.message) {
          this.toastr.error(error.error.message, 'Error!');
        } 
        else {
          console.log(error);
          this.toastr.error('An unexpected error occurred.', 'Error!');
        }
      }
    })
  }
}
