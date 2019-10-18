import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  getUsuario() {

    if (!this.usuario._id) {
      this.validarToken();
    }

    return {...this.usuario};
  }

  login(email: string, password: string) {
    const data = {email, password};
    return new Promise( resolve => {
      this.http.post(`${ URL }/user/login`, data).subscribe( (resp: any) => {
        console.log(resp);
        if (resp.ok) {
          this.guardarToken(resp.token);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  registro(usuario: Usuario) {
    return new Promise( resolve => {
      this.http.post(`${ URL }/user/create`, usuario ).subscribe( (resp: any) => {
        if (resp.ok) {
          this.guardarToken(resp.token);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async cargarToken() {
    this.token =  await this.storage.get('token') || null;
  }

  async validarToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login', {animated: true });
      return Promise.resolve(false);

    }

    return new Promise<boolean>( resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${ URL }/user/`, { headers } ).subscribe( (resp: any) => {
        if (resp.ok) {
          this.usuario = resp.usuario;
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login', {animated: true });
          resolve(false);
        }
      });
    });
  }

  actualizarUsuario(usuario: Usuario): Promise<boolean> {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    return new Promise<boolean>( resolve => {
      this.http.put(`${ URL }(user/update`,  { usuario } , { headers }).subscribe( (resp: any) => {
        if (resp.ok) {
          this.guardarToken(resp.token);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
