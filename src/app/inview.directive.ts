import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  afterNextRender,
  inject,
} from '@angular/core';

@Directive({
  selector: '[polfInView]',
})
export class PolfInViewDirective implements OnDestroy {
  @Input('polfInView') activeClass = 'in-view';
  @Input() rootMargin = '-45% 0px -45% 0px'; // band around viewport middle

  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private r = inject(Renderer2);
  private zone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private io?: IntersectionObserver;

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        this.attachScrollFallback();
        return;
      }

      this.zone.runOutsideAngular(() => {
        this.io = new IntersectionObserver(
          ([entry]) => {
            // Only re-enter Angular when we need to touch the DOM state
            this.zone.run(() => {
              if (entry.isIntersecting) {
                this.r.addClass(this.el.nativeElement, this.activeClass);
              }
            });
          },
          { root: null, rootMargin: this.rootMargin, threshold: 0 },
        );

        this.io.observe(this.el.nativeElement);
      });
    });
  }

  // Fallback for older browsers or unusual environments
  private onScroll = () => {
    if (!isPlatformBrowser(this.platformId)) return;

    const rect = this.el.nativeElement.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const mid = vh / 2;
    const center = rect.top + rect.height / 2;
    const nearMiddle = Math.abs(center - mid) <= vh * 0.05; // ±5% band
    if (nearMiddle) this.r.addClass(this.el.nativeElement, this.activeClass);
  };

  private attachScrollFallback() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.onScroll();
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll);
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.io?.disconnect();
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
  }
}
