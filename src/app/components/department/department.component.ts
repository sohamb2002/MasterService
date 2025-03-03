import { Component } from '@angular/core';
import { CommonService } from '../../service/common.service';
import Swal from 'sweetalert2';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [TableModule, ProgressSpinnerModule, CommonModule, HttpClientModule],
  providers: [CommonService],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss'
})
export class DepartmentComponent {
  departments: any[] = [];
  loading: boolean = false;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    this.loading = true;

    this.commonService.getAllDepartments().subscribe({
      next: (data) => {
        this.departments = data
          .filter((dept: any) => !dept.isDeleted)
          .sort((a: { id: number }, b: { id: number }) => a.id - b.id);

        this.loading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch departments. Please try again.',
        });
      }
    });
  }
}
