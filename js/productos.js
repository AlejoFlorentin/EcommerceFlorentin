let prendas=[]

fetch('./js/prendas.json')
    .then(response => response.json())
    .then(data => {
        prendas = data
        mostrarProductos(prendas)
    })
    



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









