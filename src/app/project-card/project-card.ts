import { Component, input, InputSignal, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'polf-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  url: InputSignal<string> = input('');
  title: InputSignal<string> = input('');
  description: InputSignal<string> = input('');
  picture_url: InputSignal<string> = input('');

  strapiulr = environment.STRAPIURL;

  expanded = signal(false);
  toggle() {
    this.expanded.update((v) => !v);
  }
}
