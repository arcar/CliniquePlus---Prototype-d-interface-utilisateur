import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface JobResponse {
  success: boolean;
  message: string;
  job: {
    source: string;
  };
}

interface NuitResponse {
  success: boolean;
  message: string;
  nuitsTrouvees: [
  ];
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

export interface MedecinsResponse {
  success: boolean;
  message: string;
  medecin: Medecin[];
  
}

@Injectable({
  providedIn: 'root',
})
export class Routes {
    constructor(private http: HttpClient){}; 

    job = signal<{id_personnel?:number, source?: string}>({});
    id_nuit = signal<{id_nuit?:number}>({});
    medecin_trouve = signal<{nom?:string, prenom?:string}>({});
    nuitTrouvee = signal<NuitResponse[]>([]);
    medecinTrouve = signal<MedecinsResponse[]>([]);
    

    listeNuits() {
        return this.http.get<NuitResponse>('http://localhost:3000/api/technicien/nuitDispo',{});
    }

    listeMedecins() {
        return this.http.get<MedecinsResponse>('http://localhost:3000/api/medecin/getMedecin',{});
    }

    chercheJob(id_personnel: number) {
    return this.http.get<JobResponse>(
        'http://localhost:3000/api/users/job',
        {
        params: {
            id_personnel: id_personnel
        }
        }
    );
    }

    connectUser(email:string, password :string) {
    return this.http.post('http://localhost:3000/api/users/login',{
      email,
      password,   
      
    });
}
  lancerETL1(
  id_nuit: number,
  id_medecin_validateur: number,
  commentaire_medical: string
) {
  return this.http.get('http://localhost:3000/lancerETL1', {
    params: {
            id_nuit,
    id_medecin_validateur,
    commentaire_medical
        }
    
  });
}
   
}
