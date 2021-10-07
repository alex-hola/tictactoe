import '../App.css';

const Casilla = (props) => {

    let clase = "casilla ";

    const handleClick = () => {

        //hay un turno y la casilla no está clicada
        (props.turno!==null && props.valor===0) && props.onClick();

    }

   if(props.valor!==0){
       clase += "casilla"+props.valor;
   }

   if(props.ganador){
       clase += " ganador";
   }

    return(

      <div className={clase} onClick={handleClick}></div>  

    );

}

export default Casilla;