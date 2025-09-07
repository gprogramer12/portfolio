import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { StrapiDefaultResponse } from '../common.interface';
import { ILogoSlider, LandingOne, LandingTwo, TitleBan } from './landing.interfaces';

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

  getLandingOne(): Observable<LandingOne> {
    return this.http
      .get<StrapiDefaultResponse>(`${environment.STRAPIURL}/api/landing-one`)
      .pipe(map((r: StrapiDefaultResponse) => r.data as LandingOne));
  }

  getLandingTwo(): Observable<LandingTwo> {
    return this.http
      .get<StrapiDefaultResponse>(`${environment.STRAPIURL}/api/landing-two?populate=picture`)
      .pipe(map((r: StrapiDefaultResponse) => r.data as LandingTwo));
  }

  getLogosUrl(): Observable<string[]> {
    return this.http
      .get<StrapiDefaultResponse>(`${environment.STRAPIURL}/api/logo-slider?populate=logos`)
      .pipe(
        map((r: StrapiDefaultResponse) =>
          (r.data as ILogoSlider).logos.map(
            (l) => `${environment.STRAPIURL}${l.url}`,

            catchError(() => of<string[]>([])),
          ),
        ),
      );
  }
}
