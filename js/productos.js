let prendas=[]

fetch("/js/prendas.json")
    .then(response => response.json())
    .then(data => {
        prendas = data
        mostrarProductos(prendas)
    })

//Selecciono y almaceno en variables los elementos html de productos.html que voy a utilizar para aplicarle JS

const contenedorPrendas=document.querySelector("#contenedorProductos")
const btnsCategorias=document.querySelectorAll(".botonCategoria")
const tituloPrincipal=document.querySelector("#tituloPrincipal")
let btnAgregar=document.querySelectorAll(".prendaAgregar")
const numerito=document.querySelector("#numerito")

// 1°) Creo una funcion que muestre  las prendas que quiero del array

function mostrarProductos(productosSeleccionados) {

    contenedorPrendas.innerHTML="" //a) Inserto este string vacio asi cada vez q entramos a una seccion arranco de cero y continua el codigo de abajo y no se repiten los productos

    //b)Utilizamos el metodo forEach que nos devuelve todos los elementos del array de objetos
    productosSeleccionados.forEach(prenda=>{

    const div=document.createElement("article") //c) Creamos un elemento y lo almacenamos en una variable
    div.classList.add("producto") //d) A este elemento le agregamos la clase "producto" , la cual tiene ciertos estilos de css
    div.innerHTML=`
        <img class="productoImagen" src="${prenda.imagen}" alt="${prenda.nombre}">
        <div class="productoInfo">
            <h3 class="productoTitulo">${prenda.nombre}</h3>
            <p class="productoPrecio">$ ${prenda.precio}</p>
            <button class="prendaAgregar" id="${prenda.id}">Agregar</button>
        </div>
        `//e) Al elemento creado le introducimos este codigo html con las propiedades de los objetos del array que recorrimos con el metodo forEach , para eso sirvio ese metodo
    contenedorPrendas.append(div)
    //f)Con .append agregamos todo lo anterior al contenedor seleccionador anteriormente    
    })

    actualizarBtnsAgregar()

}



// 2) Aplico un "EVENTO" a los todos botones de las distintas "CATEGORIAS" para que cuando les haga "CLICK" me "FILTRE" las prendas que corresponden
// a dicho boton

//a) Aplico un forEach a la variable btnsCategorias que me va a devolver un array con todos los botones
btnsCategorias.forEach(btn =>{

    btn.addEventListener("click",e=>{ //b) A cada boton le aplico un EVENTO CLICK 

        btnsCategorias.forEach(btn=>btn.classList.remove("active"))//c) Al hacerle click vuelve a recorrer los btns y se asegura de removerle la clase active a todos
        e.currentTarget.classList.add("active") //d)Luego de removerle la clase active a todos , se la activa al boton que clickeamos (el currentTarget se utiliza para 
                                                                                                                                        // para que si o si apuntemos al boton)
        if(e.currentTarget.id != "todos"){ 

        const prendaCategoria=prendas.find(producto=>producto.categoria===e.currentTarget.id)   // e) Si el id del btn es distinto que el id="todos" buscamos con el metodo find
        tituloPrincipal.innerText=prendaCategoria.categoria                                     // en el array de objetos la primerr prendaa q coincida ,la categoria y el id del boton y tambien
                                                                                                // cambiamos con innerText el elemento titulo principal por la categoria elegida
                                                                                                

        const prodBtn=prendas.filter(prenda=>prenda.categoria==e.currentTarget.id) // f) Con el metodo .filter buscamos todos los elementos en la que su categoria coincidan con el id
        mostrarProductos(prodBtn)                                                   // del boton y llamamos a la funcion mostrarProductos para mostrarlos
        

        }else{ // g) Sino pasa lo anterior mostramos todos los productos

        tituloPrincipal.innerText="Todos los productos"    
        mostrarProductos(prendas)
            
        }

    })

})


