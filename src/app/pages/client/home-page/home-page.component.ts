import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  items: any[];

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.items = Array(6).fill(0);
  }

  private counter = 1;
  private timerIdRef: any;

  ngOnInit(): void {
    this.timerIdRef = setInterval(() => {
      const radioCheck = this.elementRef.nativeElement.querySelector(
        `#radio${this.counter}`
      ) as HTMLInputElement;
      if (radioCheck) {
        radioCheck.checked = true;
        this.counter++;
        if (this.counter > 5) {
          this.counter = 1;
        }
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerIdRef);
  }
}
