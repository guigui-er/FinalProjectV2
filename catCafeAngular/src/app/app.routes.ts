import { Routes } from '@angular/router';
import { GerantConnexionComponent } from './component/gerant-connexion-component/gerant-connexion-component';
import { CafePage } from './component/cafe-page/cafe-page';
import { AccueilComponent } from './component/accueil-component/accueil-component';
import { Entree } from './component/entree/entree';
import { Entree } from './component/entree/entree';
import { PopupClientOrGerant } from './component/popup-client-or-gerant/popup-client-or-gerant';
import { EcranPrincipal } from './page/ecran-principal/ecran-principal';

export const routes: Routes = [

    {
        path: 'accueil',
        component: AccueilComponent
    },

    {
        path: 'entree',
        component: Entree
    },

    {
        path: 'gerant',
        component: GerantConnexionComponent
    },

    {
        path: 'gerantPage',
        component: CafePage
    }
];

export const routes: Routes = [
    {
    path: 'client',
    component: Entree,
  },
  {
    path: '',
    component: PopupClientOrGerant
  },
    {
    path: 'ecranPrincipal',
    component: EcranPrincipal
  }
    // Rediriger par défaut sur l'accueil
];
