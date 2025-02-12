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


export async function PUT(request) {
    // LESSON: Es lo mismo que hacer const id = request.params.id; Si hubiese más parametros se pueden desestructurar a la vez Ejmp: const { id, name } = request.params;
    const {id} = request.params;
    try {
        const requestBody = await request.json();

        const response = await fetch(`${API_URL}/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(requestBody),
        });
        if(!response.ok) throw new Error(`Error al actualizar el producto ID = ${id}`);
        const producto = await response.json();
        return new Response(JSON.stringify(producto), { status: 201 });

    } catch (error) {
        console.error(`Error en PUT /producto/${id}`, error);
        return new Response(`Error al obtener el producto ID = ${id}`, { status: 500 });
    }
};

export async function DELETE(request) {
    // LESSON: Es lo mismo que hacer const id = request.params.id; Si hubiese más parametros se pueden desestructurar a la vez Ejmp: const { id, name } = request.params;
    const {id} = request.params;
    try {
        const response = await fetch(`${API_URL}/${id}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json', 
            },            
        });
        if(!response.ok) throw new Error(`Error al borrar el producto ID = ${id}`);
        return new Response(null, { status: 204 });

    } catch (error) {
        console.error(`Error en DELETE /producto/${id}`, error);
        return new Response(`Error al borrar el producto ID = ${id}`, { status: 500 });
    }
};


