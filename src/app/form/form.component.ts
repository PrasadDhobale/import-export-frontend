import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    this.myForm = this.fb.group({
      from: ['', [Validators.required, this.stringValidator]],
      to: ['', [Validators.required, this.stringValidator]],
      hsn: ['', Validators.required]
    });
  }

  stringValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (typeof value === 'string' && isNaN(Number(value))) {
      return null; // Valid string
    }
    return { notString: true }; // Invalid if numeric
  }

  onImport() {
    if (this.myForm.valid) {
      const from = this.myForm.get('from')?.value;
      const to = this.myForm.get('to')?.value;
      const hsn = this.myForm.get('hsn')?.value;
      console.log('Importing HSN:', hsn, 'from', from, 'to', to);
      this.reportService.createReport(hsn, from, to)
        .then((response: any) => {
          console.log('Report created successfully:', response);
        })
        .catch((error: any) => {
          console.error('Error during import:', error);
        });
    }
  }

  onExport() {
    if (this.myForm.valid) {
      const from = this.myForm.get('from')?.value;
      const to = this.myForm.get('to')?.value;
      const hsn = this.myForm.get('hsn')?.value;
      console.log('Exporting HSN:', hsn, 'from', from, 'to', to);
      this.reportService.createReport(hsn, from, to)
        .then((response: any) => {
          console.log('Report created successfully:', response);
        })
        .catch((error: any) => {
          console.error('Error during export:', error);
        });
    }
  }
}
