import React from 'react';
import { observable, computed, action, decorate } from "mobx";
import { observer } from 'mobx-react';

@observer
class Pagination extends React.Component {
    @observable currentPage;
    @observable pageCnt;
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handlePaginClick = this.handlePaginClick.bind(this);
        this.state = { 
            currentPage: 1,
            pageCnt: 10,
        };
    }

    @action handleClick(e) {
        this.props.pageChange(Number(e.target.id));
        this.setState({currentPage: Number(e.target.id)});
    }

    @action handlePaginClick(e) {
        this.props.cntChange(Number(e.target.id));
        this.setState({ pageCnt: Number(e.target.id), currentPage: 1});
    }

    render() {
        const pageList = [];
        const pokemPagin = [10, 20, 50];
        let {currentPage, pageCnt} = this.state;

        const pag = 300 / pageCnt;
        for(let i=1; i<=pag; i++) {
            pageList[i] = i;
        }  

        const cntPokPage = pokemPagin.map(pagin =>      
            <button className={"pagin-button " + ((pageCnt === pagin)? 'pagin-button__active': '')} key={pagin} id={pagin} onClick={this.handlePaginClick}>
                {pagin}
            </button>
        );
        const pageOne = pageList.map(page =>      
            <button className={"pagin-button " + ((currentPage === page)? 'pagin-button__active': '')} key={page} id={page} onClick={this.handleClick}>
                {page}
            </button>
        );

        return (
            <div>
                <div className="button-container">{cntPokPage}</div>
                <div className="button-container">{pageOne}</div>
            </div>
        );
    }
}

export default Pagination