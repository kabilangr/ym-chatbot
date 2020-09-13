import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuList } from './menu';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  getMenu(): Observable<MenuList[]> {
    return this.http.get<MenuList[]>('http://localhost:8080/v1/menu/a');
  }
  constructor(private http: HttpClient) {}
}
