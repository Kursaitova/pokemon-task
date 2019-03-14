import React from 'react';
import { observable, computed, action, decorate } from "mobx";
import { observer } from '../node_modules/mobx-react';

@observer
class Pokemon extends React.Component {
    @observable isReverse;
    constructor(props) {
        super(props);
        this.state = {isReverse: false};
        this.handleClick = this.handleClick.bind(this);
        this.handleClickPokemon = this.handleClickPokemon.bind(this);
    }
    @action handleClick(type) {
        this.props.gettingType(type);
        this.setState({currentType: type});
    }

    @action handleClickPokemon() {
        this.setState(prevState => ({
            isReverse: !prevState.isReverse
        }));
    }

    render() {
        let {id, name, type, attack, speed} = this.props;

        return (
            <div className="pokemon-single-container">
                <div>
                    <img className="sprites"  onClick={() => this.handleClickPokemon()}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.isReverse ? "back/" + id : id}.png`}/>
                    <p className="pokemon__name">{name}</p>
                    <div className="pokemon__character">
                        <p className="pokemon__character-head">Type:</p>
                        <div className="pokemon__type-list">
                            {type.map(t => 
                                <button className={"pokemon-type " + ((t))} key={t} onClick={(e) => this.handleClick(t)}>
                                {t}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="pokemon__character">
                        <p className="pokemon__character-head">Attack:</p>
                        <p className="pokemon__character-attack">{attack}</p>
                    </div>
                    <div className="pokemon__character">
                        <p className="pokemon__character-head">Speed:</p>
                        <p className="pokemon__character-attack">{speed}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pokemon