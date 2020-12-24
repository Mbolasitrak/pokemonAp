import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Pokemon } from 'src/app/pokemon';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit {

  constructor( private router:Router, private pokemonsService:PokemonsService) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=>this.pokemonsService.searchPokemons(term))
    );
  }

  private searchTerms=new Subject();
  pokemons$:Observable<Pokemon[]>;

  search(term: string): void {
    this.searchTerms.next(term);
  }

  gotoDetail(pokemon){
    const link=['pokemon/edit/',pokemon.id];
    this.router.navigate(link);
  }

}
