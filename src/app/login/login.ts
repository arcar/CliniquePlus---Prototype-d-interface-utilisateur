import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Userservice } from '../userservice';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Routes } from '../routes';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(protected userService : Userservice, private router : Router, protected routes : Routes) {

  }
  
  email = "";
  password = "";

  seConnecter() {

    if (this.email == '' || this.password == '') {
      console.log("ERREUR, champs vide")
      this.userService.message.set("ERREUR, champs vide") 
    }
    else {
      const login = { email: this.email, password: this.password};
      this.connect();
    }
  }

  connect() {
    this.userService.connectUser(this.email, this.password).subscribe({
      next: (response : {email?: string, password?: string, prenom? : string, telephone? : string, date_embauche? : string, nom? : string, id? : number}) => {
        console.log(response)

          let user : {} = {
            email: response.email,
            password: response.password,
            prenom: response.prenom, 
            telephone: response.telephone,
            date_embauche : response.date_embauche,
            nom : response.nom,
            id_personnel : response.id,
          }
          
          this.userService.message.set("Connexion effectuée")
          this.userService.user.update(u => user)
          this.userService.id_personnel.set(response.id)

          this.userService.isConnected.update(v => true);
          console.log(this.userService.isConnected())
          console.log(this.userService.user())
          this.router.navigate(['/']);
          
          this.findJob();
      },
      error: err => {console.error(err)
      this.userService.message.set("Erreur connexion")  
      
      }
    });
}

  findJob() {
    this.routes.chercheJob(this.userService.id_personnel()).subscribe({
      next: (response) => {
        console.log(response);

        this.routes.job.update(u => ({
          ...u,
          source: response.job.source
        }));

        this.userService.message.set("Connexion effectuée");
      },
      error: (err) => {
        console.error(err);
        this.userService.message.set("Erreur connexion");
      }
    });
  }
 
}
