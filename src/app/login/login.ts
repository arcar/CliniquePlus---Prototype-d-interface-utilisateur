import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Userservice } from '../userservice';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(protected userService : Userservice, private router : Router) {

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
      next: (response : {email?: string, password?: string, prenom? : string, telephone? : string, date_embauche? : string, nom? : string, id? : string}) => {
        console.log(response)

          let user : {} = {
            email: response.email,
            password: response.password,
            prenom: response.prenom, 
            telephone: response.telephone,
            date_embauche : response.date_embauche,
            nom : response.nom,
            id : response.id,
          }
          
          this.userService.message.set("Connexion effectuée")
          this.userService.user.update(u => user)

          this.userService.isConnected.update(v => true);
          console.log(this.userService.isConnected())
          console.log(this.userService.user())
          this.router.navigate(['/']);
          
          
      },
      error: err => {console.error(err)
      this.userService.message.set("Erreur connexion")  
      
      }
    });
}

 
}
