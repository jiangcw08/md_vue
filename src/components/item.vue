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
					
					<a @click="addcart" href="javascript:void(0)" class="btn btn-full-width btn-lg btn-outline-primary">添加到购物车</a> <br><br>
					
					<!-- 商品评论 -->

					<p class="relative" style="width: 300px"><textarea v-model="comment" style="width:100%" rows="2" maxlength="100" v-wordcount="100"></textarea></p>  

					<Button @click="sub">提交评论</Button>	

					<!-- 评论列表 -->
					<ul>
						
						<li v-for="item in commentlist"> <div class="divider"></div>{{ change_uid(item.uid) }} : {{ item.content }} <br> &nbsp;&nbsp;&nbsp;&nbsp; <span v-for="i in item.reply">{{ i.username}} 回复: {{ i.content }} <br></span> <br> <a @click="jump_comment(item.uid,item.content,item.id)"> <img :src="'http://localhost:8000/static/upload/会话.png'" width="30">评论<div class="divider"></div></a></li>
						
						
					</ul>

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
	  userlist:{},
	  good:{},
	  //评论列表
	  commentlist:[],
	  comment:'',
	  //商品规格
	  param:{},
	  //购物车列表
	  cartlist:[],
	  //评论回复变量
	  is_comment:0,
    }
  },

  components:{
	myheader
},

filters:{



},

  mounted:function(){

	  //获取商品id
	  this.id = this.$route.query.id
	  this.get_good();
	  this.get_user();
	  this.get_comment();
	  //获取购物车
	  this.init_cart();
	  

   
  
},
  methods:{
	
	//初始化购物车
	init_cart(){

		var cartdata = localStorage.getItem('cart')

		if(cartdata == null){
			this.cartlist = []
		}else{
			this.cartlist = JSON.parse(cartdata)

		}
		

	},

	//添加购物车
	addcart(){

		//默认购物车内没有商品
		let findgood = 0;

		for(let i=0;i<this.cartlist.length;i++){

			if(this.good.name == this.cartlist[i]['name']){
				this.cartlist[i]['num']++;

				findgood = 1;
				break
			}
			

		}
		//如果该商品没有在购物车
		if(findgood == 0){
			this.cartlist.push({'name':this.good.name,'price':this.good.price,'num':1,'img':this.good.img})
		}

		console.log(this.cartlist)
		//状态保持
		localStorage.setItem('cart',JSON.stringify(this.cartlist));
	},


	//转换格式
	

	//跳转进行回复
	jump_comment(uid,content,id){

		var username = this.userlist[uid]


		this.$router.push({path:'/comment',query:{cid:id,username:username,content:content,gid:this.id}})

	},


  	//替换用户名
  	change_uid:function(uid){

  		return this.userlist[uid];

  	},


	//获取用户列表
	get_user(){

		this.axios.get('http://localhost:8000/userlist/').then(result=>{

			
			//动态赋值
			for(let i=0;i<result.data.length;i++){

				// console.log(result.data)
				this.userlist[result.data[i]['id']]= result.data[i]['username']
				
			}
			// console.log(this.userlist)
		})

	},



	//获取商品评论
	get_comment:function(){

		this.axios.get('http:///localhost:8000/commentlist/',{params:{gid:this.id}}).then(result=>{


			
		
			
			var comment_list = []
			for(let i=0;i<result.data.length;i++){

				comment_list.push({
					uid:result.data[i].uid,
					content:result.data[i].content,
					id:result.data[i].id,
					reply:JSON.parse(result.data[i].reply),
					gid:result.data[i].gid
				})


				
			}

			this.commentlist = comment_list

		})

	},

	//提交评论
	  sub(){
		
		var uid = localStorage.getItem('uid')
		// console.log(uid)
		if(localStorage.getItem('uid') == null){

			this.$Message('请先登录')
			this.$router.push('/login')
			return false
		}

		this.axios.post('http://localhost:8000/addcomment/',this.qs.stringify({uid:localStorage.getItem('uid'),gid:this.id,content:this.comment})).then(result=>{

			this.$Message(result.data.message)

			if(result.data.code == 200){
				//追加评论内容
				this.commentlist.unshift({'uid':localStorage.getItem('uid'),'content':this.comment})
			}
	

			
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