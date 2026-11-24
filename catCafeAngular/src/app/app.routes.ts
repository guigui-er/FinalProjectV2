import { Routes } from '@angular/router';
import { GerantConnexionComponent } from './component/gerant-connexion-component/gerant-connexion-component';

import { AccueilComponent } from './component/accueil-component/accueil-component';
import { Entree } from './component/entree/entree';
import { EcranPrincipal } from './page/ecran-principal/ecran-principal';

export const routes: Routes = [

    {
        path: '',
        component: AccueilComponent
    },

    {
        path: 'client',
        component: Entree,
    },

    {
        path: 'gerant',
        component: GerantConnexionComponent
    },
        {
    path: 'ecranPrincipal',
    component: EcranPrincipal
   }


];

