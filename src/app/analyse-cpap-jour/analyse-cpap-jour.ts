import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '../routes';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Patient {
  id_patient: number;
  
}



@Component({
  selector: 'app-analyse-cpap-jour',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './analyse-cpap-jour.html',
  styleUrl: './analyse-cpap-jour.scss',
})
export class AnalyseCpapJour implements OnInit{ 

commentForm: FormGroup;

patients: Patient[] = [];

loadingPatients = false;

  constructor(
    private router: Router,
    protected routes: Routes,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private http: HttpClient
  ) {

    this.commentForm = this.fb.group({
      selectedPatient: [null, Validators.required],
      
    });

  }

  ngOnInit(): void {
    console.log('INIT AnalyseCpapJour');
    
    this.loadPatients();
  }


  loadPatients() {
    this.loadingPatients = true;

    this.routes.listePatients().subscribe({
      next: (response: any) => {

        this.patients = response.patient ?? [];

        this.loadingPatients = false;

        this.cdr.detectChanges();

        console.log('loaded patients:', this.patients);
      },
      error: (err) => {
        console.error(err);
        this.loadingPatients = false;
      }
    });
  }
 // =========================
  // SUBMIT ETL
  // =========================
  submit() {

    if (this.commentForm.invalid) return;

    const { selectedPatient } = this.commentForm.value;

    if (!selectedPatient) {
      alert("Sélection manquante.");
      return;
    }

    this.routes.lancerETL2(
      selectedPatient.id_patient,
      
    ).subscribe({
      next: (res) => {
        console.log("ETL lancé :", res);
          
        // reset propre après succès
        this.commentForm.reset();
      },
      error: (err) => {
        console.error("Erreur ETL :", err);
        console.log(err.error);
      }
    });
  }

}







 
  
 
