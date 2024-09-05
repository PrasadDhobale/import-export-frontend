import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  async createReport(itcHsCode: string, fromCountry: string, toCountry: string): Promise<void> {
    const url = 'http://localhost:5000/api/reports/export'; // Ensure this URL matches your backend route
    try {
      const response = await axios.post(url, {
        itcHsCode,
        fromCountry,
        toCountry
      }, {
        responseType: 'blob' // Important for file download
      });

      // Create a blob link to download the file
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', `report_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error('Error in ReportService:', error);
      throw error; // Propagate the error to be handled in the component
    }
  }
}
