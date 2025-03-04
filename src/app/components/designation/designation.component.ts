import { Component } from '@angular/core';
import { CommonService } from '../../service/common.service';
import Swal from 'sweetalert2';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [TableModule, ProgressSpinnerModule, CommonModule, HttpClientModule,FormsModule,DropdownModule],
  providers: [CommonService],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.scss'
})
export class DesignationComponent {
items: any[] = [];
  loading: boolean = false;
  searchQuery: string ='';
  selectedFilter: string ='';
  filterOptions: any[] = [
    { label: 'Designation', value: 'name' },
  ];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.fetchDesignations();
  }

  fetchDesignations(): void {
    this.loading = true;
  
    this.commonService.getAllDesignations(this.searchQuery,this.selectedFilter).subscribe({
      next: (response: any) => {
        // Extract the `result` array from the response
        const data = Array.isArray(response) ? response : response?.data || [];
  
        // Check if `data` is an array
        if (!Array.isArray(data)) {
          console.error("Unexpected response format:", response);
          this.items = [];
          this.loading = false;
          return;
        }
  
        // Process the valid array
        this.items = data
          .filter((item: any) => !item.isDeleted)
          .sort((a: { id: number }, b: { id: number }) => a.id - b.id);
  
        this.loading = false;
      },
      error: (error) => {
        console.error("There was an error!", error);
        this.loading = false;
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to fetch SAO levels. Please try again.",
        });
      },
    });
  }
  onSearchChange(): void {
    this.fetchDesignations();
  }

  onFilterChange(): void {
    this.fetchDesignations();
  }
}
