import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/pokemon';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {

  constructor(private router:Router,private pokemonService:PokemonsService) { }

  ngOnInit(): void {
    this.types=this.pokemonService.getPokemonTypes();
  }

  types:Array<string>;
  @Input() pokemon:Pokemon;

  hasType(type:string):boolean{
    const  index=this.pokemon.types.indexOf(type);
    return (index > -1)?true:false;
  }

  selectType($event:any,type:string):void{
    const checked=$event.target.checked;
    if(checked){
      this.pokemon.types.push(type);
    }else{
      const index=this.pokemon.types.indexOf(type);
    
    if (index > -1){
      this.pokemon.types.splice(index,1)
      }
    }
  }

  goBack(){
    const link=['pokemon/',this.pokemon.id];
    this.router.navigate(link);
  }

  onSubmit():void{
    console.log('Submited form !');
    alert("le pokemon a été modifié !")
    this.pokemonService.updatePokemon(this.pokemon)
    .subscribe(()=>this.goBack())

  }

  isTypesValid(type:string):boolean{
    if(this.pokemon.types.length === 1 && this.hasType(type)){
      return false;
    }
    if(this.pokemon.types.length >= 3 && !this.hasType(type)){
      return false;
    }
    return true;
  }

}
