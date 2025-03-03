import { Component } from '@angular/core';
import { CommonService } from '../../service/common.service';
import Swal from 'sweetalert2';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-treasury',
  standalone: true,
  imports: [TableModule, ProgressSpinnerModule,CommonModule,HttpClientModule],
  providers: [CommonService],
  templateUrl: './treasury.component.html',
  styleUrl: './treasury.component.scss'
})
export class TreasuryComponent {
  items: any[] = [];
  loading: boolean = false;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems(): void {
    this.loading = true;

    this.commonService.getAllTreasuries().subscribe({
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
}
