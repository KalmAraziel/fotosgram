import { NgModule } from '@angular/core';
import { DomSaniPipe } from './dom-sani.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [DomSaniPipe, ImageSanitizerPipe, ImagenPipe],
  exports: [
    DomSaniPipe,
    ImageSanitizerPipe,
    ImagenPipe
  ]
})
export class PipesModule { }
