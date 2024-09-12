import { isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnDestroy, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import feather from 'feather-icons';
import moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { ToastService } from '../../../services/toast.service';
import { Game } from '../../models/game.model';
import { ModalEditGameComponent } from './modal-edit-game/modal-edit-game.component';

@Component({
  selector: 'app-list-games',
  standalone: true,
  imports: [NgxDatatableModule, FormsModule],
  providers: [GameService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './list-games.component.html',
  styleUrl: './list-games.component.scss'
})
export class ListGamesComponent implements OnDestroy {
  protected unsub$ = new Subject<void>();
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  games: Game[] = [];
  SelectionType = SelectionType.checkbox;
  columns: TableColumn[] = [];
  @ViewChild('actionColumn', { static: true }) actionColumn!: TemplateRef<any>;
  selected: Game[] = [];
  allSelected: boolean = false;
  selectionType = SelectionType.checkbox;
  pageSize: number = 5;
  pageSizes: number[] = [5, 10, 20, 50];
  filteredGames: Game[] = [];
  filterTerm = '';
  columnMode = ColumnMode.force

  constructor(private gameService: GameService, private modalService: NgbModal, private toastService: ToastService, @Inject(PLATFORM_ID) private platformId: Object,) {
  }

  ngOnInit(): void {
    this.setColumns();
    this.loadGames();

  }

  ngAfterViewInit(): void {
    // Certifique-se de que o elemento DOM está disponível
    if (this.table && this.table.element) {
      this.table.recalculate();
    }
  }

  ngAfterViewChecked(): void {
    if (isPlatformBrowser(this.platformId)) {
      feather.replace();
    }
  }

  setColumns() {
    this.columns = [
      { prop: 'select', name: '', checkboxable: true, headerCheckboxable: true, width: 10, sortable: false },
      { prop: 'actions', name: 'Actions', sortable: false, cellTemplate: this.actionColumn, width: 100 },
      { prop: 'name', name: 'Name', width: 270 },
      { prop: 'genre', name: 'Genre', width: 200 },
      { prop: 'platform', name: 'Platform', width: 200 },
      { prop: 'releaseDate', name: 'Release Date', width: 200, sortable: true, comparator: (a: string, b: string) => moment(a, "DD/MM/YYYY").toDate().getTime() - moment(b, "DD/MM/YYYY").toDate().getTime() },
      { prop: 'company', name: 'Company', width: 200 },
      { prop: 'description', name: 'Description', cellClass: 'break-word', width: 800 }
    ];
  }

  clearFilters() {
    this.filterTerm = '';
    this.filteredGames = this.games;
  }

  loadGames() {
    this.gameService.getGames().pipe(takeUntil(this.unsub$)).subscribe({
      next: (games) => {
        this.games = games;
        this.filteredGames = [...games];
      },
      error: () => {
        window.alert("Error getting games from api!");
      },
    });
  }

  onSelect(event: { selected: Game[] }) {
    this.selected = event.selected;
  }

  onActivate() {
    if (this.filteredGames.length === this.games.length) {
      this.filteredGames = [...this.games];
    } else {
      this.filteredGames = [...this.filteredGames];
    }
  }

  onFilterChange() {
    const filterTermLower = this.filterTerm.toLowerCase();

    this.filteredGames = this.games.filter(game => {
      return Object.keys(game).some(key => {
        if (typeof game[key as keyof Game] === 'string') {
          return (game[key as keyof Game] as string).toLowerCase().includes(filterTermLower);
        }
        return false;
      });
    });

    if (this.filterTerm === '') {
      this.filteredGames = this.games;
    }
  }

  deleteSelected() {
    if (this.selected.length === 0) {
      return;
    }

    this.gameService.deleteGame(this.selected.map(e => e.id)).pipe(takeUntil(this.unsub$)).subscribe({
      next: (res) => {
        if (res) {
          const { message } = res;
          this.toastService.showSuccess(message);
          this.loadGames();
          this.selected = [];
        }
      },
      error: () => {
        window.alert("Error deleting game!");
      },
      complete: () => {
        this.clearFilters();
      }
    });
  }

  deleteAll() {
    this.gameService.deleteAll().pipe(takeUntil(this.unsub$)).subscribe({
      next: (res) => {
        if (res) {
          const { message } = res;
          this.toastService.showSuccess(message);
          this.loadGames();
          this.selected = [];
        }
      },
      error: () => {
        window.alert("Error deleting all games!");
      },
      complete: () => {
        this.clearFilters();
      }
    });
  }

  populateDatabase() {
    this.gameService.populateDatabase().pipe(takeUntil(this.unsub$)).subscribe({
      next: (res) => {
        if (res) {
          const { message } = res;
          this.toastService.showSuccess(message);
          this.loadGames();
        }
      },
      error: () => {
        window.alert("Error populating database!");
      },
      complete: () => {
        this.clearFilters();
      }
    });
  }

  openModal(row: Game) {
    const modalRef = this.modalService.open(ModalEditGameComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
    });

    modalRef.componentInstance.game = row;

    modalRef.result.then((result) => {
      if (result) {
        this.toastService.showSuccess(result.message);
        this.loadGames();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
