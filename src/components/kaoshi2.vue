<template>


  <div>

    <div v-for="(item,index) in goods" :key="index">

      <img :src="'http://localhost:8000/static/upload/'+item.img"	width="240" height="240">



      <div v-html="item.name"></div>
      ￥{{  item.price }}
      {{  item.desc}}

    </div>

    					<Pagination small @change="get_goods" v-model="pagination" ></Pagination>   



      
  </div>
</template>

<script>
export default {

  data(){
    return{
      text:'',
      //HeyUI分页数据
      goods:[],
      pagination: {
          page: 1,
          size: 2,
          total: 4
        },
    }
  },

  mounted(){
    this.text = this.$route.query.text;
    this.get_goods();
  },
  methods:{


    //HeiUI分页
	  get_goods(value){

		  this.axios.get('http://localhost:8000/kaoshi/',{params:{text:this.text,page:this.pagination.page,size:this.pagination.size}}).then(result=>{
       	//手动高亮
			  for(let i=0;i<result.data.data.length;i++){

				  result.data.data[i]['name'] = result.data.data[i]['name'].replace(new RegExp(this.text,'g'),'<span class="highlight">'+this.text+'</span>')
			  }
			  this.goods = result.data.data
			  this.pagination.total = result.data.total
  

		  })

	  },

  },

}
</script>

<style>

.highlight{
	color: chartreuse;
}


</style>