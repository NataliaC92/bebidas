import React, {createContext, useState, useEffect } from 'react';
import axios from 'axios';

/* crear el context */
export const ModalContext = createContext();

const ModalProvider = (props) => {

    /* state del provider */
    const [idreceta, guardarIdReceta ] = useState(null);
    const [ informacion, guardarReceta ] = useState({});
    


    /* una vez que tenemos una receta debemos llamar los detalles de la misma*/

    useEffect(() => {
        const obtenerReceta = async () => {
            if(!idreceta) return;

            const url_receta = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

            const resultado = await axios.get(url_receta);

            guardarReceta(resultado.data.drinks[0]);
        }

        obtenerReceta();

    }, [idreceta]);


    return ( 
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta     
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;
