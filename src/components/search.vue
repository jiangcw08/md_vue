<template>
  <div>

	  	<myheader></myheader>


		<section class="products text-center">
			<div class="container">
				<h3 class="mb-4">商品检索</h3>

				<Button @click="get_goods(price)">价格从高到低</Button><Button @click="get_goods({'price':'+'})">价格从低到高</Button>
				<div class="row">
					
					<div class="col-sm-6 col-md-3 col-product" v-for="(item,index) in goods" :key="index">
						<figure>
							
							<img style="height:150px;" class="rounded-corners img-fluid" :src="'http://localhost:8000/static/upload/'+item.img"	width="240" height="240">
							<figcaption>
								<div class="thumb-overlay"><a :href="'http://localhost:8080/item/?id='+item.id" title="More Info">
									<i class="fas fa-search-plus"></i>
								</a></div>
							</figcaption>
						</figure>
						<h4><a :href="'http://localhost:8080/item/?id='+item.id">
						
						<!-- {{ item.name  | myfilter }} -->

						<!-- <div v-html="$options.filters.myfilter(item.name)"></div> -->
						<!-- 手动高亮 -->
						<div v-html="item.name"></div>
						<!-- end -->
						</a></h4>
						<p><span class="emphasis">${{ item.price }}</span></p>
					</div>		
	
				</div>

				<!-- HeyUI分页 -->
					<Pagination small @change="get_goods" v-model="pagination" ></Pagination>   

					
			
			</div>

		</section>
		
		<footer class="footer">

		<div class="container">
			@v3u.cn
		</div>
		
		
	</footer>
    
  </div>
  
</template>


 
<script>

import myheader from './myheader'
export default {
  data () {
    return {
      msg: "这是一个变量",
	  imgs:[],
	  //HeyUI分页数据
	  goods:[],
	  pagination: {
        page: 1,
        size: 2,
        total: 4
	  },
	  text:'',

    }
  },

  filters:{

	  myfilter(value){

		  console.log(window.that.text)

		  value = value.replace(new RegExp(window.that.text,'g'),'<span class="highlight">'+window.that.text+'</span>')
		  
		  
		  return value;

	  },

  },
  mounted:function(){

	  //传递公共变量
	  window.that = this;

	  this.text = this.$route.query.text;

	  //判断
	  if(this.text.indexOf(' ')){
		  
		  this.text = this.text.split(' ');
	  }
	  
	  //格式转换

	  this.text = JSON.stringify(this.text)
	  

	  this.get_goods();
	  console.log(this.text)

  
},

components:{
	myheader
},
  methods:{

	  //HeiUI分页
	  get_goods(value){


		//   console.log(value)

		  this.axios.get('http://localhost:8000/goodslist/',{params:{text:this.text,page:this.pagination.page,size:this.pagination.size}}).then(result=>{
			  
			 
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