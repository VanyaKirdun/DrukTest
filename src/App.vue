<template>
  <div id="app">
    <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">{{itemData.title}}</h3>
        <div slot="body">
            <div class="image">
                <img v-if="itemData.preview != null" :src="itemData.preview" v-bind:alt="itemData.title">
                <img v-else :src="itemData.image" v-bind:alt="itemData.title">
            </div>
            <div v-if="itemData.description != null && itemData.description != ''" v-html='itemData.description'></div>
            <div v-else v-html='itemData.alias'></div>
        </div>
    </modal>

    <h3>Фильтр по: is_published<input type="checkbox" id="is_published" value=true v-model="togglePub"> is_available<input type="checkbox" value=true id="is_available" v-model="toggleAvi"></h3>
    <div class="container">
      <div class="item" v-for="post in filterData" :key="post.id">
        <div class="image">
          <img :src="post.preview" v-bind:alt="post.title">
        </div>
        <h2 id="show-modal" v-if="post.title != ''" @click="showModal = true; itemData = post">{{post.title}}</h2>
        <h2 id="show-modal" v-else @click="showModal = true; itemData = post">Условное название</h2>
        <p @click="showModal = true; itemData = post.catalog">Каталог: {{post.catalog.title}}</p>
        <p>Тираж: {{post.default_count}}</p>
        <p>Популярность: {{post.is_popular}}</p>
        <p>Публичность: {{post.is_published}}</p>
      </div>
    </div>
  </div>  
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'app',
    // computed: mapGetters(['allPosts']),
    computed: {
      filterData(){
        let data = this.$store.getters.allPosts;

        let dataMass = []
        if(this.togglePub[0] || this.toggleAvi[0]){
          for(let value in data){
            let buff = false
            if(this.togglePub[0]){
              if(+data[value].is_published){
                buff = value
              }
            }
            if(this.toggleAvi[0]){
              if(+data[value].is_available){
                buff = value
              }
            }
            if(buff){
              dataMass.push(data[buff])
            }
          }
        }
        else{
          dataMass = data
        }
        return dataMass
      }
    },
    methods: mapActions(['fetchPosts']),
    data: function () {
        return {
            showModal: this.showModal,
            itemData: this.itemData,
            togglePub: [],
            toggleAvi: []
        }
    },
    async mounted() {
      this.fetchPosts(30)
    }
  }
</script>

<style lang="scss">
  @import './assets/scss/style';
</style>
