<template>
  <div>

	  	<myheader></myheader>

		
		<div id="carousel" class="carousel slide" data-ride="carousel">
		
	
			<div class="carousel-inner">
			
								<!-- 轮播图 -->
				<Carousel :height="500" @click="clickimg" :datas="imgs"></Carousel>	
			
			</div>
		</div>
		<section class="collections text-center ">
			<div class="container-fluid">
				<div class="row">
					<div class="collection col-md-6 alt-background">
						<div class="container container-right text-center">
							<div>
								<h1>Women's</h1>
								<p class="lead">Spring/Summer 2018 Collection</p>
								<a href="catalog.html" class="btn btn-outline-secondary">Browse Women's</a>
							</div>
						</div>
					</div>
					<div class="collection col-md-6 bg-secondary inverted">
						<div class="container container-left text-center">
							<div>
								<h1>Men's</h1>
								<p class="lead">Spring/Summer 2018 Collection</p>
								<a href="catalog.html" class="btn btn-outline-white">Browse Men's</a>
							</div>
						</div>
					</div>
				</div>
			</div>
    </section>
    
		<section class="featured-block text-center">

			<!-- 中间展示 -->
						<div class="container">
				<div class="row justify-center">
					<div class="col-md-6 text-center">
						<img class="mt-4 mb-4 img-fluid" src="../assets/images/placeholder-jacket.png" style="width: 100%;">
					</div>
					<div class="col-md-6 text-center text-md-left">
						<h2 class="mb-3">Spring/Summer Collection 2018</h2>
						<p class="lead mt-2 mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus erat sed sem sagittis cursus.</p>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Suspendisse cursus erat sed sem sagittis cursus. Etiam porta sem malesuada magna mollis euismod.</p>
						<a href="#" class="btn btn-md btn-outline-primary mt-3">Shop Now</a>
					</div>
				</div>
			</div>
			<!-- end -->
		</section>
		
		<section class="products text-center">
			<div class="container">
				<h3 class="mb-4">HeyUI分页</h3>

				<Button @click="get_goods(price)">价格从高到低</Button><Button @click="get_goods({'price':'+'})">价格从低到高</Button>
				<div class="row">
					
					<div class="col-sm-6 col-md-3 col-product" v-for="(item,index) in goods" :key="index">
						<figure>
							
							<img class="rounded-corners img-fluid" :src="'http://localhost:8000/static/upload/'+item.img"	width="240" height="240">
							<figcaption>
								<div class="thumb-overlay"><a :href="'http://localhost:8080/item/?id='+item.id" title="More Info">
									<i class="fas fa-search-plus"></i>
								</a></div>
							</figcaption>
						</figure>
						<h4><a :href="'http://localhost:8080/item/?id='+item.id">{{ item.name }}</a></h4>
						<p><span class="emphasis">${{ item.price }}</span></p>
					</div>		
	
				</div>

				<!-- HeyUI分页 -->
					<Pagination small @change="get_goods" v-model="pagination" ></Pagination>   

					
			
			</div>

						<div class="container">
				<h3 class="mb-4">自主分页</h3>
				<div class="row">
					
					<div class="col-sm-6 col-md-3 col-product" v-for="(item,index) in goods_self" :key="index">
						<figure>
							
							<img class="rounded-corners img-fluid" :src="'http://localhost:8000/static/upload/'+item.img"	width="240" height="240">
							<figcaption>
								<div class="thumb-overlay"><a :href="'http://localhost:8080/item/?id='+item.id" title="More Info">
									<i class="fas fa-search-plus"></i>
								</a></div>
							</figcaption>
						</figure>
						<h4><a :href="'http://localhost:8080/item/?id='+item.id">{{ item.name }}</a></h4>
						<p><span class="emphasis">${{ item.price }}</span></p>
					</div>		
	
				</div>

				<Button v-show="lastpage" @click="get_goods_self(lastpage)">上一页</Button>
					
					<span v-for="(item,index) in lpage" :key="index">
						<a @click="get_goods_self(item)">{{ item }}</a>&nbsp;&nbsp;
					</span>

					<a @click="get_goods_self(page)">{{  page }}</a>&nbsp;&nbsp;

					<span v-for="item in rpage">
						<a @click="get_goods_self(item)">{{ item }}</a>&nbsp;&nbsp;
					</span>	

				<Button v-show="nextpage" @click="get_goods_self(nextpage)">下一页</Button>

				<input size="1" type="text" @input="jump_page($event)">
			</div>
		</section>
		
		<div class="divider"></div>
		
		<section class="cta text-center">
			<div class="container">
				<h3 class="mt-0 mb-4">Sign up now to save 10% on your first order</h3>
				<form class="subscribe">
					<div class="form-group row pt-3">
						<div class="col-sm-8 mb-3">
							<input type="text" class="form-control" id="inputName" placeholder="Your Name">
						</div>
						<div class="col-sm-4">
							<button type="submit" class="btn btn-lg btn-outline-primary">Sign me up</button>
						</div>
					</div>
				</form>
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
	  //分页偏移
	  lpage:[],
	  rpage:[],	  
	  //自主分页数据
	  lastpage:0,
	  nextpage:0,
	  page:1,
	  goods_self:[],
	  total_self:0,
	  allpage:0,
	  size:1,
	  //HeyUI分页数据
	  goods:[],
	  pagination: {
        page: 1,
        size: 2,
        total: 4
      },
    }
  },
  mounted:function(){

	  this.get_caroule();
	  this.get_goods();
	  this.get_goods_self(1);
	  
  
},

