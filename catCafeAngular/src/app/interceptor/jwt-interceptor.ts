import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { GerantConnexionService } from '../service/gerant-connexion-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const gerantCoService = inject(GerantConnexionService);
  const router = inject(Router);

  // Pas de jeton, donc pas besoin de l'injecter ...
  if (!gerantCoService.token) {
    return next(req);
  }

  // API de connexion, donc pas besoin du jeton ...
  if (req.url.endsWith('/api/gerant/auth')) {
    return next(req);
  }

  // Dans les autres cas, on injecte le JWT
  const authReq = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${ gerantCoService.token }`
    }
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

    // Si erreur d'autorisations, retour à la page login
    if (error.status === 403) {
      gerantCoService.resetAuth();
      router.navigate([ '/gerant' ]);
    }

    return throwError(() => error);
  })
);
};