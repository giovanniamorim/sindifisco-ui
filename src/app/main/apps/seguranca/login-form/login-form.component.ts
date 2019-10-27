import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit, ErrorHandler, ViewEncapsulation } from '@angular/core';
import { ErrorHandlerService } from '../../error-handler.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  
      /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
  constructor(
      private _auth: AuthService,
      private _errorHandle: ErrorHandlerService,
      private _router: Router,
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder
      ){

        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

  }

  login(usuario: string, senha: string): any {
      this._auth.login(usuario, senha)
        .then(() => {
            this._router.navigate(['/apps/dashboards/analytics']);
        })
        .catch(erro => {
            this._errorHandle.handle(erro);
        });
  }

      // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            usuario   : ['', [Validators.required]],
            senha: ['', Validators.required]
        });
    }

}
