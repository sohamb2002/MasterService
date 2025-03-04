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
    return this.http.get<any[]>(`${this.apiUrl}FinancialYearMST/FinancialYear`);
  }

  getAllHOAs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}HOA/get-hoa-details`);
  }

  getAllTreasuries(search:string='',filter:string=''): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}TreasuryMaster`,{
      params: {
        search: search,
        filter: filter
      }
    });
  }

  getAllDepartments(search:string='',filter:string=''): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}DepartmentsMaster`,{
      params: {
        search: search,
        filter: filter
      }
    });
  }

  getAllDesignations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}DesignationMaster`);
  }

  getAllMajorHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}MajorHeadsMaster`);
  }

  getAllSubMajorHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SubMajorHeadsMaster`);
  }

  getAllMinorHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}MinorHeadMaster`);
  }

  getAllSchemeHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SchemeHeadsMaster`);
  }

  getAllDetailHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}DetailHeadsMaster`);
  }

  getAllSubDetailHeads(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SubDetailHeadsMaster`);
  }

  getAllSchemeTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SchemeType/get-scheme-types`);
  }

  getAllSubSchemeTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SubSchemeType/get-sub-scheme-types`);
  }

  getAllSAOLevels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}SaoLevelMaster`);
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
