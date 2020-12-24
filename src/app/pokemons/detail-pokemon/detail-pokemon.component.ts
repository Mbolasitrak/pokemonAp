import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../pokemon';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit {

  constructor(private route : ActivatedRoute,private router:Router, private pokemonService:PokemonsService) { }
  
  pokemonToDisplay: Pokemon=null;
  
  ngOnInit(): void {
    const id= +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getSinglePokemon(id)
    .subscribe(pkm=>this.pokemonToDisplay=pkm);
  }
  
  retourEnArriere(){
    const home=['pokemon'];
    this.router.navigate(home);
  }

  editerPokemon(id){
    const link=['pokemon/edit/',id];
    this.router.navigate(link);
  }

  deletePokemon(pok){
    if(confirm(`Etes vous sur de vouloir supprimer le pokemon: ${pok.name}`)) {
      this.pokemonService.deletePokemon(pok)
      .subscribe(()=>{
        const home=['pokemon'];
        alert(`le pokemon : ${pok.name} a été supprimé`);
        this.router.navigate(home);
      });
    }
  }




}
