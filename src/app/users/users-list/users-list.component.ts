import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

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

  @ViewChild('userTable') userTable!: MatTable<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  users: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.dataSource = new MatTableDataSource<User>(this.users);
  }

  ngAfterViewInit(): void {
    this.dataSource!.paginator = this.paginator;
    this.dataSource!.sort = this.sort;
  }

  fetchUsers(): void {
    this.userService
      .getUsers()
      .subscribe((response) => (this.users = response));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDeleteDialog(userId: number) {
    const dialogRef = this.dialog.open(UserDeleteDialog, {
      data: {
        userId: userId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'deleted') {
        const index = this.users.findIndex((user) => user.id === userId);
        this.users.splice(index, 1);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}

interface DialogData {
  index: number;
  userId: number;
}

@Component({
  selector: 'dialog-user-delete',
  templateUrl: 'user-delete-dialog.html',
})
export class UserDeleteDialog {
  constructor(
    private dialogRef: MatDialogRef<UsersListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  onConfirmDelete(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        this.snackBar.open(
          `Usuário de id: ${response} excluído com sucesso`,
          'fechar',
          { duration: 3000 }
        );
        this.dialogRef.close('deleted');
      },
      error: (err) => {
        this.snackBar.open(
          `Erro ao tentar excluir Usuário de id: ${userId}`,
          'fechar',
          { duration: 3000 }
        );
      },
    });
  }
}
