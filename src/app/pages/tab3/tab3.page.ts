import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  usuario: Usuario = {};
  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    console.log(this.usuario);
  }

  async actualizar(fActualizar: NgForm) {

    if (fActualizar.invalid) {
      return;
    }
    
    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
    console.log(actualizado, this.usuario);
    if(actualizado) {
      this.uiService.presentToast('Registro Actualizado');
    } else {
      this.uiService.presentToast('Error al actualizar Usuario');
    }
  }

  logout() {
    console.log('salirrr');
    this.postService.paginaPost = 0;
    this.usuarioService.logout();
  }
}
