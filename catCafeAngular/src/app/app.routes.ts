import { Routes } from '@angular/router';
import { PageChat } from './page/page-chat/page-chat';

export const routes: Routes = [
/*
    {
        path: 'ecranPrincipal',
        component: EcranPrincipal
    },
*/
    {
        path : 'chat/:id', 
        component: PageChat
    }
];
