import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [
    {
      id: 1,
      name: 'Ana B.',
      email: 'ana@email.com',
      additionalContact: '55 9-1234-5678',
      avatar: '/assets/images/ana.jpg',
      role: 'Desenvolvedor front-end',
      department: 'Software',
      submitsTo: 'Clara D.',
      admittedTo: new Date(),
    },
    {
      id: 2,
      name: 'Clara D.',
      email: 'clara@email.com',
      additionalContact: '55 9-2345-6789',
      avatar: '/assets/images/clara.jpg',
      role: 'Gerente de produção',
      department: 'Software',
      admittedTo: new Date(),
    },
    {
      id: 3,
      name: 'Fábio G.',
      email: 'fabio@email.com',
      additionalContact: 'fabio@infomail.com',
      avatar: '/assets/images/fabio.jpg',
      role: 'Psicólogo',
      department: 'RH',
      submitsTo: 'Talita V.',
      admittedTo: new Date(),
    },
    {
      id: 4,
      name: 'João H.',
      email: 'joao@email.com',
      additionalContact: '55 9-4567-8901',
      avatar: '/assets/images/joao.jpg',
      role: 'Auxiliar administrativo',
      department: 'Administração',
      submitsTo: 'Pedro R.',
      admittedTo: new Date(),
    },
    {
      id: 5,
      name: 'José I.',
      email: 'jose@email.com',
      avatar: '/assets/images/jose.jpg',
      role: 'Desenvolvedor back-end',
      department: 'software',
      submitsTo: 'Clara D.',
      admittedTo: new Date(),
    },
    {
      id: 6,
      name: 'Maria N.',
      email: 'maria@email.com',
      additionalContact: 'maria@infomail.com',
      avatar: '/assets/images/maria.jpg',
      role: 'Secretária',
      department: 'RH',
      submitsTo: 'Talita V.',
      admittedTo: new Date(),
    },
    {
      id: 7,
      name: 'Pedro R.',
      email: 'pedro@email.com',
      additionalContact: '55 9-5678-9012',
      avatar: '/assets/images/pedro.jpg',
      role: 'Gerente',
      department: 'Administração',
      admittedTo: new Date(),
    },
    {
      id: 8,
      name: 'Talita V.',
      email: 'talita@email.com',
      avatar: '/assets/images/talita.jpg',
      role: 'Gerente',
      department: 'RH',
      admittedTo: new Date(),
    },
  ];

  constructor() {}

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  postUser(user: User): Observable<User> {
    const nextId = Math.max(...this.users.map((user) => user.id!), 0) + 1;
    user.id = nextId;
    this.users.push(user);
    return of(user);
  }

  getUser(userId: number): Observable<User> {
    const user: User = this.users.filter((user) => user.id === userId)[0];
    return of(user);
  }

  updateUser(userId: number, user: User): Observable<User> {
    user.id = userId;
    this.users = this.users.map((userIterator) =>
      userIterator.id === userId ? user : userIterator
    );
    return of(user);
  }

  deleteUser(userId: number): Observable<number> {
    this.users = this.users.filter((user) => user.id !== userId);
    return of(userId);
  }
}
