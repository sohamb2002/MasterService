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
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    ProgressSpinnerModule
  ],
  providers: [CommonService],
  templateUrl: './treasury.component.html',
  styleUrls: ['./treasury.component.scss']
})
export class TreasuryComponent implements OnInit {
  items: any[] = [];
  loading: boolean = false;
  searchQuery: string = '';
  selectedFilter: string = '';
  isEditMode: boolean = false;
  item: any = {};
  displayDialog: boolean = false;
  saving: boolean = false; // To prevent multiple clicks

  filterOptions = [
    { label: 'All', value: '' },
    { label: 'Code', value: 'code' },
    { label: 'Officer Name', value: 'officerName' },
    { label: 'District Name', value: 'districtName' },
    { label: 'Treasury Name', value: 'treasuryName' }
  ];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.loading = true;
    
    this.commonService.getAllTreasuries(this.searchQuery, this.selectedFilter).subscribe({
      next: (data) => {
        this.items = (data || [])
          .filter((item: any) => !item.isDeleted)
          .sort((a: { id: number }, b: { id: number }) => a.id - b.id);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching treasury data:', error);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch data. Please try again later.',
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

//   openDialog(isEdit: boolean = false, index?: number): void {
//     this.isEditMode = isEdit;
//     this.displayDialog = true;

//     if (isEdit && index !== undefined && this.items[index]) {
//       this.item = { ...this.items[index] };
//     } else {
//       this.item = {
//         code: '',
//         treasuryName: '',
//         officerName: '',
//         address: '',
//         districtCode: ''
//       };
//     }
//   }

//   saveTreasury(): void {
//     if (this.saving) return; // Prevent duplicate clicks
//     this.saving = true;

//     const request = this.isEditMode
//       ? this.commonService.updateTreasury(this.item.id, this.item)
//       : this.commonService.createTreasury(this.item);

//     request.subscribe({
//       next: () => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: this.isEditMode ? 'Treasury updated successfully!' : 'Treasury added successfully!',
//         });
//         this.displayDialog = false;
//         this.fetchItems();
//       },
//       error: (error) => {
//         console.error('Error saving treasury:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: 'Failed to save treasury. Please try again.',
//         });
//       },
//       complete: () => {
//         this.saving = false;
//       }
//     });
//   }
}
