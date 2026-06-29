import { Routes } from '@angular/router';

import { Login } from './login/login';
import { HomePage } from './home-page/home-page';
import { InfoUser   } from './info-user/info-user';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'login', component: Login },
    { path: 'infouser', component: InfoUser },
    { path: '**', redirectTo: '' }
];
