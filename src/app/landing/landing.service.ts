import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StrapiDefaultResponse } from '../common.interface';
import { TitleBan } from './landing.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  private readonly http = inject(HttpClient);

  getTitleBan(): Observable<TitleBan> {
    return this.http
      .get<StrapiDefaultResponse>(`${environment.STRAPIURL}/api/title-ban?populate=profile_picture`)
      .pipe(map((r: StrapiDefaultResponse) => r.data as TitleBan));
  }
}
