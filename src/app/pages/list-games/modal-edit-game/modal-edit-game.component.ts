import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { GameService } from '../../../../services/game.service';
import { Game } from '../../../models/game.model';

@Component({
  selector: 'app-modal-edit-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [GameService],
  templateUrl: './modal-edit-game.component.html',
  styleUrl: './modal-edit-game.component.scss'
})
export class ModalEditGameComponent {
  @Input() game!: Game;
  form!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private gameService: GameService) {

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({

      name: ['', Validators.required],

      description: ['', Validators.required],

      genre: ['', Validators.required],

      releaseDate: [''],

      platform: ['', Validators.required],

      company: ['', Validators.required]
    });

    this.form.patchValue(this.game);
    this.game.releaseDate ? this.form.get('releaseDate')?.setValue(moment(this.game.releaseDate, 'DD/MM/YYYY').format('YYYY-MM-DD')) : '';
  }

  closeModal() {
    this.activeModal.close();
  }

  updateGame() {
    let gameParams: Game = this.form.value as Game;
    gameParams.id = this.game.id;

    if (gameParams.releaseDate) {
      gameParams.releaseDate = moment(gameParams.releaseDate).format('DD/MM/YYYY');
    }

    this.gameService.saveGame(gameParams).subscribe((res) => {
      if (res) {
        const { message } = res;
        this.activeModal.close({ message: message });
      }
    });
  }
}