//3)Creamos una funcion con un EVENTO para q cuando hagamos CLICK en el boton agregar nos agregue una prenda al carrito
function actualizarBtnsAgregar(){

  btnAgregar=document.querySelectorAll(".prendaAgregar")  // a) La variable donde llamamos a todos los btn Agregar fue creada con LET por que siempre
                                                            // cambian la cantidad de botones , si la hiciesemos con CONST daria error ya que 
                                                            // ese tipo de variable no se puede cambiar de valor

  btnAgregar.forEach(boton=>{ // Aplicamos forEach para buscar todos los btns Agregar y meterlos en un array

    boton.addEventListener("click",agregarAlCarrito) // b) Aca aplicamos evento click a cada boton que aparece

  })

} //e La funcion la agregamos al fondo de la funcion mostrarProductos ya que al cambiar la cant de productos cuando filtramos los productos por su categoria cambian
 //la cant de btns agregar


//4) Creacion carrito
let carrito

let productosCarritoLS=localStorage.getItem("prendasCarrito") //i)llamamos a la local storage con los productos guardados sin parsearlos

if (productosCarritoLS) {

    carrito=JSON.parse(productosCarritoLS) //j)Si hay productos guardado  parsearlos y guardarlos en carrito y luego actualizar el numerito
    actualizarNumerito()

} else {

    carrito=[] //k)Sino dejarlo vacio y no actualizar

}


//a)Creamos la funcion que agrega prendas al carrito donde si el idBtn no se encuentra pasa al ELSE y se agrega el producto al carrito y si se repite
// pasa al if y se aumenta el numero de cantidad
function agregarAlCarrito(e){

    Toastify({

    text: "Producto Agregado",
    duration: 3000,
    destination: "http://127.0.0.1:5500/pages/carrito.html",
    newWindow: true,
    offset: {
    x: "2rem", 
    y: 2 
  },
    gravity: "top", 
    position: "right", 
     stopOnFocus: true, 
    style: {
    background: "black",
    borderRadius:"2rem"
    },
  onClick: function(){} 
            
}).showToast();

    const idBtn=e.currentTarget.id //b)Guardamos el id del btnAgregar clickeado en una variable
    const prendaAgregada=prendas.find(prnda => prnda.id === idBtn) //c)Le aplicamos el metodo .find al array de productos para q nos traiga el primer producto
                                                                    // q coincida con el id guardado anteriormente
    if (carrito.some(prenda=>prenda.id===idBtn)) { //e)Aplicamos el metodo .some para ver si la prenda existe en el carrito 

        const index=carrito.findIndex(prenda => prenda.id === idBtn)//g)Si la prenda existe buscamos el index en el carrito q coincida con el id del btn agregar para luego
        carrito[index].cantidad++                                   // aumentar su cantidad
        
        
    }else{
     
     prendaAgregada.cantidad=1   
     carrito.push(prendaAgregada) //f)Si la prenda no esta en el carrito  se lo coloca una propiedad nueva llamada cantidad con 
                                    // un valor de 1 y se agrega al carrito , esto se hace para luego si se agrega de vuelta aumentar la propiedad cantidad y no el nro de elementos del array carrito

    }
    
    actualizarNumerito()

    localStorage.setItem("prendasCarrito",JSON.stringify(carrito))//h)Guardamos todos los productos agregados en la localStorage

}

//5)Creamos la funcion actualizar numerito de la cantidad de articulos en el carrito
function actualizarNumerito(){

let nuevoNumerito = carrito.reduce((acc,prenda) => acc + prenda.cantidad , 0 )//a)A la variable carrito le aplicamos el metodo reduce para acumular la cant de prendas agregadas
                                                                                // y sumarlas y la almacenamos en la variable LET nuevo numerito , usamos ese tipo de variable
                                                                                //ya que este numero cambiara siempre
numerito.innerText=nuevoNumerito //b)Luego con inner text agregamos el valor de nuevoNumerito en el elemento numerito del html
}
//c)La funcion la agregaremos abajo de todo de la funcion agregarAlcarrito asi el numero se va actualizando a medida que se vayan agregando productos








