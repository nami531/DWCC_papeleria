// app/api/productos/[id]/route.js

const API_URL = "http://localhost:4000/productos";

export async function GET(request) {
    // LESSON: Es lo mismo que hacer const id = request.params.id; Si hubiese más parametros se pueden desestructurar a la vez Ejmp: const { id, name } = request.params;
    const {id} = request.params;
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if(!response.ok) throw new Error(`Error al obtener el producto ID = ${id}`);
        const producto = await response.json();
        return new Response(JSON.stringify(producto), { status: 200 });

    } catch (error) {
        console.error(`Error en GET /producto/${id}`, error);
        return new Response(`Error al obtener el producto ID = ${id}`, { status: 500 });
    }
};


