import { Routes } from '@angular/router';
import { Entree } from './component/entree/entree';
import { PopupClientOrGerant } from './component/popup-client-or-gerant/popup-client-or-gerant';


export const routes: Routes = [
    {
    path: 'client',
    component: Entree,
  },
  {
    path: '',
    component: PopupClientOrGerant
  }
    // Rediriger par défaut sur l'accueil
];
