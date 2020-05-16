<template>
  <div>

	
	  	<myheader></myheader>
	

	<section class="featured-block text-center">
		<div class="container">
			<div class="row">
				<div class="col-md-6 text-center">
					<div class="product-image mt-3">
						<img class="img-fluid" :src="good.img">

					</div>
					<div class="product-thumbnails"><a href="#">
						<img class="mt-2 mr-2 img-fluid" src="../assets/images/placeholder-product.jpg" ></a>
						<a href="#">
							<img class="mt-2 mr-2 img-fluid" src="../assets/images/placeholder-product.jpg" ></a>
						<a href="#">
							<img class="mt-2 mr-2 img-fluid" src="../assets/images/placeholder-product.jpg" ></a>
						<a href="#">
							<img class="mt-2 mr-2 img-fluid" src="../assets/images/placeholder-product.jpg" ></a>
						<a href="#">
						<img class="mt-2 mr-2 img-fluid" src="../assets/images/placeholder-product.jpg" ></a></div>
				</div>

				<!-- 商品详情 -->
				<div class="col-md-6 mt-5 mt-md-2 text-center text-md-left">
					<h2 class="mb-3 mt-0">{{ good.name }}</h2>
					<p class="lead mt-2 mb-3 primary-color">${{  good.price }}</p>
					<h5 class="mt-4">Description</h5>

					品牌：{{ param.brand}} <br>
					型号：{{ param.type }}
					<select class="custom-select form-control mt-4 mb-4">
						<option selected>Size</option>
						<option value="1">Small</option>
						<option value="2">Medium</option>
						<option value="3">Large</option>
					</select>
					
					<!--Quantity: <input type="text" class="form-control quantity mb-4" name="" value="1">-->
					
					<a href="#" class="btn btn-full-width btn-lg btn-outline-primary">Add to cart</a> <br><br>
					
					<!-- 商品评论 -->

					<p class="relative" style="width: 300px"><textarea v-model="comment" style="width:100%" rows="2" maxlength="100" v-wordcount="100"></textarea></p>  

					<Button @click="sub">提交评论</Button>	
					</div>

					<br>

					



			</div>

		</div>
	</section>
	
	<div class="divider"></div>
	
	<!-- <section class="products text-center">
		<div class="container">
			<h3 class="mb-4">Related Products</h3>
			<div class="row">
				<div class="col-sm-6 col-md-3 col-product">
					<figure>
						<img class="rounded-corners img-fluid" src="../assets/images/placeholder-product.jpg"	width="240" height="240">
						<figcaption>
							<div class="thumb-overlay"><a href="#" title="More Info">
								<i class="fas fa-search-plus"></i>
							</a></div>
						</figcaption>
					</figure>
					<h4><a href="#">Product Name</a></h4>
					<p><span class="emphasis">$19.00</span></p>
				</div>
				<div class="col-sm-6 col-md-3 col-product">
					<figure>
						<img class="rounded-corners img-fluid" src="../assets/images/placeholder-product.jpg"	width="240" height="240">
						<figcaption>
							<div class="thumb-overlay"><a href="#" title="More Info">
								<i class="fas fa-search-plus"></i>
							</a></div>
						</figcaption>
					</figure>
					<h4><a href="#">Product Name</a></h4>
					<p><span class="emphasis">$19.00</span></p>
				</div>
				<div class="col-sm-6 col-md-3 col-product">
					<figure>
						<img class="rounded-corners img-fluid" src="../assets/images/placeholder-product.jpg"	width="240" height="240">
						<figcaption>
							<div class="thumb-overlay"><a href="#" title="More Info">
								<i class="fas fa-search-plus"></i>
							</a></div>
						</figcaption>
					</figure>
					<h4><a href="#">Product Name</a></h4>
					<p><span class="emphasis">$19.00</span></p>
				</div>
				<div class="col-sm-6 col-md-3 col-product">
					<figure>
						<img class="rounded-corners img-fluid" src="../assets/images/placeholder-product.jpg"	width="240" height="240">
						<figcaption>
							<div class="thumb-overlay"><a href="#" title="More Info">
								<i class="fas fa-search-plus"></i>
							</a></div>
						</figcaption>
					</figure>
					<h4><a href="#">Product Name</a></h4>
					<p><span class="emphasis">$19.00</span></p>
				</div>
			</div>
		</div>
	</section> -->
	
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
	//   商品id
	  id:'',
	  good:{},
	  comment:'',
	  //商品规格
	  param:{},
    }
  },

  components:{
	myheader
},
  mounted:function(){

	  //获取商品id
	  this.id = this.$route.query.id
	  this.get_good();
   
  
},
  methods:{

	//提交评论
	  sub(){

		this.axios.post('http://localhost:8000/addcomment/',this.qs.stringify({uid:localStorage.getItem('uid'),gid:this.id,content:this.comment})).then(result=>{

			this.$Message(result.data.message)
		})

	  },



	  //请求商品详情
	  get_good(){
		  this.axios.get('http://localhost:8000/goodinfo/',{params:{'id':this.id}}).then(result=>{
			//   console.log(result.data)

			  var data = result.data
			  var glist = []
			  glist.push({name:data['name'],price:data['price'],img:'http://localhost:8000/static/upload/'+data['img'],params:data['params']})

			//   console.log(glist[0])

			  this.good = glist[0]
			  
			  this.param = JSON.parse(this.good['params']);
		  })
	  }

     
  }
}


</script>
 
<style>



</style>