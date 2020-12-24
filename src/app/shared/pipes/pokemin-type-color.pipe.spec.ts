import { PokemonTypeColorPipe } from './pokemin-type-color.pipe';

describe('PokeminTypeColorPipe', () => {
  it('create an instance', () => {
    const pipe = new PokemonTypeColorPipe();
    expect(pipe).toBeTruthy();
  });
});
