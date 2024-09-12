import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import moment from 'moment';
import { NgxMaskDirective } from 'ngx-mask';
import { CoreDirectivesModule } from '../../../@core/directives/directives.module';
import { GameService } from '../../../services/game.service';
import { ToastService } from '../../../services/toast.service';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-register-games',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, NgxMaskDirective, CoreDirectivesModule],
  providers: [GameService],
  templateUrl: './register-games.component.html',
  styleUrl: './register-games.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterGamesComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private gameService: GameService, private toastService: ToastService) { }

  ngOnInit(): void {

    this.form = this.fb.group({

      name: ['', Validators.required],

      description: ['', Validators.required],

      genre: ['', Validators.required],

      releaseDate: [''],

      platform: ['', Validators.required],

      company: ['', Validators.required]

    });

  }

  saveGame(): void {
    let gameParams: Game = this.form.value as Game;

    if (gameParams.releaseDate) {
      gameParams.releaseDate = moment(gameParams.releaseDate).format('DD/MM/YYYY');
    }

    this.gameService.saveGame(gameParams).subscribe((res) => {
      if (res) {
        const { message } = res;
        this.toastService.showSuccess(message);
        this.form.reset();
      }
    });
  }
}
