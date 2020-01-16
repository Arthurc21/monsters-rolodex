import React, {Component} from 'react';

import {CardList} from "./components/card-list/card-list.component";
import {SearchBox} from "./components/search-box/search-box.component";

import './App.css';

class App extends Component {
    constructor() {
        super(); //llama al constructor de React.component

        this.state = {
            monsters: [], //se va a actualizar la propiedad monster del objeto state
            searchField: ''
        };

        //this.handleChange = this.handleChange.bind(this);
        //unnecessary binding code
    }

    componentDidMount() {
        //componentDidMount es un life-cycle method
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({monsters: users}));
    }

    handleChange = event => {
        this.setState({searchField: event.target.value});
    };

    render() {
        //para filtrar search sin modificar monster[] se usa "destructure"
        const {monsters, searchField} = this.state; //genero 2 varaiables "monsters" & "searchField" y a ambas les asigno lo contenido en state
        /*
        equivale a:
        const monsters = this.state.monsters;
        const searchField = this.state.searchField;
        */

        const filteredMonsters = monsters.filter(monster =>
            monster.name.toLowerCase().includes(searchField.toLowerCase())
        );
        //el metodo includes verifica que el argumento ingresado se encuentre dentor del string al cual se le aplico el metodo

        return (
            <div className='App'>
                <h1>Monsters Rolodex</h1>
                <SearchBox
                    placeholder='search monsters'
                    handleChange={this.handleChange}
                />
        <CardList monsters={filteredMonsters /* o this.state.monsters*/}/>
    </div>
    )
        ;
    }
}


export default App;

/*<input
type='search'
placeholder='search monsters'
onChange={e => {
//onChange es un synthetic event
//Cuando ocurre un cambio en el DOM debido a un usuario, el bot de react avisa a react del cambio
//eso es un eynthetic event

this.setState({searchField: e.target.value},
() => console.log(this.state));
//e de evento
//setState es una funcion asincrona, cuando se escriba en el recuadro de busqueda
// setState estara un evento (o caracter) atrasado
//console.log(this.state);
}}
/>*/
