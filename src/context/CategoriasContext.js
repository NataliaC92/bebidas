import Axios from "axios";
import { createContext, useState, useEffect } from "react";



/* creamos el contex */
export const CategoriasContext = createContext();

/* crear el Provide, es donde se encontraran las funciones y state */
const CategoriasProvider = (props) => {

    /* se crean los state del context */
    const [categorias , guardarCategorias] = useState([]);

    /* ejecutar llamado a la api */
    useEffect(() => {
        const obtenerCategorias = async () => {
            const url_bebidas = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

            const categoriasBebidas = await Axios.get(url_bebidas);

            guardarCategorias(categoriasBebidas.data.drinks);
        }
        obtenerCategorias();
    }, []);


    return(
       <CategoriasContext.Provider
            value={{
                categorias
            }}
       >
           {props.children}
       </CategoriasContext.Provider>

    );

}

export default CategoriasProvider;
