import React, {  useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs} from "firebase/firestore";
import { db } from "../config/firebase";
import ItemListContainer from '../components/itemlistcontainer';
import { DataContext } from '../context/DataContext';
import { useCart } from '../components/useCart';

function Cards(){
    
    const [ itemList ] = useContext(DataContext)

    const {addToCart,removeFromCart, cart, checkProductInCart} = useCart()

    return(
        <div>
            <ItemListContainer greeting={"¡Bienvienido a mi Tienda Online!"}/>
        <div  className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5 items-list'>
            {itemList.map((producto)=>{
                const isProductInCart = checkProductInCart(producto)
                return( 
                <div key={producto.id} categoria="todos" className="max-w-sm rounded overflow-hidden shadow-lg mb-3 transform transition-transform hover:scale-105">
                    <img src={producto.imagen} className="w-full h-64 object-cover" alt={producto.nombre} /> 
                    <footer>
                    <div className="px-6 py-4">
                        <h3 className="font-bold text-xl mb-2 flex justify-center">{producto.nombre}</h3>
                    </div>
                        <div className="flex justify-center mb-5 ">
                            <p> ${producto.precio} </p>
                        </div>
                        <div className="flex justify-center gap-5 mb-1 mt-1">
                        <button style={{backgroundColor : isProductInCart ? 'red' : '#09f'} }  className="hover:bg-blue-700 text-white px-2" onClick={() => {
                        isProductInCart 
                        ? removeFromCart(producto) 
                        : addToCart(producto)
                        }}>
                            {
                                isProductInCart
                                ? <p>Eliminar -</p>
                                : <p>Comprar + </p>
                            }
                        </button>
                        <button className="bg-[#09f] agregar-btn hover:bg-blue-700 text-white px-2">
                            <Link to={`/productos/${producto.id}`}><p>Detalles</p></Link>
                        </button>
                    </div>
                    </footer>
                </div>
            )   
        })}
    </div>
    </div>
    )
}

export default Cards;
