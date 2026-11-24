import { Routes } from '@angular/router';
import { GerantConnexionComponent } from './component/gerant-connexion-component/gerant-connexion-component';
import { CafePage } from './component/cafe-page/cafe-page';
import { AccueilComponent } from './component/accueil-component/accueil-component';
import { Entree } from './component/entree/entree';

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
