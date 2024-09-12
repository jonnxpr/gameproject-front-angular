import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnMode, DatatableComponent, NgxDatatableModule, SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import { Subject, takeUntil } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { Game } from '../../models/game.model';

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
  selected: Game[] = [];
  allSelected: boolean = false;
  selectionType = SelectionType.checkbox;
  pageSize: number = 5;
  pageSizes: number[] = [5, 10, 20, 50];
  filteredGames: Game[] = [];
  filterTerm = '';
  columnMode = ColumnMode.force

  constructor(private gameService: GameService) {
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

  setColumns() {
    this.columns = [
      { prop: 'select', name: '', checkboxable: true, headerCheckboxable: true, width: 1, sortable: false },
      // { prop: 'id', name: 'ID', width: 100 },
      { prop: 'name', name: 'Name', width: 400 },
      { prop: 'genre', name: 'Genre', width: 200 },
      { prop: 'platform', name: 'Platform', width: 200 },
      { prop: 'releaseDate', name: 'Release Date', width: 200 },
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
      next: () => {
        this.loadGames();
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
      next: () => {
        this.loadGames();
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
      next: () => {
        this.loadGames();
      },
      error: () => {
        window.alert("Error populating database!");
      },
      complete: () => {
        this.clearFilters();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
