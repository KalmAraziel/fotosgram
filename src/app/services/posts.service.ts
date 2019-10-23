import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPost, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  paginaPost = 0;  
  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private userService: UsuarioService,
    private fileTransfer: FileTransfer) { 
    
  }

  getPosts(pull: boolean = false){
    if (pull) {
      this.paginaPost = 0;
    }
    this.paginaPost ++;
    return this.http.get<RespuestaPost>(`${ URL }/post?pagina=${ this.paginaPost }`);
  }

  crearPost(post: Post): Promise<Boolean> {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    console.log('postCrear:', post);
    return new Promise<boolean>(resolve => {
      this.http.post(`${ URL }/post`, post,  { headers }).subscribe( (resp: any) => {
        if (resp.ok) {
          console.log('respuesta: ',resp);
          this.nuevoPost.emit(resp.post);
          resolve(true);
        } else {
          resolve(false);
        }
      });
      
    });
  }
  // Cualquier archivo  
  subirImagen(img: string) {
    
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.userService.token
      }
    };
    
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
      fileTransfer.upload(img, `${ URL }/post/upload`, options).then( data => {
    }).catch(err => { console.log('error', err) });

  }
}
