import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../pokemon';
import { POKEMONS } from '../shared/list.pokemons';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) { }

  private pokemonUrl= 'api/pokemons'

  private handleError<T>(operation='operation',result?:T){
    return (error:any):Observable<T>=>{
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T)
    }
  }

  getListPokemons():Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(this.pokemonUrl).pipe(
      tap(_=>console.log('fetched Pokemons')),
      catchError(this.handleError('getListPokemins',[]))
    );
  }

  getSinglePokemon(id:number):Observable<Pokemon>{
    const url = `${this.pokemonUrl}/${id}`;
    
    
   return this.http.get<Pokemon>(url).pipe(
     tap(_=>console.log(`fetched Pokemon id=${id}`)),
     catchError(this.handleError<Pokemon>(`Get Pokemon id = ${id}`))
   );
    
  }

  updatePokemon(pokemon: Pokemon):Observable<Pokemon>{
    const httpOptions={
      headers:new HttpHeaders({'Content-type':'application/json'})
    };

    return this.http.put(this.pokemonUrl,pokemon, httpOptions).pipe(
      tap(_=>console.log(`Updated Pokemon id= ${pokemon.id}`)),
      catchError(this.handleError<any>('updated Pokemon'))
    )
  }

  deletePokemon(pokemon: Pokemon):Observable<Pokemon>{
    const deleteUrl=`${this.pokemonUrl}/${pokemon.id}`;

    const httpOptions={
      headers:new HttpHeaders({'Content-type':'application/json'})
    };

    return this.http.delete<Pokemon>(deleteUrl,httpOptions).pipe(
      tap(_=>console.log(`Deleted Pokemon id= ${pokemon.id}`)),
      catchError(this.handleError<Pokemon>('deleted Pokemon'))
    )
  }

  searchPokemons(term:string):Observable<Pokemon[]> {
    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Pokemon[]>(`${this.pokemonUrl}/?name=${term}`).pipe(
      tap(_=>console.log(`found pokemons matchins "${term}"`)),
      catchError(this.handleError<Pokemon[]> ('searchPokemons',[]))

    );
  }

  getPokemonTypes():string[]{
    return ['Plante','Feu','Eau','Insecte','Normal','Electrik','Poson','Fée','Vol'];
  }

}
