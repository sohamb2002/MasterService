import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DdoService {
  private apiUrl = environment.BaseURL; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all DDOs
  getAllDDOs(search:string='',filter:string=''): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"DdoMaster",{
      params: {
        search: search,
        filter: filter
      }
    });
  }

  // Create a new DDO
  createDDO(ddo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ddo);
  }

  // Update an existing DDO
  updateDDO(ddo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${ddo.id}`, ddo);
  }

  // Delete a DDO
  deleteDDO(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}