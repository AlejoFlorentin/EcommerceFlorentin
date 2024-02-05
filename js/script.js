const indumentaria = [{id:1,tipo:"Pantalon cargo",precio:40950,marca:"Freres"},
                      {id:2,tipo:"Remera Oversize",precio:25000,marca:"Tussy"},
                      {id:3,tipo:"Pantalon Jean",precio:80000,marca:"Levis"},
                      {id:4,tipo:"Zapatillas Air Force 07",precio:180200,marca:"Nike"},
                      {id:5,tipo:"Zapatillas Superstar",precio:50500,marca:"Adidas"},
                      {id:6,tipo:"Remera lisa",precio:22500,marca:"Zara"},]



class carrito{

        constructor(){

            this.prendas=[],
            this.recargo=1.21,
            this.envio=1000

        }

        agregarPrendas(id){

           let prenda = indumentaria.find(prenda=>prenda.id===id)

           if (prenda) {

            this.prendas.push(prenda)
            alert( prenda.tipo + " añadido al carrito")
            
           }else{

            alert("No se encontro el producto , intentelo otra vez")

           }
        }

        sumaTotal(){
            
            let total=this.prendas.reduce((acumulador,elemento)=>acumulador+elemento.precio,0)
            return total
           
            
            


        }

        metododepago(total){

            let metodo = prompt("Ingrese el metodo de pago, tarjeta o efectivo" )
            if (metodo == "tarjeta" ) {

                total = total * this.recargo
                alert("Tenes un recargo del 21% , el total es: $" +  total);

                } else if ( metodo == "efectivo" ) {

                total = total - 10000
                alert("Tenes un descuento de $ 10.000, el total es: $" + total)

                }else{
                    alert("Metodo inexistente")
                }

      

        }

        envios(total){

            if (total >= 30000) {

            alert("El envio es gratuito , por que superaste $ 30.000")

                } else if(total<30000){

                total = total + 3000
                alert("El costo de envio es de 3000, el total con envio es de: " + total)
               }
        }



}


const listaIndumentaria = ()=>{

    let prendasDisponibles="";

    indumentaria.forEach(prenda=>{

        prendasDisponibles = prendasDisponibles + prenda.id + "- " + prenda.tipo + " " + prenda.marca + " $"+prenda.precio + "\n";
    })

    return prendasDisponibles
}

const nuevoCarrito = new carrito()

alert("Bienvenido a Superlartive")

let seleccionarProductos=parseInt(prompt("Selecciona el producto que queres comprar!\nSelecciona 0 si deseas salir\n \n" + listaIndumentaria() ))

while (seleccionarProductos!=0) {



switch (seleccionarProductos) {
    case seleccionarProductos:

     nuevoCarrito.agregarPrendas(seleccionarProductos);
     
        
        break;

    
        

    default:

    alert("Producto inexistente,vuelva a seleccionar")

        break;
}

   

     seleccionarProductos=parseInt(prompt("Selecciona el producto que queres comprar!\nSelecciona 0 si deseas salir\n \n" + listaIndumentaria() ))

   
    
}

const subTotPag = nuevoCarrito.sumaTotal()
alert("El subtotal es de " + subTotPag)

const totMedioPago=nuevoCarrito.metododepago(subTotPag)

nuevoCarrito.envios(subTotPag)










