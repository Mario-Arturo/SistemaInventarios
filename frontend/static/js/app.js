async function cargarProductos(busqueda = '', categoria = '') {
    try {
        const respuesta = await fetch('/api/productos/');
        const productos = await respuesta.json();

        const tabla = document.querySelector('#tabla-productos');

        tabla.innerHTML = '';

        const productosFiltrados = productos.filter(producto => {
            const coincideNombre = producto.nombre
                .toLowerCase()
                .includes(busqueda.toLowerCase());

            const coincideCategoria = categoria === '' ||
                producto.categoria === categoria;

            return coincideNombre && coincideCategoria;
        });

        productosFiltrados.forEach(producto => {
            const stockBajo = producto.cantidad <= producto.nivel_minimo;
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>$${producto.precio}</td>
                <td>
                    <span class="badge ${stockBajo ? 'text-bg-danger' : 'text-bg-success'}">
                        ${producto.cantidad}
                    </span>
                </td>
                <td>${producto.proveedor}</td>
                <td>
                    <button 
                        class="btn btn-sm btn-warning btn-editar"
                        data-id="${producto.id}">
                        Editar
                    </button>

                    <button 
                        class="btn btn-sm btn-danger btn-eliminar"
                        data-id="${producto.id}">
                        Eliminar
                    </button>
                </td>
            `;

            tabla.appendChild(fila);
        });

        document.querySelectorAll('.btn-editar').forEach(boton => {
            boton.addEventListener('click', () => {
                editarProducto(boton.dataset.id);
            });
        });

        document.querySelectorAll('.btn-eliminar').forEach(boton => {
            boton.addEventListener('click', () => {
                eliminarProducto(boton.dataset.id);
            });
        });

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}


cargarProductos();


const btnNuevoProducto = document.querySelector('#btn-nuevo-producto');
const formularioProducto = document.querySelector('#formulario-producto');
const formProducto = document.querySelector('#form-producto');
const btnCancelar = document.querySelector('#btn-cancelar');

let productoEditando = null;


btnNuevoProducto.addEventListener('click', () => {
    productoEditando = null;

    formProducto.reset();

    document.querySelector('#formulario-producto h4').textContent = 'Nuevo producto';

    formularioProducto.classList.remove('d-none');
});


btnCancelar.addEventListener('click', () => {
    formularioProducto.classList.add('d-none');
    formProducto.reset();

    productoEditando = null;
});


formProducto.addEventListener('submit', async (event) => {
    event.preventDefault();

    const producto = {
        nombre: document.querySelector('#nombre').value,
        categoria: document.querySelector('#categoria').value,
        descripcion: document.querySelector('#descripcion').value,
        precio: document.querySelector('#precio').value,
        cantidad: document.querySelector('#cantidad').value,
        proveedor: document.querySelector('#proveedor').value,
        nivel_minimo: document.querySelector('#nivel_minimo').value
    };

    try {
        let respuesta;

        if (productoEditando) {
            respuesta = await fetch(`/api/productos/${productoEditando}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
        } else {
            respuesta = await fetch('/api/productos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
        }

        if (!respuesta.ok) {
            throw new Error('No se pudo guardar el producto');
        }

        formularioProducto.classList.add('d-none');
        formProducto.reset();

        productoEditando = null;

        await cargarProductos();

    } catch (error) {
        console.error('Error al guardar el producto:', error);
    }
});


async function editarProducto(id) {
    try {
        const respuesta = await fetch(`/api/productos/${id}/`);
        const producto = await respuesta.json();

        productoEditando = id;

        document.querySelector('#nombre').value = producto.nombre;
        document.querySelector('#categoria').value = producto.categoria;
        document.querySelector('#descripcion').value = producto.descripcion;
        document.querySelector('#precio').value = producto.precio;
        document.querySelector('#cantidad').value = producto.cantidad;
        document.querySelector('#proveedor').value = producto.proveedor;
        document.querySelector('#nivel_minimo').value = producto.nivel_minimo;

        document.querySelector('#formulario-producto h4').textContent = 'Editar producto';

        formularioProducto.classList.remove('d-none');

    } catch (error) {
        console.error('Error al obtener el producto:', error);
    }
}


async function eliminarProducto(id) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) {
        return;
    }

    try {
        const respuesta = await fetch(`/api/productos/${id}/`, {
            method: 'DELETE'
        });

        if (!respuesta.ok) {
            throw new Error('No se pudo eliminar el producto');
        }

        await cargarProductos();

    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}


// Búsqueda de productos
const campoBusqueda = document.querySelector('input[placeholder="Buscar producto..."]');

campoBusqueda.addEventListener('input', () => {
    cargarProductos(campoBusqueda.value, filtroCategoria.value);
});

const filtroCategoria = document.querySelector('#filtro-categoria');

filtroCategoria.addEventListener('change', () => {
    cargarProductos(campoBusqueda.value, filtroCategoria.value);
});