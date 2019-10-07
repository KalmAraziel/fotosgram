import { NgModule } from '@angular/core';
import { DomSaniPipe } from './dom-sani.pipe';



@NgModule({
  declarations: [DomSaniPipe],
  exports: [
    DomSaniPipe
  ]
})
export class PipesModule { }
