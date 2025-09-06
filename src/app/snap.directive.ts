import { AfterViewInit, Directive, ElementRef, HostListener, inject, Input } from '@angular/core';

@Directive({
  selector: '[polfSnapScroll]',
})
export class SnapScrollDirective implements AfterViewInit {
  @Input() snapPanelsSelector = 'section';
  @Input() animationMs = 700;

  private panels: HTMLElement[] = [];
  private isAnimating = false;
  private rafId: number | null = null;
  private el: ElementRef<HTMLElement> = inject(ElementRef);

  ngAfterViewInit() {
    const root = this.el.nativeElement;
    // Ensure this element is the scroll container
    root.style.overflowY = root.style.overflowY || 'auto';
    // Avoid CSS smooth interfering with our tween
    root.style.scrollBehavior = 'auto';

    this.panels = Array.from(root.querySelectorAll(this.snapPanelsSelector)) as HTMLElement[];
  }

  private indexFromScroll(): number {
    const y = this.el.nativeElement.scrollTop;
    const h = this.el.nativeElement.clientHeight;
    return Math.round(y / h);
  }

  private easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private animateScrollTo(targetTop: number, duration: number) {
    const root = this.el.nativeElement;
    const startTop = root.scrollTop;
    const delta = targetTop - startTop;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = this.easeInOutCubic(t);
      root.scrollTop = startTop + delta * eased;

      if (t < 1) {
        this.rafId = requestAnimationFrame(tick);
      } else {
        this.isAnimating = false;
        this.rafId = null;
      }
    };

    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.isAnimating = true;
    this.rafId = requestAnimationFrame(tick);
  }

  private gotoPanel(i: number) {
    const root = this.el.nativeElement;
    const clamped = Math.max(0, Math.min(i, this.panels.length - 1));
    const panel = this.panels[clamped];
    if (!panel) return;

    // panel offset relative to the scroll container
    const targetTop = panel.offsetTop - root.offsetTop; // works when panels are direct children
    this.animateScrollTo(targetTop, this.animationMs);
  }

  @HostListener('wheel', ['$event'])
  onWheel(e: WheelEvent) {
    if (this.isAnimating) {
      e.preventDefault();
      return;
    }
    const dir = Math.sign(e.deltaY);
    if (!dir) return;
    e.preventDefault();
    this.gotoPanel(this.indexFromScroll() + (dir > 0 ? 1 : -1));
  }

  @HostListener('keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (this.isAnimating) return;
    if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
      e.preventDefault();
      this.gotoPanel(this.indexFromScroll() + 1);
    } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      this.gotoPanel(this.indexFromScroll() - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.gotoPanel(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      this.gotoPanel(this.panels.length - 1);
    }
  }
}
