
import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserResponse } from "src/app/responses/user/user.response";
import { TokenService } from "src/app/services/token.service";
import { UserService } from "src/app/services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    userResponse?: UserResponse | null;
    constructor(
        private tokenService: TokenService, 
        private router: Router,
        private userService: UserService
    ) {}
    canActive(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isTokenExpired = this.tokenService.isTokenExpired();
        const isUserIdValid = this.tokenService.getUserId() > 0;
        this.userResponse = this.userService.getUserFromLocalStorage();
        const isAdmin = this.userResponse?.role.name == 'ADMIN';
        debugger
        if(!isTokenExpired && isUserIdValid && isAdmin) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

export const AdminGuardFn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    debugger
    return inject(AdminGuard).canActive(next, state);
}