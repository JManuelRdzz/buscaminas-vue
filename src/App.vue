<template>
  <div id="app">
    <div>
      <div class="mensaje">{{mensajePartida}}</div>
      <header>
        <div>{{bombasRestantes}}</div>
        <button @click="reset">{{ detallesPartida }}</button>
        <Temporizador :iniciarTemporizador="iniciarTemporizador"/>
      </header>
      <div class="tablero">
        <CasillaItem v-for="(casilla, index) in casillas" :key="index" 
          :casilla="casilla" :juegoEnProgreso="juegoEnProgreso" @revelar="revelar(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CasillaItem from './components/CasillaItem.vue'
import Temporizador from './components/Temporizador.vue'
import { generarCasillas, numeroBombasTotales, obtenerCoordenadas, obtenerIndex } from './utils'

export default {
  name: 'App',
  components: {
    CasillaItem,
    Temporizador,
  },
  props:{
    mensaje: String
  },
  data: function() {
    return {
      casillas: generarCasillas(),
    }
  },
  computed: {
    bombasRestantes(){
      const totalMarcas = this.casillas.filter((casilla) => casilla.marcada).length;
      return numeroBombasTotales - totalMarcas;
    },
    juegoEnProgreso(){
      if(this.ganaste || this.perdiste) return false;
      return true;
    },
    iniciarTemporizador(){
      if(this.ganaste || this.perdiste) return false;
      if(this.casillas.find(casilla => casilla.revelado)) return true;
      return false;
    },
    perdiste(){
      return this.casillas.find(casilla => casilla.bomba && casilla.revelado)
    },
    ganaste(){
      const bombasMarcadasCorrectas = this.casillas.filter((casilla) => casilla.marcada && casilla.bomba).length;
      return bombasMarcadasCorrectas == 14;
    },
    detallesPartida(){
      if(this.perdiste) return "😢"
      if(this.ganaste) return "😎"
      return "🙂"
    },
    mensajePartida(){
      if(this.ganaste) return "GANASTE!!"
      if(this.perdiste) return "PERDISTE"
      return ""
    }
  },
  methods: {
    reset(){
      this.casillas = generarCasillas();
    },
    revelar(index){
      if(this.juegoEnProgreso){
        if(index == undefined) return;

        const casilla = this.casillas[index];

        if(casilla.marcada == false){
          if(!casilla.revelado){
            casilla.revelado = true;

            if(!casilla.bomba && casilla.bombasAlrededor == 0){
              const {renglon, columna} = obtenerCoordenadas(index);

              this.revelar(obtenerIndex(renglon - 1, columna - 1))
              this.revelar(obtenerIndex(renglon - 1, columna - 0))
              this.revelar(obtenerIndex(renglon - 1, columna + 1))
              this.revelar(obtenerIndex(renglon - 0, columna - 1))
              this.revelar(obtenerIndex(renglon - 0, columna + 1))
              this.revelar(obtenerIndex(renglon + 1, columna - 1))
              this.revelar(obtenerIndex(renglon + 1, columna - 0))
              this.revelar(obtenerIndex(renglon + 1, columna + 1))
            }
          }
        }
      }
    }
  },
}
</script>

<style scoped>
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 700;
    text-align: center;
  }

  .mensaje{
    font-size: 30px;
  }

  header {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 2em;
  }

  button {
    font-size: inherit;
  }

  .tablero {
    display: grid;
    grid-template-rows: repeat(10, auto);
    grid-template-columns: repeat(10, auto);
  }
</style>