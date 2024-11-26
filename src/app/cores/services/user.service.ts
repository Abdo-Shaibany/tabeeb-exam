import { Injectable } from '@angular/core';
import { User } from '../modesl/user.model';

import { BehaviorSubject } from 'rxjs';
import { Request } from '../modesl/reqest.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() { }

  addUser(input: User): void {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, input]);
  }

  updateUser(input: User): void {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.map((user) =>
      user.id === input.id ? { ...user, ...input } : user
    );
    this.usersSubject.next(updatedUsers);
  }

  deleteUser(id: number): void {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.filter((user) => user.id !== id);
    this.usersSubject.next(updatedUsers);
  }

  getUsers(query: Request): User[] {
    let filteredUsers = this.usersSubject.value;

    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredUsers = filteredUsers.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        )
      );
    }

    if (query.filter) {
      filteredUsers = filteredUsers.filter((user) =>
        String(user[query.filter!.key as keyof User])
          .toLowerCase()
          .includes(query.filter!.value.toLowerCase())
      );
    }

    if (query.sort) {
      const { key, value } = query.sort;
      filteredUsers = filteredUsers.sort((a, b) => {
        const comparison =
          String(a[key as keyof User]).localeCompare(String(b[key as keyof User]));
        return value === 'asc' ? comparison : -comparison;
      });
    }

    if (query.pagination) {
      const { currentPage, pageSize } = query.pagination;
      const startIndex = (currentPage - 1) * pageSize;
      filteredUsers = filteredUsers.slice(startIndex, startIndex + pageSize);
    }

    return filteredUsers;
  }
}

