import { Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {
  private GRAY_COLOR="#CED0BC";
  private PINK_COLOR="#33B8FF";
  @Input('appBorderCard')borderColor;

  private setBorder(color:string){
    const border = 'solid 4px'+ color;
    this.element.nativeElement.style.border=border;
  }

  private setHeight(height:number){
    this.element.nativeElement.style.height=height+'px';
  }

  constructor(private element: ElementRef) { 
    this.setBorder(this.GRAY_COLOR);
    this.setHeight(180);
  }

  @HostListener('mouseenter')onMouseEnter(){
    this.setBorder(this.borderColor || this.PINK_COLOR);
  }

  @HostListener('mouseleave')onMouseLeave(){
    this.setBorder(this.GRAY_COLOR);
  }

  

}
