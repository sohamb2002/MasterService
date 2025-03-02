import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private apiUrl = environment.BaseURL; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getAllFinancialYears(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}FinancialYearMaster`);
  }

  getAllHOAs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}HOAMaster`);
  }

  getAllTreasuries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}TreasuryMaster`);
  }

  getAllDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Department`);
  }

  getAllDesignations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Designation`);
  }

  getAllMajorHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}MajorHead`);
  }

  getAllSubMajorHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SubMajorHead`);
  }

  getAllMinorHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}MinorHead`);
  }

  getAllSchemeHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SchemeHead`);
  }

  getAllDetailHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}DetailHead`);
  }

  getAllSubDetailHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SubDetailHead`);
  }

  getAllSchemeTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SchemeType`);
  }

  getAllSubSchemeTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SubSchemeType`);
  }

  getAllSAOLevels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SAOLevelMaster`);
  }

  getAllAdmissibleReappropriations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}AdmissibleReappropriationMaster`);
  }

  getAllMajorHeadRanges(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}MajorHeadRangeByType`);
  }

  getAllBanks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}BankMaster`);
  }

  getAllIFSCs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}IFSCMaster`);
  }
}
