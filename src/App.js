import React from 'react';
import ReactDOM from 'react-dom';
import Pokemon from './Pokemon';
import Pagination from './Pagination';
import PokemonTypeList from './PokemonTypeList';
import './App.css';
import { observable, computed, action, decorate } from "mobx";
import {observer} from 'mobx-react';

@observer
class PokemonPage extends React.Component {
    @observable pokemon;
    @observable name;
    @observable search;
    @observable searchType;
    @observable page;
    @observable pokemonType;
    @observable cntPage;
    constructor(props) {
        super(props)
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleCntChange = this.handleCntChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            pokemon: [],
            name: "",
            search: "",
            searchType: "",
            page: 1,
            pokemonType: [],
            cntPage: 10
        }
    }

    @action handlePageChange(page) {
        this.setState({page});
    }

    @action handleCntChange(cntPage) {
        this.setState({
            cntPage,
            page: 1,
            searchType: ""
        });
    }

    @action handleChange(searchType) {
        this.setState({
            searchType,
            search: ""
        });
    }

    @action connectionApi() {
        const poks = [];
        for(let i=1; i<=300; i++) {
            poks[i] = "https://pokeapi.co/api/v2/pokemon/" + i;
        }
        poks.map(url => fetch(url).then(response => response.json()).then(responseData => {
            this.setState({
                pokemon: this.state.pokemon.concat([responseData])
            }
            )
        }))    
    }

    componentDidMount() {
        this.connectionApi();
    }

    @action onchange = e =>{
        this.setState({ search : e.target.value, searchType: ""});
    }

    render() {
        let {pokemon, page, search, searchType, pokemonType, cntPage} = this.state;   
        const filteredName = pokemon.filter( pok => {
            return pok.name.toLowerCase().indexOf( search.toLowerCase() ) !== -1
        })
        const filteredType = pokemon.filter( pok => {
            return (pok.types[0].type.name.toLowerCase().indexOf(searchType.toLowerCase()) !== -1)
        })
        
       const typeDesk = pokemon.map(pok => pok.types[0].type.name)
        for(let i=1; i<=pokemon.length; i++) {
            if(pokemonType.indexOf(typeDesk[i]) === -1 && typeDesk[i] !== undefined) {
                pokemonType.push(typeDesk[i])      
            }   
        } 

        const pagePokemon = pokemon;
        const pages = pagePokemon.slice(cntPage*(page-1), cntPage*page);

        let pokemonPage = (
            <div className="main">
                <div className="pokemon-input">
                    <p>Input pokemon name:</p>
                    <input icon="search" onChange={this.onchange}/>
                </div> 
                <Pagination pageChange={this.handlePageChange} cntChange={this.handleCntChange} data={pokemon} sizePage={this.page} cntPage={this.cntPage} />
                <div className="type-list">
                {pokemonType.map((oneType, ind) =>
                    <PokemonTypeList key={oneType} typeName={oneType} id={ind+1} gettingType={this.handleChange} />
                )}
                </div>
                
                <div className="main">
                    <div className="pokemon-container">
                    { (page !== 0 && cntPage !== 0 && search === "" && searchType === "") ?
                        pages.map((character) => 
                        <Pokemon key = {character.name} name = {character.name} id = {character.id} 
                        type = {character.types.map(t => t.type.name)} 
                        attack = {character.stats[4].base_stat} speed = {character.stats[0].base_stat} gettingType={this.handleChange} />
                        )
                    :
                     ((searchType === "") ? 
                        filteredName.map((character) => 
                            <Pokemon key = {character.name} name = {character.name} id = {character.id} type = {character.types.map(t => t.type.name)} 
                            attack = {character.stats[4].base_stat} speed = {character.stats[0].base_stat} gettingType={this.handleChange} />
                        )
                    :
                        filteredType.map((character) => 
                            <Pokemon key = {character.name} name = {character.name} id = {character.id} type = {character.types.map(t => t.type.name)}
                            attack = {character.stats[4].base_stat} speed = {character.stats[0].base_stat} gettingType={this.handleChange} />
                        )  
                    )
                    }            
                    </div>
                </div>
          </div>
        );        
        return <div>{pokemonPage}</div>;
    }
}

ReactDOM.render(<PokemonPage />, document.getElementById("root"));

export default PokemonPage;
