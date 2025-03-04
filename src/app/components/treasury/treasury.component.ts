import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonService } from '../../service/common.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-treasury',
  standalone: true,
  imports: [TableModule, ProgressSpinnerModule,CommonModule,HttpClientModule,DropdownModule,ButtonModule,TableModule,DialogModule,ProgressSpinnerModule,FormsModule],
  providers: [CommonService],
  templateUrl: './treasury.component.html',
  styleUrl: './treasury.component.scss'
})
export class TreasuryComponent {
  items: any[] = [];
  loading: boolean = false;
  searchQuery: string = '';
  selectedFilter: string = '';
  filterOptions: any[] = [
    { label: 'All', value: '' },
    { label: 'Code', value: 'code' },
    { label: 'OfficerName', value: 'officername' },
    {label:'DistrictName', value: 'districtname'},
    {label:'TreasuryName', value: 'treasuryname'}
  ];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.loading = true;

    this.commonService.getAllTreasuries(this.searchQuery,this.selectedFilter).subscribe({
      next: (data) => {
        this.items = data
          .filter((item: any) => !item.isDeleted)
          .sort((a: { id: number }, b: { id: number }) => a.id - b.id);

        this.loading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch data. Please try again.',
        });
      }
    });
  }


  onSearchChange(): void {
    this.fetchItems();
  }

  onFilterChange(): void {
    this.fetchItems();
  }
}
