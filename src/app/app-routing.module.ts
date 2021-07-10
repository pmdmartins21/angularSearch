import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { DetailsComponent } from './details/details.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component:BodyComponent}, 
  { path: 'search/:query/:page', component:SearchComponent},
  { path: 'details/:id', component:DetailsComponent}, 
  { path: 'favorites', component:FavoritesComponent}, 
  { path: 'not-found', component:NotFoundComponent}, 
  { path: '**', redirectTo:'/not-found'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
