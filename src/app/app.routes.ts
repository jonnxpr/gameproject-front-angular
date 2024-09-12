import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListGamesComponent } from './pages/list-games/list-games.component';
import { RegisterGamesComponent } from './pages/register-games/register-games.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list-games', component: ListGamesComponent },
  { path: 'register-games', component: RegisterGamesComponent },
];
