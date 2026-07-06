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
interface Personnel {
  id_personnel: number;
  nom: string;
  prenom: string;
  date_embauche: string;
  telephone: string;
  email: string;
  actif: number;
  password: string;
}
interface Patient {
  id_patient: number;
}
export interface PersonnelResponse {
  success: boolean;
  message: string;
  personnel: Personnel[];
}
export interface PatientResponse {
  success: boolean;
  message: string;
  patient: Patient[];
}
export interface FindedPersonnel {
  id_personnel: number;
  nom: string;
  prenom: string;
  date_embauche: string;
  telephone: string;
  email: string;
  actif: number;
  password: string;
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

    PersonnelTrouve = signal<PersonnelResponse[]>([]);
    personnel = signal<{email?: string, password?: string, prenom?: string, nom?:string, telephone?:string,date_embauche?: string, id_personnel? : number, actif?: number}>({});
    
   private findedSelectedPersonnel = signal<Personnel | null>(null);

  selectedPersonnel = this.findedSelectedPersonnel.asReadonly();

  setSelectedPersonnel(personnel: Personnel) {
    this.findedSelectedPersonnel.set(personnel);
  }

  clearSelectedPersonnel() {
    this.findedSelectedPersonnel.set(null);
  }

    get isInfirmier(): boolean {
    return this.job().source?.toUpperCase() === 'INFIRMIER';
    
    }

    get isMedecin(): boolean {
    return this.job().source?.toUpperCase() === 'MEDECIN';
    }

    get isRh(): boolean {
    return this.job().source?.toUpperCase() === 'RH';
    
    }

    listeNuits() {
        return this.http.get<NuitResponse>('http://localhost:3000/api/technicien/nuitDispo',{});
    }

    listeMedecins() {
        return this.http.get<MedecinsResponse>('http://localhost:3000/api/medecin/getMedecin',{});
    }

    listePersonnel() {
        return this.http.get<PersonnelResponse>('http://localhost:3000/api/users/getPersonnel',{});
    }

    listePatients() {
        return this.http.get<PatientResponse>('http://localhost:3000/api/patient/getPatient',{});
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

changeUserName(nom:string, id_personnel :number) {
    return this.http.post('http://localhost:3000/api/users/changeNamePersonnel',{
      nom,
      id_personnel,   
      
    });
}

changeUserPrenom(prenom:string, id_personnel :number) {
    return this.http.post('http://localhost:3000/api/users/changePrenomPersonnel',{
      prenom,
      id_personnel,   
      
    });
}

changeUserEmail(email:string, id_personnel :number) {
    return this.http.post('http://localhost:3000/api/users/changeEmailPersonnel',{
      email,
      id_personnel,   
      
    });
}

changeUserPhone(telephone:string, id_personnel :number) {
    return this.http.post('http://localhost:3000/api/users/changePhonePersonnel',{
      telephone,
      id_personnel,   
      
    });
}

changeUserActif(actif:number, id_personnel :number) {
    return this.http.post('http://localhost:3000/api/users/changeActifPersonnel',{
      actif,
      id_personnel,   
      
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

 lancerETL2(
  id_patient: number,
  
) {
  return this.http.get('http://localhost:3000/lancerETL2', {
    params: {
            id_patient
        }
    
  });
}
   
}
