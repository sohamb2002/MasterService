import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { SaoService } from '../../service/sao.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SaoCodes } from './sao-codes.enum';

@Component({
  selector: 'app-sao',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    ProgressSpinnerModule,
    DropdownModule,
  ],
  providers: [SaoService],
  templateUrl: './sao.component.html',
  styleUrls: ['./sao.component.scss'],
})
export class SaoComponent implements OnInit {
  saos: any[] = [];
  displayDialog: boolean = false;
  isEditMode: boolean = false;
  sao: any = {};
  loading: boolean = false;
  saoCodes = Object.values(SaoCodes);
  searchQuery: string = '';
  selectedFilter: string = '';
  selectedLevel: number | null = null;

  filterOptions: any[] = [
    { label: 'All', value: '' },
    { label: 'Code', value: 'code' },
    { label: 'Name', value: 'name' },
    { label: 'Next Level Code', value: 'nextLevelCode' },
  ];
  levelOptions: any[] = [
    {label:'ALL',value:null},
    {label:'HOD',value:2},
    {label:'RO',value:3},
    {label:'DO',value:4},
    {label:'SDO',value:5}
  ]

  constructor(private saoService: SaoService) {}

  ngOnInit(): void {
    this.fetchSaos();
  }

  fetchSaos(): void {
    this.loading = true;

    this.saoService.getAllany(this.searchQuery, this.selectedFilter).subscribe({
      next: (data) => {
        this.saos = data
          .filter((sao: any) => !sao.isDeleted)
          .sort((a: { id: number }, b: { id: number }) => a.id - b.id);

        this.loading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch SAOs. Please try again.',
        });
      },
    });
  }

  onSearchChange(): void {
    this.fetchSaos();
  }

  onFilterChange(): void {
    this.fetchSaos();
  }
  onLevelChange(): void {
    this.loading = true;
  
    if (this.selectedLevel === null) { // 👈 Check if "All" is selected
      this.fetchSaos(); // Fetch all SAOs when "All" is selected
    } else {
      this.saoService.getSaosByLevel(this.selectedLevel).subscribe({
        next: (response: any) => {
          // Ensure response follows expected structure
          const saosData = response?.result ?? []; // Extract result safely
  
          this.saos = saosData
            .filter((sao: any) => !sao.isDeleted)
            .sort((a: { id: number }, b: { id: number }) => a.id - b.id);
  
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error fetching SAOs by level:', error);
          this.loading = false;
  
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to fetch SAOs by level. Please try again.',
          });
        },
      });
    }
  }
  
  openDialog(isEdit: boolean = false, index?: number): void {
    this.isEditMode = isEdit;
    this.displayDialog = true;

    if (isEdit && index !== undefined) {
      const selectedSao = this.saos[index];
      this.sao = {
        id: selectedSao.id,
        code: selectedSao.code,
        name: selectedSao.name,
        nextLevelCode: selectedSao.nextLevelCode,
      };
    } else {
      this.sao = {
        code: '',
        name: '',
        nextLevelCode: '',
      };
    }
  }

  deleteSao(index: number): void {
    const saoId = this.saos[index].id;
    const deletedSao = this.saos[index]; // Store for rollback

    this.saos.splice(index, 1); // Optimistically update UI

    this.saoService.softDeleteSao(saoId).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'SAO deleted successfully.',
        });
      },
      error: (error) => {
        console.error('Error deleting SAO:', error);
        this.saos.splice(index, 0, deletedSao); // Rollback UI change
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete SAO. Please try again.',
        });
      },
    });
  }

  saveSao(): void {
    if (this.isEditMode) {
      this.saoService.UpdateSao(this.sao).subscribe({
        next: (updatedSao) => {
          const index = this.saos.findIndex((s) => s.id === updatedSao.id);

          if (index !== -1) {
            this.saos[index] = updatedSao;
          }
          this.displayDialog = false;
          this.sao = {};
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'SAO updated successfully.',
          });
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Error updating SAO:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to update SAO. Please try again.',
          });
        },
      });
    } else {
      this.saoService.AddSao(this.sao).subscribe({
        next: (newSao) => {
          this.saos.push(newSao);
          this.displayDialog = false;
          this.sao = {};
          Swal.fire({
            icon: 'success',
            title: 'Created!',
            text: 'SAO created successfully.',
          });
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Error creating SAO:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to create SAO. Please try again.',
          });
        },
      });
    }
  }
}