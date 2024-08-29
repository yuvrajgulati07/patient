import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  generateExcel(): void {
    // Define the default headers
    const headers = ['First Name', 'Last Name', 'Gender', 'Street Address', 'Country', 'State', 'Mobile Number'];

    // Create a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');

    // Write the workbook to a file and trigger download
    XLSX.writeFile(workbook, 'PatientsTemplate.xlsx');
  }



readExcel(file: File): Observable<any[]> {
  return new Observable((observer: Observer<any[]>) => {
    const reader = new FileReader();

    // Event listener for when the file reading operation is successfully completed
    reader.onload = (e: any) => {
      try {
        // Convert the result of the file reading operation to a Uint8Array
        const data = new Uint8Array(e.target.result);
        
        // Read the data into a workbook using XLSX library
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet from the workbook
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        
        // Convert the worksheet data to JSON format with the first row as headers
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Emit the JSON data and complete the observable 
        // Giving Array data
        observer.next(jsonData);
        observer.complete();
      } catch (error) {
        // Emit the error if something goes wrong
        observer.error(error);
      }
    };

    // Event listener for when there is an error during the file reading operation
    reader.onerror = (error) => {
      // Emit the error if something goes wrong
      observer.error(error);
    };

    // Read the file as an array buffer
    reader.readAsArrayBuffer(file);
  });
}
}
