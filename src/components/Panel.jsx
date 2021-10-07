

const Panel = ({points}) => {

    return(

        <div className="panel">
            <div className="jugador1">{points.X}</div>
            <div className="jugador2">{points.Y}</div>
        </div>

    );

}

export default Panel;