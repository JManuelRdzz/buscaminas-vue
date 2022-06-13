export const numeroBombasTotales = 14;

export function obtenerIndex(renglon, columna){
    if(renglon < 0) return;
    if(columna < 0) return;
    if(renglon > 9) return;
    if(columna > 9) return;

    return renglon * 10 + columna;
}

export function obtenerCoordenadas(index) {
    return {
        renglon: Math.floor(index / 10),
        columna: index % 10
    }
}

export function generarCasillas() {
    const bombas = Array.from({ length: 100});

    let bombasPlantadas = 0;
    while (bombasPlantadas != numeroBombasTotales) {
        const index = Math.floor(Math.random() * 100);

        if(!bombas[index]){
            bombas[index] = 1;
            bombasPlantadas++;
        }
    }

    return bombas.map((bomba, index, array) => {
        const {renglon, columna} = obtenerCoordenadas(index);
        
        let bombasAlrededor = 0;
        if(array[obtenerIndex(renglon -1, columna -1)]) bombasAlrededor++;
        if(array[obtenerIndex(renglon -1, columna -0)]) bombasAlrededor++;
        if(array[obtenerIndex(renglon -1, columna +1)]) bombasAlrededor++;
        if(array[obtenerIndex(renglon -0, columna -1)]) bombasAlrededor++;
        if(array[obtenerIndex(renglon -0, columna +1)]) bombasAlrededor++;
        if(array[obtenerIndex(renglon +1, columna -1)]) bombasAlrededor++;
        if(array[obtenerIndex(renglon +1, columna -0)]) bombasAlrededor++;
        if(array[obtenerIndex(renglon +1, columna +1)]) bombasAlrededor++;

        return { bomba, bombasAlrededor, marcada: false, revelado: false};
    })
}