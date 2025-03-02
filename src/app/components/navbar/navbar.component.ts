import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home', icon: 'pi pi-home', command: () => this.router.navigate(['/'])
      },
      {
        label: 'Master Data',
        icon: 'pi pi-folder',
        items: [
          { label: 'SAO', icon: 'pi pi-user', command: () => this.router.navigate(['/master/sao']) },
          { label: 'DDO', icon: 'pi pi-user', command: () => this.router.navigate(['/master/ddo']) },
          { label: 'Financial Year', icon: 'pi pi-calendar', command: () => this.router.navigate(['/master/financial-year']) },
          { label: 'Treasury', icon: 'pi pi-wallet', command: () => this.router.navigate(['/master/treasury']) },
          { label: 'Department', icon: 'pi pi-building', command: () => this.router.navigate(['/master/department']) }
        ]
      },
      {
        label: 'Head Management',
        icon: 'pi pi-list',
        items: [
          { label: 'Major Head', icon: 'pi pi-folder', command: () => this.router.navigate(['/master/major-head']) },
          { label: 'Sub Major Head', icon: 'pi pi-folder-open', command: () => this.router.navigate(['/master/sub-major-head']) },
          { label: 'Minor Head', icon: 'pi pi-file', command: () => this.router.navigate(['/master/minor-head']) },
          { label: 'Scheme Head', icon: 'pi pi-briefcase', command: () => this.router.navigate(['/master/scheme-head']) },
          { label: 'Detail Head', icon: 'pi pi-info-circle', command: () => this.router.navigate(['/master/detail-head']) }
        ]
      },
      {
        label: 'Scheme Management',
        icon: 'pi pi-sitemap',
        items: [
          { label: 'Scheme Type', icon: 'pi pi-cog', command: () => this.router.navigate(['/master/scheme-type']) },
          { label: 'Sub Scheme Type', icon: 'pi pi-map', command: () => this.router.navigate(['/master/sub-scheme-type']) },
          { label: 'SAO Level', icon: 'pi pi-sort-alt', command: () => this.router.navigate(['/master/sao-level']) },
          { label: 'Admissible Reappropriation', icon: 'pi pi-check-circle', command: () => this.router.navigate(['/master/admissible-reappropriation']) }
        ]
      },
      {
        label: 'Banking',
        icon: 'pi pi-credit-card',
        items: [
          { label: 'Bank', icon: 'pi pi-credit-card', command: () => this.router.navigate(['/master/bank']) },
          { label: 'IFSC', icon: 'pi pi-hashtag', command: () => this.router.navigate(['/master/ifsc']) }
        ]
      }
    ];
  }

  onLogout() {
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
