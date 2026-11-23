import { Routes } from '@angular/router';
import { GerantConnexionComponent } from './component/gerant-connexion-component/gerant-connexion-component';
import { CafePage } from './component/cafe-page/cafe-page';

export const routes: Routes = [

    {
        path: 'gerant',
        component: GerantConnexionComponent
    },

    {
        path: 'gerantPage',
        component: CafePage
    }
];
