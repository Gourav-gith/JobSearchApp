import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const  router = inject(Router);

  let authkey = sessionStorage.getItem('user-authkey') 
  if(authkey){
    return true;
  }else{
    router.navigate([''])
    return false
  }
};
