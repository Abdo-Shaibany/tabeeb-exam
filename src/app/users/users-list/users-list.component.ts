import { Component } from '@angular/core';
import { User } from '../../cores/modesl/user.model';
import { UserService } from '../../cores/services/user.service';
import { Request } from '../../cores/modesl/reqest.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users: User[] = [];
  totalUsers = 0;
  rowsPerPage = 10;

  searchTerm = '';
  selectedRole: string | null = null;
  selectedStatus: string | null = null;
  sortField: string | null = null;
  sortOrder: number = 1;

  roles = [
    { label: 'All Roles', value: null },
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' },
    { label: 'Guest', value: 'Guest' },
  ];
  statuses = [
    { label: 'All Statuses', value: null },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.userService.users$.subscribe({
      next: (res) => {
        this.totalUsers = res.length;
      }
    });
  }

  loadUsers(page = 1): void {
    const request: Request = {
      pagination: {
        pageSize: this.rowsPerPage,
        currentPage: page,
      },
      filter: {
        key: this.selectedRole ? 'role' : this.selectedStatus ? 'status' : '',
        value: this.selectedRole || this.selectedStatus || '',
      },
      sort: this.sortField
        ? {
          key: this.sortField,
          value: this.sortOrder === 1 ? 'asc' : 'desc',
        }
        : undefined,
      search: this.searchTerm,
    };

    // Get users from service
    const users = this.userService.getUsers(request);
    this.users = users;
  }

  onSearch(): void {
    this.loadUsers();
  }

  onFilterChange(): void {
    this.loadUsers();
  }

  onSort(event: any): void {
    this.sortField = event.field;
    this.sortOrder = event.order;
    this.loadUsers();
  }

  onPage(event: any): void {
    this.rowsPerPage = event.rows;
    const currentPage = event.page + 1;
    this.loadUsers(currentPage);
  }

  editUser(user: User): void {
    console.log('Edit User:', user);
    // Implement edit logic
  }

  removeUser(userId: number): void {
    this.userService.deleteUser(userId);
    this.loadUsers();
  }
}
