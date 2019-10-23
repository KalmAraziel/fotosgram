import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  post: Post = {
    mensaje: '',
    coords: null    
  };
  cargadoPosicion = false;
  tempImages: string[] = [];

  constructor(
    private postService: PostsService,
    private route: Router,
    private geolocation: Geolocation,
    private camera: Camera
    ) {}
  
  async crearPost() {
    const creado = await this.postService.crearPost(this.post);
    if (creado) {
      this.post = {
        mensaje: '',
        coords: null    
      };
      this.tempImages = [];
      this.route.navigateByUrl('main/tabs/tab1');
    } else {


    }    
  }

  async getPosicion() {
    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }
    // mustro loading
    this.cargadoPosicion = true;
    // obtendo posicion desde el dispositivo
    await this.geolocation.getCurrentPosition().then( (resp) => {      
      const coords = `${ resp.coords.latitude }, ${ resp.coords.longitude  }`;
      console.log('coors: ',coords);
      this.post.coords = coords;
      this.cargadoPosicion = false;
    }).catch((error) => {
       console.log('Error al obtener la posición', error);
       this.cargadoPosicion = false;
    });
    
    console.log('post: ', this.post);
    
  }

  abrirCamara() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.procesarImagen(options);
    
  }

  abrirLibreria() {
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.procesarImagen(options);
  }

  procesarImagen(optionCamara: CameraOptions) {
    this.camera.getPicture(optionCamara).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img);
      this.postService.subirImagen(imageData);
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }
}
