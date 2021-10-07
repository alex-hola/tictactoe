import '../App.css';
import { useState } from 'react';
import Casilla from './Casilla.jsx';
import Panel from './Panel';

const Tablero = () => {

    //0 casillaInicio
    const [map, setMap] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    //Turno de jugador X o Y
    const [turno, setTurno] = useState("X");
    //Puntuaciones de los jugadores
    const [puntuacion, setPuntuacion] = useState({
        "X" : 0,
        "Y" : 0
    });

    //contiene el array con las 3 posiciones ganadoras
    const [ganador, setGanador] = useState([]);

    //Guarda el ultimo turno para poderlo alternar entre partidas
    //El Turno es null al final para que no se pueda clicar mas casillas, hace falta guardarlo
    let lastTurn = turno;

    //Gameover true cuando gana alguien
    //const [gameOver, setGameOver] = useState(false);
    

    //Combinaciones ganadoras del juego
    const combinacionesGanadoras = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    
    const resetear = () => {
        setTurno(lastTurn==="X" ? "Y" : "X" );
        setGanador([]);
        setMap([0,0,0,0,0,0,0,0,0]);
    }

    const comprobarGanador = (newMap) =>{
        console.log("comprobando")
        for(let i=0; i<combinacionesGanadoras.length; i++){
            
            //gana si coincide la combinacion
            if(newMap[combinacionesGanadoras[i][0]] === turno &&
                newMap[combinacionesGanadoras[i][1]] === turno &&
                newMap[combinacionesGanadoras[i][2]] === turno){
                    finalPartida(turno, combinacionesGanadoras[i]); //pasamos turno o null dependiendo si gana alguien o empata
                    return; //sale de la funcion
                }
                
            //empate si no hay ningun 0 en el map
            if(!newMap.includes(0)){
                finalPartida(null, []);
                return;
            }

        }
        
        //alterna el turno
        turno==="X" ? setTurno("Y") : setTurno("X");

    }

    // funcion que se ejecuta al finalizar cada partida (empate o victoria)
    const finalPartida = (jugadorGanador, posicionesGanadoras) => {
        lastTurn = turno;
        setTurno(null);

        if(jugadorGanador!==null){
            let puntos = {...puntuacion}; //copia del objeto
            puntos[jugadorGanador]++;
            setPuntuacion(puntos);
        }

        setGanador(posicionesGanadoras);

        setTimeout(() => {
            resetear();
        }, 2000);
    }
    
    // funcion llamada al pulsar una casilla
    const handleClick = (posicionCasilla) => {

        let newMap = [...map];
        //cambia el 0 por una X o Y
        newMap.splice(posicionCasilla, 1, turno);
        setMap(newMap);
        comprobarGanador(newMap);

    }
    
    const crearCasillas = (casillas) => {
        //la casilla es ganadora si esta dentro de la combinacion ganadora
        return casillas.map( e => <Casilla valor={map[e]} onClick = {() => handleClick(e)} turno={turno} ganador={ganador.includes(e)}/>) 
        
    }

    return (
        <>
        <div className="tablero">
            <div className="row">
                {/* valor = valor de esa posicion y handleClink = posicion de la casilla */}
                {/* <Casilla valor={map[0]} onClick = {() => handleClick(0)} turno={turno}/>  
                <Casilla valor={map[1]} onClick = {() => handleClick(1)} turno={turno}/>  
                <Casilla valor={map[2]} onClick = {() => handleClick(2)} turno={turno}/> */}
                {crearCasillas([0,1,2])}
            </div>
            <div className="row">
                {/* <Casilla valor={map[3]} onClick = {() => handleClick(3)} turno={turno}/>  
                <Casilla valor={map[4]} onClick = {() => handleClick(4)} turno={turno}/>  
                <Casilla valor={map[5]} onClick = {() => handleClick(5)} turno={turno}/>   */}
                {crearCasillas([3,4,5])}
            </div>
            <div className="row">
                {/* <Casilla valor={map[6]} onClick = {() => handleClick(6)} turno={turno}/>  
                <Casilla valor={map[7]} onClick = {() => handleClick(7)} turno={turno}/>  
                <Casilla valor={map[8]} onClick = {() => handleClick(8)} turno={turno}/>   */}
                {crearCasillas([6,7,8])}
            </div>
            <Panel points={puntuacion}/>
        </div>
        
        </>
    );

}

export default Tablero;