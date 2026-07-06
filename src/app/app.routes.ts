import { Routes } from '@angular/router';
import { Login } from './login/login';
import { HomePage } from './home-page/home-page';
import { InfoUser } from './info-user/info-user';
import { AnalyseNuit } from './analyse-nuit/analyse-nuit';
import { Modifperso } from './modifperso/modifperso'
import { Choixperso } from './choixperso/choixperso';
import { AnalyseCpapJour } from './analyse-cpap-jour/analyse-cpap-jour';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'login', component: Login },
    { path: 'infouser', component: InfoUser },
    { path: 'modifperso', component: Modifperso },
    { path: 'choixperso', component: Choixperso },
    { path: 'analysenuit', component: AnalyseNuit,  runGuardsAndResolvers: 'always'},
    { path: 'analysecpap', component: AnalyseCpapJour,  runGuardsAndResolvers: 'always'},
    { path: '**', redirectTo: '' }
];
