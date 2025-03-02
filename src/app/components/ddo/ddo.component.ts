import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DdoService } from '../../service/ddo.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-ddo',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    ProgressSpinnerModule,
  ],
  providers: [DdoService],
  templateUrl: './ddo.component.html',
  styleUrls: ['./ddo.component.scss'],
})
export class DdoComponent implements OnInit {
  ddoList: any[] = []; // List of DDOs
  displayDialog: boolean = false; // Controls dialog visibility
  isEditMode: boolean = false; // Tracks if dialog is in edit mode
  ddo: any = {}; // Current DDO being edited/created
  loading: boolean = false; // Loading state

  constructor(private ddoService: DdoService) {}

  ngOnInit(): void {
    this.fetchDDOs();
  }

  // Fetch DDOs from the backend
  fetchDDOs(): void {
    this.loading = true;
    this.ddoService.getAllDDOs().subscribe({
      next: (data) => {
        this.ddoList = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching DDOs:', error);
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to fetch DDOs. Please try again.',
        });
      },
    });
  }

  // Open dialog for create/edit
  openDialog(isEdit: boolean = false, index?: number): void {
    this.isEditMode = isEdit;
    this.displayDialog = true;

    if (isEdit && index !== undefined) {
      const selectedDDO = this.ddoList[index];
      this.ddo = { ...selectedDDO }; // Copy selected DDO for editing
    } else {
      this.ddo = {}; // Reset for create mode
    }
  }

  // Delete a DDO
  deleteDDO(index: number): void {
    const ddoId = this.ddoList[index].id;
    const deletedDDO = this.ddoList[index]; // Store for rollback

    this.ddoList.splice(index, 1); // Optimistically update UI

    this.ddoService.deleteDDO(ddoId).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'DDO deleted successfully.',
        });
      },
      error: (error) => {
        console.error('Error deleting DDO:', error);
        this.ddoList.splice(index, 0, deletedDDO); // Rollback UI change
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete DDO. Please try again.',
        });
      },
    });
  }

  // Save DDO (create or update)
  saveDDO(): void {
    if (this.isEditMode) {
      this.ddoService.updateDDO(this.ddo).subscribe({
        next: (updatedDDO) => {
          const index = this.ddoList.findIndex((d) => d.id === updatedDDO.id);
          if (index !== -1) {
            this.ddoList[index] = updatedDDO; // Update the list
          }
          this.displayDialog = false;
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'DDO updated successfully.',
          });
        },
        error: (error) => {
          console.error('Error updating DDO:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to update DDO. Please try again.',
          });
        },
      });
    } else {
      this.ddoService.createDDO(this.ddo).subscribe({
        next: (newDDO) => {
          this.ddoList.push(newDDO); // Add new DDO to the list
          this.displayDialog = false;
          Swal.fire({
            icon: 'success',
            title: 'Created!',
            text: 'DDO created successfully.',
          });
        },
        error: (error) => {
          console.error('Error creating DDO:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to create DDO. Please try again.',
          });
        },
      });
    }
  }
}