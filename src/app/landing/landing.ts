import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';
import { Onespinner } from '../onespinner/onespinner';
import { LandingService } from './landing.service';

@Component({
  selector: 'polf-landing',
  imports: [CommonModule, Onespinner],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  private readonly landingService = inject(LandingService);

  strapiUrl = environment.STRAPIURL;

  titleBan = toSignal(this.landingService.getTitleBan());
}
