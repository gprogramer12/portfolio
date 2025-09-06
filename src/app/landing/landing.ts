import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';
import { PolfInViewDirective } from '../inview.directive';
import { Logoslider } from '../logoslider/logoslider';
import { Onespinner } from '../onespinner/onespinner';
import { SnapScrollDirective } from '../snap.directive';
import { LandingService } from './landing.service';

@Component({
  selector: 'polf-landing',
  imports: [
    CommonModule,
    Onespinner,
    Logoslider,
    Logoslider,
    SnapScrollDirective,
    PolfInViewDirective,
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  private readonly landingService = inject(LandingService);

  strapiUrl = environment.STRAPIURL;

  titleBan = toSignal(this.landingService.getTitleBan());
  landingOne = toSignal(this.landingService.getLandingOne());
}
