import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '../routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { MedecinsResponse } from '../routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './analyse-nuit.html',
  styleUrl: './analyse-nuit.scss',
})
export class AnalyseNuit implements OnInit {

  commentForm: FormGroup;

  nuits: Nuit[] = [];
  selectedNuit: Nuit | null = null;
  loadingNuits = true;

  docs : Medecin[] = [];
  selectedMedecin: Medecin | null = null;
  loadingMedecins = true;

  constructor(
    private router: Router,
    protected routes: Routes,
    private cdr: ChangeDetectorRef,
    private fb : FormBuilder
  ) {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(3)]]
    });
    
  }

  submit() {
    if (this.commentForm.valid) {
      console.log(this.commentForm.value.comment);
    }
  }

  ngOnInit(): void {
    console.log('INIT AnalyseNuit');
    this.loadNuits();
    this.loadMedecins();
  }

  loadNuits() {
  this.loadingNuits = true;

  this.routes.listeNuits().subscribe({
    next: (response: ApiResponse) => {

      this.nuits = response.nuitsTrouvees ?? [];

      this.selectedNuit = null;

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

  findNuit() {
    this.routes.listeNuits().subscribe({
      next: (response: ApiResponse) => {

        this.nuits = response.nuitsTrouvees ?? [];

        console.log('debug first:', this.nuits?.[0]);

        this.routes.id_nuit.update(u => ({
          ...u
        }));

        const nuits = this.routes.nuitTrouvee();

        nuits.forEach((element) => {
          console.log(element);
        });
      },
      error: (err) => console.error(err)
    });
  }

  loadMedecins() {
  this.loadingMedecins = true;

  this.routes.listeMedecins().subscribe({
    next: (response: MedecinsResponse) => {

      this.docs = response.medecin ?? [];

      this.selectedMedecin = null;

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

    findMedecin() {
      this.routes.listeMedecins().subscribe({
        next: (response: MedecinsResponse) => {
          this.docs = response.medecin ?? [];

          console.log('debug first:', this.docs?.[0]);

        
          const medecins = this.routes.medecinTrouve();

          medecins.forEach((element) => {
            console.log(element);
          });
        },
        error: (err) => console.error(err)
      });
    }
}