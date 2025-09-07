import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StrapiDefaultResponse } from '../common.interface';
import { IFooter } from './footer.interfaces';

@Injectable({
  providedIn: 'root',
})
export class FooterSerivce {
  private readonly http = inject(HttpClient);

  getFooter(): Observable<IFooter> {
    return this.http
      .get<StrapiDefaultResponse>(`${environment.STRAPIURL}/api/footer`)
      .pipe(map((r: StrapiDefaultResponse) => r.data as IFooter));
  }
}
