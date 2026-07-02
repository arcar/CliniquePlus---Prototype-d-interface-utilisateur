import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '../routes';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Nuit {
  id_nuit: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  nuitsTrouvees: Nuit[];
}

interface Medecin {
  id_personnel: number;
  nom: string;
  prenom: string;
  specialite: string;
  numero_rpps: string;
  date_embauche: string;
  telephone: string;
  email: string;
  actif: number;
  password: string;
}

@Component({
  selector: 'app-analyse-nuit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './analyse-nuit.html',
  styleUrl: './analyse-nuit.scss',
})
export class AnalyseNuit implements OnInit {

  commentForm: FormGroup;

  nuits: Nuit[] = [];
  docs: Medecin[] = [];

  loadingNuits = false;
  loadingMedecins = false;

  constructor(
    private router: Router,
    protected routes: Routes,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private http: HttpClient
  ) {

    this.commentForm = this.fb.group({
      selectedNuit: [null, Validators.required],
      selectedMedecin: [null, Validators.required],
      comment: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  ngOnInit(): void {
    console.log('INIT AnalyseNuit');
    this.loadNuits();
    this.loadMedecins();
  }

  // =========================
  // NUITS
  // =========================
  loadNuits() {
    this.loadingNuits = true;

    this.routes.listeNuits().subscribe({
      next: (response: ApiResponse) => {

        this.nuits = response.nuitsTrouvees ?? [];

        this.loadingNuits = false;

        this.cdr.detectChanges();

        console.log('loaded nuits:', this.nuits);
      },
      error: (err) => {
        console.error(err);
        this.loadingNuits = false;
      }
    });
  }

  // =========================
  // MEDECINS
  // =========================
  loadMedecins() {
    this.loadingMedecins = true;

    this.routes.listeMedecins().subscribe({
      next: (response: any) => {

        this.docs = response.medecin ?? [];

        this.loadingMedecins = false;

        this.cdr.detectChanges();

        console.log('loaded medecins:', this.docs);
      },
      error: (err) => {
        console.error(err);
        this.loadingMedecins = false;
      }
    });
  }

  // =========================
  // SUBMIT ETL
  // =========================
  submit() {

    if (this.commentForm.invalid) return;

    const { selectedNuit, selectedMedecin, comment } = this.commentForm.value;

    if (!selectedNuit || !selectedMedecin) {
      alert("Sélection manquante.");
      return;
    }

    this.routes.lancerETL1(
      selectedNuit.id_nuit,
      selectedMedecin.id_personnel,
      comment
    ).subscribe({
      next: (res) => {
        console.log("ETL lancé :", res);

        // reset propre après succès
        this.commentForm.reset();
      },
      error: (err) => {
        console.error("Erreur ETL :", err);
      }
    });
  }
}