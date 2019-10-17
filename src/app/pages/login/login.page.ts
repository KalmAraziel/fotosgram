import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', {static: true})  slides: IonSlides;

  

  

  loginUser = {
    email: 'test@test.com',
    password: '123456'
  };

  nuevoUsuario: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'test',
    avatar: 'av-1.png'
   };

  constructor(
    private userService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService
    ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (!fLogin.valid) { return; }

    const valido = await this.userService.login(this.loginUser.email, this.loginUser.password);
    console.log(this.loginUser);
    if (valido) {
      // navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      //  alerta error
      this.uiService.alertaInformativa('Usuario y contraseña invalidos.');
    }
  }

  async registrar(fRegistro: NgForm) {
    console.log(fRegistro.valid);
    if (!fRegistro.valid) { return; }
    const valido = await this.userService.registro(this.nuevoUsuario);
    if (valido) {
      // navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      //  alerta error
      this.uiService.alertaInformativa('el usuario ya existe.');
    }
  }



  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
