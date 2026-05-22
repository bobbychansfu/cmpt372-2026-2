import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appFav]'
})
export class FavDirective {

  

  constructor() { }

  // @HostBinding('class.favourite') fav = false;
  // @HostListener('click') onMouseClick() {
  //   this.fav = !this.fav;
    
  // }

  @HostBinding('style.background-color') bgcolor:string;
  colors = [
    'AliceBlue','LightGreen','Aqua','LightBlue','LightGrey'
  ]
  i = 0;
  @HostListener('click') changeColor() {
    this.bgcolor = this.colors[this.i];
    this.i = ++this.i % 5
  }


}
