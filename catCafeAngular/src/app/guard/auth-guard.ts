import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { GerantConnexionService } from '../service/gerant-connexion-service';

export const authGuard: CanActivateFn = (route, state) => {
  const gerantCoService: GerantConnexionService = inject(GerantConnexionService);
  const router: Router = inject(Router);

  if (gerantCoService.token) {
    return true;
  }

  return router.createUrlTree([ 'gerant' ]);
};
