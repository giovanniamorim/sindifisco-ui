import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, ErrorHandler, Injector } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    
    constructor(private injector: Injector) { }
    
    handleError(error: any): void {
        const router = this.injector.get(Router);
        console.log(`Request URL:  ${router.url}`);

        if (error instanceof HttpErrorResponse) {
            console.log(`Backend return status code: `, error.status);
            console.log(`Response body: `, error.message);
        } 
        else {
            console.log(`An error occurred:`, error.message);
        }

        router.navigate(['pages/errors/error-404']);

    }

}
