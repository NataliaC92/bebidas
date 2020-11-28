import React, {useContext , useState} from 'react';
import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

    const useStyles = makeStyles(theme => ({
        paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        },
    }));


const Receta = ({receta}) => {

    /* configuracion del modal de material-ui */
    const [ modalStyles ] = useState(getModalStyle);
    const [ open, setOpen ] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

     /* extraer valores del modal context */   
    const { informacion, guardarIdReceta, guardarReceta } = useContext(ModalContext);

    /* muestra y formatea los ingredientes lo vamos a hacer con un for loop*/

    const mostrarIngredientes = informacion => {
        let ingredientes = [];


        for (let i = 1; i < 16; i++){
            if( informacion[`strIngredient${i}`]) {
                ingredientes.push(
                    <li>
                        {informacion[`strIngredient${i}`]} 
                        {informacion[`strMeasures${i}`]}
                    </li>
                )
            }
        }

        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                 <h2 className="card-header">{receta.strDrink}</h2>

                 <img 
                    src={receta.strDrinkThumb} 
                    alt={`Imagen de ${receta.strDrink}`}
                    className="card-img-top"
                />

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >   
                    Ver Receta</button>


                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null);
                            guardarReceta({});
                            handleClose();
                        }}
                    >
                        <div 
                            style={modalStyles}
                            className={classes.paper}
                        >
                            <h2>{informacion.srtDrink}</h2>
                            <h3 className="mt-4"> Instrucciones de preparación</h3>
                            <p>
                                {informacion.strInstructions}
                            </p>

                            <img 
                                src={informacion.strDrinkThumb} 
                                alt="imagen no disponible"
                                className="img-fluid my-4"
                            />

                            <h3>Ingredientes y Cantidades</h3>
                            <ul>
                                {mostrarIngredientes (informacion)}
                            </ul>

                        </div>
                    </Modal>
                </div>

            </div>
        </div>
     );
}
 
export default Receta;
