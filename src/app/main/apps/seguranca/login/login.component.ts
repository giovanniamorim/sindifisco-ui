import { locale } from './../../mail-ngrx/i18n/en';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
      /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
  constructor(
      private _auth: AuthService,
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



      // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            usuario    : this._formBuilder.control('', [Validators.required, Validators.email]),
            senha      : this._formBuilder.control (['', Validators.required])
        });
    }

    login(usuario: string, senha: string): any {
        this._auth.login( this.loginForm.value.usuario,
                          this.loginForm.value.senha)
                          .then(() => {
                            this._router.navigate(['/apps/dashboards/analytics']);
                          })
                          .catch(erro => {
                            //   this._errorHandle(erro);
                          });
    }
 

}
