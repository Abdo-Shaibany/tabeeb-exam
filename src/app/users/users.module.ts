import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';


@NgModule({
  declarations: [UserFormComponent, UsersListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    DropdownModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputIconModule,
  ]
})
export class UsersModule { }
