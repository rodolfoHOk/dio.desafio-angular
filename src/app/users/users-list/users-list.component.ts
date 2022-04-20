import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user';

const users: User[] = [
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

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'user details',
    'role',
    'department',
    'submits to',
    'actions',
  ];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<User>(users);
  }

  ngAfterViewInit(): void {
    this.dataSource!.paginator = this.paginator;
    this.dataSource!.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
