import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  InputSignal,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LandingService } from '../landing/landing.service';

@Component({
  selector: 'polf-logoslider',
  standalone: true,
  imports: [],
  host: { class: 'block' },
  templateUrl: './logoslider.html',
  styleUrl: './logoslider.scss',
})
export class Logoslider implements OnInit, OnDestroy {
  private readonly landingService = inject(LandingService);

  // Inputs (signals)
  images = toSignal(this.landingService.getLogosUrl(), { initialValue: [] });
  intervalMs: InputSignal<number> = input(2000);
  transitionMs: InputSignal<number> = input(500);

  // State
  current = signal(0);
  prev = signal(0);
  transitioning = signal(false);

  // Prevent transition during SSR → enable after client hydration
  hydrated = signal(false);

  // SSR / platform
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Timers (SSR-safe types)
  private timerId: ReturnType<typeof setInterval> | undefined;
  private blurTimerId: ReturnType<typeof setTimeout> | undefined;
  private hydrateTick: ReturnType<typeof setTimeout> | undefined;

  ngOnInit() {
    if (!this.isBrowser) {
      return;
    }

    // Enable transitions only after first client tick (prevents hydration flicker)
    this.hydrateTick = setTimeout(() => this.hydrated.set(true), 0);

    if (this.images().length <= 1) return;

    // Preload next
    this.preload((this.current() + 1) % this.images().length);

    this.timerId = setInterval(() => {
      this.prev.set(this.current());
      this.current.set((this.current() + 1) % this.images().length);
      this.transitioning.set(true);

      // Preload next-next
      this.preload((this.current() + 1) % this.images().length);

      clearTimeout(this.blurTimerId);
      this.blurTimerId = setTimeout(() => this.transitioning.set(false), this.transitionMs());
    }, this.intervalMs());
  }

  ngOnDestroy() {
    if (this.timerId) clearInterval(this.timerId);
    if (this.blurTimerId) clearTimeout(this.blurTimerId);
    if (this.hydrateTick) clearTimeout(this.hydrateTick);
  }

  // Template helpers
  isActive = (i: number) => computed(() => i === this.current());
  isPrev = (i: number) => computed(() => i === this.prev());

  private preload(idx: number) {
    if (!this.isBrowser) return; // guard for SSR
    const src = this.images()[idx];
    if (!src) return;
    const img = new Image();
    img.src = src;
  }
}
