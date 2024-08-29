import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as countries from '../json/countries.json';
import * as states from '../json/states.json';
import { PatientServiceService } from '../service/patient-service.service';

//Created Types of array
interface Country {
  id: string;
  name: string;
}

interface State {
  id: string;
  name: string;
}

interface StateDictionary {
  [key: string]: State[];
}

@Component({
  selector: 'app-add-patient-modal',
  templateUrl: './add-patient-modal.component.html',
  styleUrls: ['./add-patient-modal.component.css'],
})
export class AddPatientModalComponent implements OnInit {
  updateMode: boolean = false;
  patientId: any;

  singlePatientRecord : any;

  addPatientForm: any;
  countries: Country[] = (countries as any).default;
  states: StateDictionary = (states as any).default;
  filteredStates: State[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private patientService: PatientServiceService
  ) {}

  ngOnInit(): void {
    this.addPatientForm = new FormGroup({
      patientFirstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      patientLastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      patientGender: new FormControl('', [Validators.required]),
      patientStreetAddress: new FormControl('', [Validators.required]),
      patientCountry: new FormControl('', [Validators.required]),
      patientState: new FormControl('', [Validators.required]),
      patientMobileNumber: new FormControl('', [Validators.required]),
    });

    //Used to filter the states based on the value selected on country name
    this.addPatientForm
      .get('patientCountry')
      ?.valueChanges.subscribe((countryName: string) => {
        const selectedCountry = this.countries.find(
          (c) => c.name === countryName
        );
        if (selectedCountry) {
          this.filteredStates = this.states[selectedCountry.id] || [];
          this.addPatientForm.get('patientState')?.reset();
        }
      });

    
  }

  onSubmitAddPatient(): void {
    if (this.addPatientForm.valid) {
      this.patientService.addPatient(this.addPatientForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success('Successfully!', res.message);
          } else {
            this.toastr.error(res.message);
          }
        },

        error: (error) => {
          if (error.error && error.error.message) {
            this.toastr.error(error.error.message, 'Error!');
          } else {
            this.toastr.error('An unexpected error occurred.', 'Error!');
          }
        },
      });

      if (this.updateMode) {
        this.toastr.success('Successfully!', 'Patient Info Updated');
      }
    } else {
      this.toastr.error('Error!', 'Client side Validation Failed');
    }
  }

  onUpdatePatient(): void {

    this.singlePatientRecord = {
      ...this.addPatientForm.value,
      id: this.patientId
    };


    this.patientService.updatePatient(this.singlePatientRecord).subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.toastr.success(res.message, 'Succesfull!');
        } else {
          this.toastr.error(res.message);
        }
      },

      error: (err) => {
        if (err.error && err.error.message) {
          this.toastr.error(err.error.message, 'Error!');
        } else {
          this.toastr.error('An unexpected error occurred.', 'Error!');
        }
      },
    });
  }

  updatePatient(patient: any): void {
    this.updateMode = true;

    this.patientId = patient.id;

    
    this.addPatientForm.patchValue({
      patientFirstName: patient.patientFirstName,
      patientLastName: patient.patientLastName,
      patientCountry: patient.patientCountry,
      patientState: patient.patientState,
      patientGender: patient.patientGender,
      patientStreetAddress: patient.patientStreetAddress,
      patientMobileNumber: patient.patientMobileNumber,
    });
  }

  //when modal is closed , the values should be reset also
  onModalHidden(): void {
    this.updateMode = false;
    this.addPatientForm.reset();
    this.addPatientForm.markAsUntouched();
  }
}
