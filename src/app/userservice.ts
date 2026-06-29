import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
    constructor(private http: HttpClient){};

    isConnected = signal(false);
    message = signal("");
    user = signal<{email?: string, password?: string, prenom?: string, nom?:string, telephone?:string,date_embauche?: string, id? : string}>({});

    logOut(){
      this.isConnected.update(v => false);
    }

    connectUser(email:string, password :string) {
    return this.http.post('http://localhost:3000/api/users/login',{
      email,
      password,
      
      
    });
}
}
