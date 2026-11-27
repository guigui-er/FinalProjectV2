import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClientService } from '../service/client-service';
import { ReservationService } from '../service/reservation-service';


export const clientGuard: CanActivateFn = (route, state) => {

  const reservationService = inject(ReservationService);
  const router = inject(Router);

  if (reservationService.ReservationForm) {

    return true;

  }

  return router.createUrlTree([''])
  
};
