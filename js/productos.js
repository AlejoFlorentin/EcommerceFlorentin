const prendas = [

{
    id:"1",
    nombre:"Remera Oversize Negra",
    precio:25000,
    categoria:"Remeras",
    imagen:"/Assets/img/remeras/remeraOvNegra.png",

},
{
    id:"2",
    nombre:"Remera Oversize Roja",
    precio:25000,
    categoria:"Remeras",
    imagen:"/Assets/img/remeras/remeraOvRoja.jpg",

},
{
    id:"3",
    nombre:"Remera Oversize Beige",
    precio:25000,
    categoria:"Remeras",
    imagen:"/Assets/img/remeras/remeraOvBeige.webp",

},
{
    id:"4",
    nombre:"Remera Oversize Estampada",
    precio:30000,
    categoria:"Remeras",
    imagen:"/Assets/img/remeras/remeraOvEstampa.jpg",

},
{
    id:"5",
    nombre:"Jean Roto Recto",
    precio:60000,
    categoria:"Pantalones",
    imagen:"/Assets/img/pantalones/jeanRotoRecto.webp",

},
{
    id:"6",
    nombre:"Jogger Negro",
    precio:45000,
    categoria:"Pantalones",
    imagen:"/Assets/img/pantalones/joggerNegro.webp",

},
{
    id:"7",
    nombre:"Jean Recto Negro",
    precio:50000,
    categoria:"Pantalones",
    imagen:"/Assets/img/pantalones/jeanNegroRecto.webp",

},
{
    id:"8",
    nombre:"Pantalon Cargo",
    precio:47000,
    categoria:"Pantalones",
    imagen:"/Assets/img/pantalones/pantalonCargo.jpg",

},
{
    id:"9",
    nombre:"Bermuda Cargo",
    precio:40000,
    categoria:"Bermudas",
    imagen:"/Assets/img/bermudas/bermudaCargo.webp",

},
{
    id:"10",
    nombre:"Bermuda de Jean Rota",
    precio:30000,
    categoria:"Bermudas",
    imagen:"/Assets/img/bermudas/bermudaDeJeanRota.webp",

},
{
    id:"11",
    nombre:"Bermuda Negra",
    precio:40000,
    categoria:"Bermudas",
    imagen:"/Assets/img/bermudas/bermudaNegra.jpg",

},
{
    id:"12",
    nombre:"Bermuda de jean",
    precio:45000,
    categoria:"Bermudas",
    imagen:"/Assets/img/bermudas/bermudaJean.webp",

},
{
    id:"13",
    nombre:"Nike Air Force 07 White",
    precio:180000,
    categoria:"Zapatillas",
    imagen:"/Assets/img/zapatillas/AirForce07.png",

},
{
    id:"14",
    nombre:"Adidas Yeezy 350",
    precio:250000,
    categoria:"Zapatillas",
    imagen:"/Assets/img/zapatillas/Yeezy 350.jpg",

},
{
    id:"15",
    nombre:"Nike Dunk Low Panda",
    precio:220000,
    categoria:"Zapatillas",
    imagen:"/Assets/img/zapatillas/dunkPanda.jpg",

},
{
    id:"16",
    nombre:"Nike Blazer Mid",
    precio:150000,
    categoria:"Zapatillas",
    imagen:"/Assets/img/zapatillas/blazerMid.jpg",

},
{
    id:"17",
    nombre:"Boxer Negro",
    precio:7000,
    categoria:"Accesorios",
    imagen:"/Assets/img/accesorios/boxer negro.jpg",

},
{
    id:"18",
    nombre:"Boxer Azul Marino",
    precio:7000,
    categoria:"Accesorios",
    imagen:"/Assets/img/accesorios/boxerAzulMarino.webp",

},
{
    id:"19",
    nombre:"Piluso Supreme",
    precio:15000,
    categoria:"Accesorios",
    imagen:"/Assets/img/accesorios/pilusoSupreme.jpg",

},
{
    id:"20",
    nombre:"Medias Supreme",
    precio:10000,
    categoria:"Accesorios",
    imagen:"/Assets/img/accesorios/mediasSupreme.jpg",

},


]

const contenedorPrendas=document.querySelector("#contenedorProductos")
const btnsCategorias=document.querySelectorAll(".botonCategoria")
const tituloPrincipal=document.querySelector("#tituloPrincipal")
let btnAgregar=document.querySelectorAll(".prendaAgregar")
const numerito=document.querySelector("#numerito")


function mostrarProductos(productosSeleccionados) {

    contenedorPrendas.innerHTML=""

    productosSeleccionados.forEach(prenda=>{

    const div=document.createElement("article")
    div.classList.add("producto")
    div.innerHTML=`
        <img class="productoImagen" src="${prenda.imagen}" alt="${prenda.nombre}">
        <div class="productoInfo">
            <h3 class="productoTitulo">${prenda.nombre}</h3>
            <p class="productoPrecio">$ ${prenda.precio}</p>
            <button class="prendaAgregar" id="${prenda.id}">Agregar</button>
        </div>
        `
    contenedorPrendas.append(div)    
    })

    actualizarBtnsAgregar()

}

mostrarProductos(prendas)

btnsCategorias.forEach(btn =>{

    btn.addEventListener("click",e=>{

        btnsCategorias.forEach(btn=>btn.classList.remove("active"))
        e.currentTarget.classList.add("active")

        if(e.currentTarget.id != "todos"){

        const prendaCategoria=prendas.find(producto=>producto.categoria===e.currentTarget.id)
        tituloPrincipal.innerText=prendaCategoria.categoria

        const prodBtn=prendas.filter(prenda=>prenda.categoria==e.currentTarget.id)
        mostrarProductos(prodBtn)

        }else{

        tituloPrincipal.innerText="Todos los productos"    
        mostrarProductos(prendas)
            
        }

    })

})

function actualizarBtnsAgregar(){

  btnAgregar=document.querySelectorAll(".prendaAgregar")  

  btnAgregar.forEach(boton=>{

    boton.addEventListener("click",agregarAlCarrito)

  })

}



let carrito

let productosCarritoLS=localStorage.getItem("prendasCarrito")

if (productosCarritoLS) {

    carrito=JSON.parse(productosCarritoLS)
    actualizarNumerito()

} else {

    carrito=[]

}



function agregarAlCarrito(e){

    const idBtn=e.currentTarget.id
    const prendaAgregada=prendas.find(prnda => prnda.id === idBtn)
    
    if (carrito.some(prenda=>prenda.id===idBtn)) {

        const index=carrito.findIndex(prenda => prenda.id === idBtn)
        carrito[index].cantidad++
        
        
    }else{
     
     prendaAgregada.cantidad=1   
     carrito.push(prendaAgregada) 

    }
    
    actualizarNumerito()

    localStorage.setItem("prendasCarrito",JSON.stringify(carrito))

}


function actualizarNumerito(){

let nuevoNumerito = carrito.reduce((acc,prenda) => acc + prenda.cantidad , 0 )
numerito.innerText=nuevoNumerito
}








