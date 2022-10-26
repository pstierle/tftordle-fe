import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";

@Directive({
  selector: "[showAfter]",
})
export class ShowAfterDirective implements OnInit {
  @Input() delay: number = 0;
  @Output() onShow = new EventEmitter<void>();
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.display = "none";
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.style.display = "flex";
      this.onShow.emit();
    }, this.delay);
  }
}
