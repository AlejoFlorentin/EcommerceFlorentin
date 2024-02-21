let productosCarrito=localStorage.getItem("prendasCarrito")
productosCarrito=JSON.parse(productosCarrito)

const carritoVacio=document.querySelector("#carritoVacio")
const carritoProductos=document.querySelector("#carritoProductos")
const carritoAcciones=document.querySelector("#carritoAcciones")
const carritoComprado=document.querySelector("#carritoComprado")
let btnsEliminar=document.querySelectorAll(".carritoProductoEliminar")
const botonVaciar = document.querySelector("#vaciarCarrito")
const botonComprar =document.querySelector("#comprarCarrito")

function cargarProductosCarrito(){

if (productosCarrito && productosCarrito.length >0) {

    

    carritoVacio.classList.add("disabled")
    carritoProductos.classList.remove("disabled")
    carritoAcciones.classList.remove("disabled")
    carritoComprado.classList.add("disabled")
 
    carritoProductos.innerHTML=""

    productosCarrito.forEach(prenda=>{

    const div= document.createElement("div")
    div.classList.add("carritoProducto")
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
                   ` 

    carritoProductos.append(div)
    })

    actualizarBotonesEliminar()
    actualizarTotal()
    
}else{

    carritoVacio.classList.remove("disabled")
    carritoProductos.classList.add("disabled")
    carritoAcciones.classList.add("disabled")
    carritoComprado.classList.add("disabled")

}   

}

cargarProductosCarrito()

function actualizarBotonesEliminar() {
    btnsEliminar = document.querySelectorAll(".carritoProductoEliminar");

    btnsEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){

    const idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);
    
    productosCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("prendasCarrito", JSON.stringify(productosCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito(){

    productosCarrito.length = 0;
    localStorage.setItem("prendasCarrito", JSON.stringify(productosCarrito));
        cargarProductosCarrito();

}

function actualizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productosCarrito.length = 0;
    localStorage.setItem("prendasCarrito", JSON.stringify(productosCarrito));
    
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");

}





















 