import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from '../Interface/IPagination';

@Injectable({
  providedIn: 'root',
})
export class PatientServiceService {
  baseUrl: string = 'https://localhost:44317/api/Patient';

  constructor(private http: HttpClient) {}

  addPatient(patientDetails: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/RegisterPatient`,
      patientDetails
    );
  }

  getAllPatient(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/GetAllPatients`);
  }

  updatePatient(patientDetails: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/UpdatePatientDetails`,
      patientDetails
    );
  }

  removePatient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/RemovePatientRecord/${id}`);
  }

  searchRecords(items: IPagination): Observable<any> {
    return this.http.get<any>(
   `${this.baseUrl}/Pagination?pageNumber=${items.pageNumber}&pageSize=${items.pageSize}&searchText=${items.searchText}`
    );
  }
}
