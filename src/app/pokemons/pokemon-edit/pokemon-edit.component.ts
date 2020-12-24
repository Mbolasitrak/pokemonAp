import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/pokemon';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.scss']
})
export class PokemonEditComponent implements OnInit {

  constructor(private route:ActivatedRoute, private pokemonService:PokemonsService) { }

  ngOnInit(): void {
    const id= +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getSinglePokemon(id)
    .subscribe(pkm=>this.singlePokemon=pkm);
  }

  singlePokemon:Pokemon=null;

}
