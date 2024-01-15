alert("Bienvenido a Superlative")
let seleccionarProductos = parseInt(prompt( "\n1-Pantalon cargo $3000 \n2-Remera Oversize $1500 \n3-Pantalon de jean $5000 \n4-Zapatillas $6000 \n0-Salir"))
let seleccionarCantidad;
let total = 0;


const cantidad = (cant, precio) => {
  return cant * precio
}


while (seleccionarProductos != 0) {
    
  switch (seleccionarProductos) {

    case 1:
      seleccionarCantidad= parseInt(prompt("El producto seleccionado es Pantalon Cargo, indique la cantidad"))
            total = total + cantidad(seleccionarCantidad, 3000)
      break;

      case 2:
        seleccionarCantidad = parseInt(prompt("El producto seleccionado es Remera Oversize, indique la cantidad"))
        total = total + cantidad(seleccionarCantidad, 1500)
      break;

    case 3:
      seleccionarCantidad = parseInt(prompt("El producto seleccionado es Pantalon de Jean, indique la cantidad"))
      total = total + cantidad(seleccionarCantidad, 5000)
    break;

    case 4:
      seleccionarCantidad = parseInt(prompt("El producto seleccionado es Zapatillas, indique la cantidad"))
      total = total + cantidad(seleccionarCantidad, 6000)
    break;

    default:
      alert("Producto inexistente,vuelva a seleccionar")
    break;
  }
  seleccionarProductos = parseInt(prompt( "\n1-Pantalon cargo $3000 \n2-Remera Oversize $1500 \n3-Pantalon de jean $5000 \n4-Zapatillas $6000 \n0-Salir"))
}

alert("El total de la compra es de: " + total)

// envio()

const envio = () => {
    if (total >= 10000) {
      alert("El envio es gratuito , por que superaste $ 10.000")
    }else{
      total = total + 1000
      alert("El costo de envio es de 1000, el total es: " + total)
    }
}

// Forma de pago ()

const metodoDePago = () => {
  let metodo = prompt("Ingrese el metodo de pago, tarjeta o efectivo" )
  if (metodo == "tarjeta") {
    total = total * 1.1
    alert("Tenes un recargo , el total es:" +  total);
  }else if ( metodo == "efectivo") {
    total = total - 1000
    alert("Tenes un descuento de 1000, el total es:" + total)
  }

  
}

metodoDePago()

envio()

alert("Gracias , vuelva pronto!!")









