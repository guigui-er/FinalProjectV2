import { Routes } from '@angular/router';
import { Paiement } from './component/paiement/paiement';
import { Commande } from './component/commande/commande';
import { GerantConnexionComponent } from './component/gerant-connexion-component/gerant-connexion-component';
import { GerantPage } from './page/gerant-page/gerant-page';
import { AccueilComponent } from './component/accueil-component/accueil-component';
import { Entree } from './component/entree/entree';
import { EcranPrincipal } from './page/ecran-principal/ecran-principal';
import { authGuard } from './guard/auth-guard';

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
    },

    {
        path: 'gerantPage',
        component: GerantPage,
        canActivate: [ authGuard ]
    },
    {
        path: 'paiement',
        component: Paiement
    },

    // Popup Commande avec le menu (Célia)
    { 
        path: 'commande', 
        component: Commande 
    }

];
