import { Component, OnInit  } from '@angular/core';
import { Routes } from '../routes';
import { Userservice } from '../userservice';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-modifperso',
  imports: [DatePipe, FormsModule],
  templateUrl: './modifperso.html',
  styleUrl: './modifperso.scss',
})
export class Modifperso implements OnInit {
 constructor(protected userService : Userservice, protected routes: Routes) {
    

  }

   ngOnInit(): void {
    console.log('INIT ChoixPerso');
     const selected = this.routes.selectedPersonnel();

  console.log('Personnel récupéré :', selected); 
  
}
isEditModalOpen = false;
fieldToEdit: string = '';
fieldValue: any = '';

fieldTypes: Record<string, 'string' | 'number'> = {
  nom: 'string',
  prenom: 'string',
  email: 'string',
  telephone: 'string',
  actif: 'number'
};


openEditModal(field: string) {
  const personnel = this.routes.selectedPersonnel();
  if (!personnel) return;

  this.fieldToEdit = field;
  this.fieldValue = (personnel as any)[field];

  this.isEditModalOpen = true;
}

closeModal() {
  this.isEditModalOpen = false;
  this.fieldToEdit = '';
  this.fieldValue = '';
}

saveField() {
  const personnel = this.routes.selectedPersonnel();
  if (!personnel) return;

  const key = this.fieldToEdit;

  let value: any = this.fieldValue;

 
  if (this.fieldTypes[key] === 'number') {
    value = Number(value);
  }

  const oldValue = (personnel as any)[key];


  (personnel as any)[key] = value;

  const id = personnel.id_personnel;
  if (!id) return;

 
  const apiMap: Record<string, any> = {
    nom: () => this.routes.changeUserName(value, id),
    prenom: () => this.routes.changeUserPrenom(value, id),
    email: () => this.routes.changeUserEmail(value, id),
    telephone: () => this.routes.changeUserPhone(value, id),
    actif: () => this.routes.changeUserActif(value, id),
  };

  const apiCall = apiMap[key];

  if (apiCall) {
    apiCall().subscribe({
      next: () => console.log('Update OK'),
      error: () => {
       
        (personnel as any)[key] = oldValue;
      }
    });
  }

  this.closeModal();
}
}