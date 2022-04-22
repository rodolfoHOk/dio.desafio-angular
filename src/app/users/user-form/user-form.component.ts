import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userId: string | null = null;
  user: User | null = null;

  constructor(
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.nullValidator],
      avatar: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      additionalContact: [''],
      role: ['', Validators.required],
      department: ['', Validators.required],
      submitsTo: [''],
      admittedAt: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(
      (params) => (this.userId = params.get('id'))
    );
    if (this.userId) {
      this.userService
        .getUser(Number(this.userId))
        .subscribe((response) => (this.user = response));
      if (this.user) {
        this.userForm.patchValue(this.user);
      } else {
        this.snackBar.open(
          `Usuário não encontrado com o id: ${this.userId}. Redirecionando para lista de usuários...`,
          'fechar',
          { duration: 3000 }
        );
        setTimeout(() => this.router.navigate(['/users']), 3000);
      }
    }
  }

  salvar(): void {
    if (this.user) {
      this.atualizar();
    } else {
      this.cadastrar();
    }
  }

  atualizar(): void {
    this.userService
      .updateUser(Number(this.userId), this.userForm.value)
      .subscribe({
        next: () => {
          this.snackBar.open('Usuário atualizado com sucesso', 'fechar', {
            duration: 3000,
          });
        },
        error: () => {
          this.snackBar.open('Erro ao tentar atualizar usuário', 'fechar', {
            duration: 3000,
          });
        },
      });
  }

  cadastrar(): void {
    this.userService.postUser(this.userForm.value).subscribe({
      next: () => {
        this.snackBar.open('Usuário atualizado com sucesso', 'fechar', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackBar.open('Erro ao tentar atualizar usuário', 'fechar', {
          duration: 3000,
        });
      },
    });
  }
}
