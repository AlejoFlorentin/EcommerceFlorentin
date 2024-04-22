const openMenu=document.querySelector("#openMenu")
const aside=document.querySelector("aside")
const closeMenu=document.querySelector("#closeMenu")
const numeritoMobile=document.querySelector("#numeritoMobile")

openMenu.addEventListener("click",()=>{
    aside.classList.add("asideVisible")
})

closeMenu.addEventListener("click",()=>{
    aside.classList.remove("asideVisible")
})

btnsCategorias.forEach(btn => btn.addEventListener("click",()=>{
    aside.classList.remove("asideVisible")
})
)

function actualizarNumeritoMobile(){

let nuevoNumeritoMobile = carrito.reduce((acc,prenda) => acc + prenda.cantidad , 0 )//a)A la variable carrito le aplicamos el metodo reduce para acumular la cant de prendas agregadas
                                                                                // y sumarlas y la almacenamos en la variable LET nuevo numerito , usamos ese tipo de variable
                                                                                //ya que este numero cambiara siempre
numeritoMobile.innerText=nuevoNumeritoMobile }