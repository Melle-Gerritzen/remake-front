<script>

export default {

  name:'HelloWorld',

  props: {

    msg:String,

  },

  data() {

    return{

      count:0

    }

  }

}

</script>



<template>

  <h1>{{msg}}</h1>



  <div class="card">

    <button type="button" @click="count++">count is {{count}}</button>

  </div>

</template>



<style>

</style>