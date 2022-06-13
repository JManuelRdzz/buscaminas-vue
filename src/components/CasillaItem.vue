<template>
    <div 
        class="casilla" 
        :style="{ 
            color: color, 
            backgroundColor: backgroundColor 
        }" 
        @click="revelar"
        @click.right.prevent="marcar"
    > {{ content }} 
    </div>
</template>

<script>
export default {
    props: {
        casilla: Object,
        juegoEnProgreso: Boolean
    },
    computed: {
        content() {
            if(this.casilla.marcada && this.casilla.revelado == false) return "❌"
            if(!this.casilla.revelado) return ""
            if(this.casilla.bomba) return "💣"
            if(this.casilla.bombasAlrededor) return this.casilla.bombasAlrededor;
            return "";
        },
        color() {
            if(this.casilla.bombasAlrededor == 1) return "blue";
            if(this.casilla.bombasAlrededor == 2) return "green";
            if(this.casilla.bombasAlrededor == 3) return "red";
            if(this.casilla.bombasAlrededor == 4) return "purple";
            if(this.casilla.bombasAlrededor == 5) return "brown";
            if(this.casilla.bombasAlrededor == 6) return "turquoise";
            if(this.casilla.bombasAlrededor == 7) return "black";
            return "gray"
        },
        backgroundColor(){
            if(this.casilla.revelado) return "#eee";
            return "white";
        }
    },
    methods: {
        revelar(){
            this.$emit("revelar");
        },
        marcar(){
            if(this.juegoEnProgreso && this.casilla.revelado == false)
                this.casilla.marcada = !this.casilla.marcada;
        }
    },
}
</script>

<style scoped>
    .casilla {
        width: 50px;
        height: 50px;
        border: 1px solid lightgray;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>