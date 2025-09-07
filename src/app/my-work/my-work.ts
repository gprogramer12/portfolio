import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectCard } from '../project-card/project-card';
import { MyWorkService } from './my-work.service';

@Component({
  selector: 'polf-my-work',
  imports: [ProjectCard],
  templateUrl: './my-work.html',
  styleUrl: './my-work.scss',
})
export class MyWork {
  private readonly myWorkService = inject(MyWorkService);

  projects = toSignal(this.myWorkService.getProjects(), { initialValue: [] });
}
