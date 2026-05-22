import { Directive,HostBinding,HostListener } from '@angular/core';

@Directive({
  selector: '[appColors]'
})
export class ColorsDirective {

  constructor() { }

  @HostBinding('style.background-color') bgcolor:string;  // attr.role role:string ; style.width.px:number ; class.someClass condition:boolean
  colors = [
    'AliceBlue','LightGreen','Aqua','LightBlue','LightGrey','White'
  ]
  i = 0;
  @HostListener('click') changeColor() {
    this.bgcolor = this.colors[this.i];
    this.i = ++this.i % this.colors.length
  }

}

// ng g directive --skip-tests=true colors