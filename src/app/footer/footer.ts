import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PolfInViewDirective } from '../inview.directive';
import { Logoslider } from '../logoslider/logoslider';
import { FooterSerivce } from './footer.serivce';

@Component({
  selector: 'polf-footer',
  imports: [CommonModule, PolfInViewDirective, Logoslider],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly footerService = inject(FooterSerivce);

  footerInfo = toSignal(this.footerService.getFooter());
}
