import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '../routes';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


interface Personnel {
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
  selector: 'app-choixperso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './choixperso.html',
  styleUrl: './choixperso.scss',
})
export class Choixperso implements OnInit {
  perso: Personnel[] = [];

  loadingPersonnel = false;

  commentForm: FormGroup;
  

  constructor(    
    private router: Router,
    protected routes: Routes,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private http: HttpClient    
  ){
    this.commentForm = this.fb.group({
          selectedPersonnel: [null, Validators.required],
      });
  }
  ngOnInit(): void {
    console.log('INIT ChoixPerso');
    this.loadPersonnel();
  }

  loadPersonnel() {
    this.loadingPersonnel = true;

    this.routes.listePersonnel().subscribe({
      next: (response: any) => {

        this.perso = response.personnel ?? [];

        this.loadingPersonnel = false;

        this.cdr.detectChanges();

        console.log('loaded personnel:', this.perso);
      },
      error: (err) => {
        console.error(err);
        this.loadingPersonnel = false;
      }
    });
  }




goToModif() {
   const info_personnel = this.commentForm.value.selectedPersonnel;

  if (!info_personnel) {
    alert("Aucun personnel sélectionné");
    return;
  }

  this.routes.setSelectedPersonnel(info_personnel);

  console.log('Personnel stocké :', info_personnel);


  this.router.navigate(['/modifperso']);
  }

  

submit() {

    if (this.commentForm.invalid) return;

    const {selectedPersonnel} = this.commentForm.value;

    if (!selectedPersonnel) {
      alert("Sélection manquante.");
      return;
    }
    
}
}
