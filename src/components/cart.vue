<template>
  <div>
	
	<myheader></myheader>
	
	

	<section class="cart text-center">
		<div class="container">
			<!-- <div class="row"> -->
				<!-- <div class="col-sm-6 mb-3 mb-m-1 text-md-left"><a href="catalog.html"><i class="fas fa-arrow-left mr-2"></i> Continue Shopping</a></div> -->
				<!-- <div class="col-sm-6 text-md-right"><a href="catalog.html" class="btn btn-primary btn-lg pl-5 pr-5">Checkout</a></div> -->
			<!-- </div> -->
			<div class="row">
				<div class="col-12 text-center">
					<h2 class="mt-5 mb-2">我的购物车</h2>
					<p class="mb-5"><span class="primary-color">3</span> 件商品</p>
					<table id="cart" class="table table-condensed" >
						<thead>
							<tr>
								<th style="width:60%">商品名称</th>
								<th style="width:12%">价格</th>
								<th style="width:10%">数量</th>
								<th style="width:16%"></th>
							</tr>
						</thead>
						<tbody>
							<!-- 购物车商品展示 -->
							<tr v-for="(i,index) in cartlist" :key="index">
								<td data-th="Product">
									<div class="row">
										<div class="col-md-3 text-left">
											<img :src="i.img" alt="" class="img-fluid">
										</div>
										<div class="col-md-9 text-left mt-sm-2">
											<h4>{{ i.name }}</h4>
											<!-- <p>York &amp; Smith</p> -->
										</div>
									</div>
								</td>
								<td data-th="Price">${{ i.price }}</td>
								<td data-th="Quantity">
									<input type="number" class="form-control text-center" :value="i.num">
								</td>
								<td class="actions" data-th="">
									<div class="text-right">
										<button @click="changenum(index,'-')" class="btn btn-white btn-md mb-2">-<i class="fas fa-sync"></i></button>
										<button @click="changenum(index,'+')" class="btn btn-white btn-md mb-2" >+<i class="fas fa-trash"></i></button>
									</div>
								</td>
							</tr>

						</tbody>
					</table>
					<div class="float-right text-right">
						<h4>合计:</h4>
						<h1>${{ this.total_price() }}</h1>
						<p>(不包含运费)</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6 mb-3 mb-m-1 text-md-left"><a href="catalog.html"><i class="fas fa-arrow-left mr-2"></i> 继续购物</a></div>
				<div class="col-sm-6 text-md-right"><a href="catalog.html" class="btn btn-primary btn-lg pl-5 pr-5">Checkout</a></div>
			</div>
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
	  cartlist:[],
	  good:[],
    }
  },
  components:{
	  myheader
  },
  mounted:function(){


	  this.init_cart();
   

},
  methods:{



	//初始化购物车
	init_cart(){

		var cartdata = localStorage.getItem('cart')

		console.log(cartdata)

		if(cartdata == null){
			this.cartlist = []
		}else{
			this.cartlist = JSON.parse(cartdata)

		}
		

	},

	  //计算价格

	  total_price(){

		  var total = 0;

		  for(let i=0,l=this.cartlist.length;i<l;i++){

			  total += (this.cartlist[i].price * this.cartlist[i].num);

			  
		  }
		  return total

	  },


	  //删除商品
	  delgood(index){

		  this.cartlist.splice(index,1)
		  localStorage.setItem('cart',JSON.stringify(this.cartlist))


	  },

	  //增删商品
	  changenum(index,type){

		  if(type == '+'){

			  this.cartlist[index].num++;
			  localStorage.setItem("cart",JSON.stringify(this.cartlist))

		  }else{
			  if(this.cartlist[index].num == 1){

				  this.delgood();
				  
			  }else{

				  this.cartlist[index].num --;
				  localStorage.setItem('cart',JSON.stringify(this.cartlist))
				  
				  
			  }
			  
			  
		  }

	  }

     
  }
}


</script>
 
<style>



</style>