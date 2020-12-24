import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailPokemonComponent } from './pokemons/detail-pokemon/detail-pokemon.component';
import { ListPokemonComponent } from './pokemons/list-pokemon/list-pokemon.component';
import { PokemonEditComponent } from './pokemons/pokemon-edit/pokemon-edit.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'pokemon',component:ListPokemonComponent},
  {path:'pokemon/edit/:id',component:PokemonEditComponent},
  {path:'pokemon/:id', component:DetailPokemonComponent},
  {path:'',redirectTo:'pokemon', pathMatch:'full'},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
