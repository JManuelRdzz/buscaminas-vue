<template>
    <div>{{ segundos }}</div>
</template>

<script>
export default({
    props: {
        iniciarTemporizador: Boolean
    },
    data: function(){
        return {
            segundos: 0,
            intervalID: undefined
        };
    },
    watch: {
        iniciarTemporizador(valor){
            if(valor){
                this.segundos = 0;
                this.intervalID = setInterval(() => {
                    this.segundos++;
                }, 1000);
                
            }else{
                this.segundos = this.segundos;
                clearInterval(this.intervalID);
            }
        }
    }
});
</script>
