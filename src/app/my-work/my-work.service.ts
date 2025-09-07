import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StrapiDefaultResponse } from '../common.interface';
import { IProject } from './my-work.interface';

@Injectable({
  providedIn: 'root',
})
export class MyWorkService {
  private readonly http = inject(HttpClient);

  getProjects(): Observable<IProject[]> {
    return this.http
      .get<StrapiDefaultResponse>(`${environment.STRAPIURL}/api/projects?populate=picture`)
      .pipe(map((r: StrapiDefaultResponse) => r.data as IProject[]));
  }
}
