//6)Llamamos a la local storage donde estan los productos q agregamos en la seccion productos y tambien seleccionamos los elementos HTML que utilizaremos
let productosCarrito=localStorage.getItem("prendasCarrito")
productosCarrito=JSON.parse(productosCarrito)

const carritoVacio=document.querySelector("#carritoVacio")
const carritoProductos=document.querySelector("#carritoProductos")
const carritoAcciones=document.querySelector("#carritoAcciones")
const carritoComprado=document.querySelector("#carritoComprado")
let btnsEliminar=document.querySelectorAll(".carritoProductoEliminar")
const botonVaciar = document.querySelector("#vaciarCarrito")
const botonComprar =document.querySelector("#comprarCarrito")

//7)Creamos una funcion que cargue los productos del carrito
function cargarProductosCarrito(){

if (productosCarrito && productosCarrito.length >0) { // Si hay productos en el carrito se hace lo de dentro del IF y sino lo del ELSE

    

    carritoVacio.classList.add("disabled") 
    carritoProductos.classList.remove("disabled")       //a)Descativamos y activamos los estilos css que necesitemos si hay productos en el carrito
    carritoAcciones.classList.remove("disabled")
    carritoComprado.classList.add("disabled")
 
    carritoProductos.innerHTML=""  //b) Inserto este string vacio asi cada vez q entramos al carrito arranco de cero y continua el codigo de abajo y no se repiten los productos

    productosCarrito.forEach(prenda=>{ //c)Utilizamos el metodo forEach que nos devuelve todos los elementos del carrito

    const div= document.createElement("div") //d) Creamos un elemento y lo almacenamos en una variable
    div.classList.add("carritoProducto") //e) A este elemento le agregamos la clase "carritoProducto" , la cual tiene ciertos estilos de css
    div.innerHTML=`<img src="${prenda.imagen}" alt="${prenda.nombre}">
                    <div class="carritoProductoTitulo">
                        <small>Titulo</small>
                        <h3>${prenda.nombre}</h3>
                    </div>
                    <div class="carritoProductoCantidad">
                        <small>Cantidad</small>
                        <p>${prenda.cantidad}</p>               
                    </div>
                    <div class="carritoProductoPrecio">
                        <small>Precio</small>
                        <p>$ ${prenda.precio}</p>
                    </div>
                    <div class="carritoProductoSubtotal">
                        <small>Subtotal</small>
                        <p>$ ${prenda.precio*prenda.cantidad}</p>
                    </div>
                    <button class="carritoProductoEliminar" id="${prenda.id}"><i class='bx bxs-trash'></i></button>
                   ` //f) Al elemento creado le introducimos este codigo html con las propiedades de los objetos del CARRITO que recorrimos con el metodo forEach , para eso sirvio ese metodo

    carritoProductos.append(div) //g)Con .append agregamos todo lo anterior al contenedor seleccionador anteriormente
    })

    actualizarBotonesEliminar()
    actualizarTotal()
    
}else{

    carritoVacio.classList.remove("disabled")
    carritoProductos.classList.add("disabled")  //h)Se vuelven a activar los estilos css como estaban al inicio de la funcion si es que no hay productos
    carritoAcciones.classList.add("disabled")
    carritoComprado.classList.add("disabled")

}   

}


cargarProductosCarrito() //i)Llamamos a la funcion para que nos muestre los productos del carrito
//8)Creamos una funcion con un EVENTO para q cuando hagamos CLICK en el boton eliminar nos elimine una prenda del carrito
function actualizarBotonesEliminar() {
    btnsEliminar = document.querySelectorAll(".carritoProductoEliminar"); // a) La variable donde llamamos a todos los btn eliminar fue creada con LET por que siempre
                                                                            // cambian la cantidad de botones , si la hiciesemos con CONST daria error ya que 
                                                                            // ese tipo de variable no se puede cambiar de valor
    btnsEliminar.forEach(boton => { // b)Aplicamos forEach para buscar todos los btns eliminar y meterlos en un array
        boton.addEventListener("click", eliminarDelCarrito);// c) Aca aplicamos evento click a cada boton que aparece
    }); 
    //d)Lo agregamos al final del IF de la funcion cargarProductosEnCarrito asi cada vez que se agregan productos se actualizar el nro de botones eliminar
}
//9)Creamos la funcion que eliminar prendas del carrito 
function eliminarDelCarrito(e){

 Toastify({

    text: "Producto Eliminado",
    duration: 3000,
    newWindow: true,
    offset: {
    x: "2rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
    y: 2 // vertical axis - can be a number or a string indicating unity. eg: '2em'
  },
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
     stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
    background: "black",
    borderRadius:"2rem"
    },
  onClick: function(){} // Callback after click
            
}).showToast();

    const idBoton = e.currentTarget.id;//a)Almacenamos el id del boton aliminar clickeado
    const index = productosCarrito.findIndex(producto => producto.id === idBoton); //b)buscamos el idBoton que coincida con algun producto del carrito y almacenamos
                                                                                    // con .findIndex el indice  del elemento del carrito que coincidio
    
    productosCarrito.splice(index, 1);//c)Aplicamos el metodo .splice donde le pasamos como param el INDEX del producto que queremos eliminar y como segundo parametro la cantidad
    cargarProductosCarrito(); //d)Volvemos a cargar los productos del carrito

    localStorage.setItem("prendasCarrito", JSON.stringify(productosCarrito));//e)Volvemos a guardar los productos del carrito en la localStorage ya creada sin los productos eliminados

}

//10)Hacemos funcional el boton vaciar carrito
botonVaciar.addEventListener("click", vaciarCarrito) //a)aplicamos un evento al clickearlo y le pasamos una funcion
//b)creamos la funcion q vacie el carrito al hacer click
function vaciarCarrito(){

    Swal.fire({

        title: "¿Estas seguro?",
        icon: "question",
        html: `Se vaciara el carrito`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Si`,
        cancelButtonText: `No`,

    }).then((result) => {
  
        if (result.isConfirmed) {
             productosCarrito.length = 0; //c) con .length modificamos la cant de elementos del carrito y lo llevamos a 0 , de esta forma ya no habra productos en el carrito
            localStorage.setItem("prendasCarrito", JSON.stringify(productosCarrito)); //d) volvemos a guardar esto en la localStorage ya creada y ahora el carrito estara vacio
            cargarProductosCarrito(); //e)cargamos los productos en el carrito que serian 0

        } 
    });

   
}

//11)Creamos una funcion q actualize el titulo de total
function actualizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);//a)con .reduce acumulamos los precios de todos los productos y los sumamos
                                                                                                                        //almacenados en una variable
    total.innerText = `$${totalCalculado}`; //b)luego con innerText se lo agregamos al elemento
}
//d)Lo agregamos al final del IF de la funcion cargarProductosEnCarrito asi cada vez que se agregan productos se actualiza el total

//12)Hacemos funcional el boton comprar
botonComprar.addEventListener("click", comprarCarrito);//a)aplicamos un evento al clickearlo y le pasamos una funcion
function comprarCarrito() { //b)creamos la funcion q vacie el carrito al hacer click

    productosCarrito.length = 0;//c) con .length modificamos la cant de elementos del carrito y lo llevamos a 0 , de esta forma ya no habra productos en el carrito
    localStorage.setItem("prendasCarrito", JSON.stringify(productosCarrito));//d) volvemos a guardar esto en la localStorage ya creada y ahora el carrito estara vacio Y "COMPRADO"
    
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");  //e)Volvemos a activar y descactivar los estilos css necesarios
    carritoAcciones.classList.add("disabled");  
    carritoComprado.classList.remove("disabled");

}





















 