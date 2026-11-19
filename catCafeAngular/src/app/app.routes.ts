import { Routes } from '@angular/router';
import { Entree } from './component/entree/entree';
import { PopupClientOrGerant } from './component/popup-client-or-gerant/popup-client-or-gerant';
import { EcranPrincipal } from './page/ecran-principal/ecran-principal';


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