components:{
	myheader
},
  methods:{
	  //自主分页跳转
	  jump_page(e){

		  var val = e.target.value;
		  console.log(val)

		  if(val >this.allpage){
			  this.$Message('超过页码范围')
			  return false;
		  }else{
			  if(val != ''){
				  this.get_goods_self(val)
			  }
			  
		  }

	  },

	  //自主分页
	  get_goods_self(page){


		  this.page = page

		  this.axios.get('http://localhost:8000/goodslist/',{params:{'page':page,'size':this.size}}).then(result=>{

			  this.goods_self = result.data.data;
			  this.total_self = result.data.total;
			  
			  
			  //判断上一页
			  if(page==1){
				  this.lastpage = page;
			  }else{
				  this.lastpage = page - 1;
			  }
			  //计算总页数
			  this.allpage = Math.ceil(this.total_self / this.size)

			  //判断下一页
			  if(page == this.allpage){
				  this.nextpage = page;
			  }else{
				  this.nextpage = page + 1;
			  }
			
			  //设置偏移量
			  var move_page = 2;

			  var lpage = [];

			  //计算左侧偏移量
			  for(let i=page-move_page;i<page;i++){
				  
				  if(i>0){
					  lpage.push(i);
				  }
			  }
			  this.lpage = lpage;
			  //计算右侧偏移量
			  var move_page = 2;

			  var rpage = [];

			  //计算左侧偏移量
			  for(let i=page+1;i<=page+move_page;i++){
				  
				  if(i <= this.allpage){
					  rpage.push(i);
				  }

			  }
			  this.rpage = rpage;

		  })

	  },

	  //HeiUI分页
	  get_goods(value){


		  console.log(value)

		  this.axios.get('http://localhost:8000/goodslist/',{params:{page:this.pagination.page,size:this.pagination.size}}).then(result=>{

			  this.goods = result.data.data
			  this.pagination.total = result.data.total
  

		  })

	  },


	  //切换主题颜色
	  change_back:function(){

		  //获取样式表
		  var styles = getComputedStyle(document.documentElement);

		  


	  },

	  //获取轮播图数据
	  get_caroule(){
		  this.axios.get('http://localhost:8000/getcaroule/').then(result=>{
			//   console.log(result.data)

			  var datas = result.data;
			  var datass = []
			  for(let i=0,l=datas.length;i<l;i++){

				  datass.push({'title':datas[i].name,'link':datas[i].src,'image':'http://localhost:8000/static/upload/'+datas[i].img})



				  this.imgs = datass
				//   console.log(this.imgs)

			  }

		  })
	  },

	  clickimg(index,data){

		  alert('即将跳转到'+data.link)
		  
		  window.location.href = data.link;
	  },


     
  }
}


</script>
 
<style>



</style>