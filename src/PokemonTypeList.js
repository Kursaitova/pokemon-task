import React from 'react';
import { observable, computed, action, decorate } from "mobx";
import {observer} from 'mobx-react';

@observer
class PokemonTypeList extends React.Component {
    @observable currentType;
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = { 
            currentType: ""
        }
    }

    @action handleClick(typeName) {
        this.props.gettingType(typeName);
        this.setState({currentType: typeName});
    }

    render() {
        const {typeName} = this.props;

        const typeOne = (      
            <button className={"type-list__button"} key={typeName} name={typeName} 
                onClick={(e) => this.handleClick(typeName)}>
                {typeName}
            </button>
        );
        return <div className="button-container">{typeOne}</div>;
    }
}

export default PokemonTypeList