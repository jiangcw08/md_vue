<template>
  <section class="header text-center">
		<nav class="navbar navbar-expand-lg navbar-light navbar-custom">
			<div class="container"><a class="navbar-brand" href="/"><i class="fas fa-shopping-bag primary-color mr-1"></i>{{ $t('m.index')}}</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-1" aria-controls="navbar-1" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
				<div class="collapse navbar-collapse pull-xs-right justify-content-end" id="navbar-1">
					<ul class="navbar-nav mt-2 mt-md-0">
						<li class="nav-item active"><a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a></li>
						<li class="nav-item dropdown mega-menu"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Shop </a>
							<div class="dropdown-menu" aria-labelledby="navbarDropdown">
								<div class="container">
									<div class="divider"></div>
									<div class="row">
										<div class="col-md-2">
											<h6 class="text-uppercase">Women's</h6>
											<ul class="nav flex-column">
												<li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
											</ul>
										</div>
										<div class="col-md-2">
											<h6 class="text-uppercase">Men's</h6>
											<ul class="nav flex-column">
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
											</ul>
										</div>
										<div class="col-md-2">
											<h6 class="text-uppercase">Girl's</h6>
											<ul class="nav flex-column">
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
											</ul>
										</div>
										<div class="col-md-2">
											<h6 class="text-uppercase">Boy's</h6>
											<ul class="nav flex-column">
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
												<li class="nav-item"><a class="nav-link" href="#">Link item</a></li>
											</ul>
										</div>
										<div class="col-md-4">
											<h6 class="text-uppercase">Featured Items</h6>
											<div class="row">
												<div class="col-6 text-center"><a href="item.html">
													<img src="../assets/images/placeholder-product.jpg" alt="" class="img-fluid mt-2 mb-3"></a>
													<h6 class="mb-0"><a href="item.html">Product Name</a></h6>
													<p><span class="emphasis">$49.00</span></p>
													<a href="#" class="btn btn-sm btn-outline-secondary mt-0">Buy Now</a>
										</div>
												<div class="col-6 text-center"><a href="item.html">
													<img src="../assets/images/placeholder-product.jpg" alt="" class="img-fluid mt-2 mb-3"></a>
													<h6 class="mb-0"><a href="item.html">Product Name</a></h6>
													<p><span class="emphasis">$49.00</span></p>
													<a href="#" class="btn btn-sm btn-outline-secondary mt-0">Buy Now</a>
										</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages </a>
							<div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="index.html">Homepage</a>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="catalog.html">Catalog</a>
								<a class="dropdown-item" href="item.html">Item Detail</a>
								<a class="dropdown-item" href="cart.html">Cart</a>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="contact.html">Contact</a>

							</div>
						</li>
						<li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
					<li class="nav-item dropdown">
						<!-- 搜索功能	 -->
						<Search v-model="text" @search="search"></Search>
					</li>
						<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-shopping-cart"></i> <span class="badge badge-pill badge-primary">3</span></a>
							<div class="dropdown-menu dropdown-menu-right dropdown-cart" aria-labelledby="navbarDropdown">
								<h6>3 Items <span class="emphasis">$147.00</span></h6>
								<div class="dropdown-divider"></div>
								<ul class="shopping-cart-items">
									<li class="row">
										<div class="col-3">
											<img src="../assets/images/placeholder-product.jpg" width="60">
										</div>
										<div class="col-9">
											<h6><a href="item.html">Product Name</a></h6>
											<span class="text-muted">1x</span>
											<span class="emphasis">$49.00</span></div>
									</li>
									<li class="row">
										<div class="col-3">
											<img src="../assets/images/placeholder-product.jpg" width="60">
										</div>
										<div class="col-9">
											<h6><a href="item.html">Product Name</a></h6>
											<span class="text-muted">1x</span>
											<span class="emphasis">$49.00</span></div>
									</li>
									<li class="row">
										<div class="col-3">
											<img src="../assets/images/placeholder-product.jpg" width="60">
										</div>
										<div class="col-9">
											<h6><a href="item.html">Product Name</a></h6>
											<span class="text-muted">1x</span>
											<span class="emphasis">$49.00</span></div>
									</li>
								</ul>
								
								<a href="cart.html" class="btn btn-lg btn-full-width btn-primary" style="margin: 0;">View Cart</a></div>
						</li>
					</ul>
				</div>
			</div>

			<div v-if="username == ''">

				<router-link to="/login">登录</router-link>/
				<router-link to="/register">注册</router-link>

			</div>
			<div v-else>
				欢迎您: <a href="/myprofile">{{ username }}</a>

				&nbsp;
				<a href="#" @click="loginout">登出</a>
			</div>
			
			<!-- 语言切换开关 -->
			<div>
				
				<h-switch v-model="lang" @change="xuanze">中/英</h-switch>

			</div>
			<!-- end -->

		</nav>
	</section>
</template>

<script>
export default {

	data(){
		return{
			username:'',
			//语言切换变量
			lang:0,
			text:'',
		}
	},
	//钩子方法
	mounted(){


		var lang_locale = localStorage.getItem('lang')

		if(lang_locale){
			this.$i18n.locale = lang_locale
			if(lang_locale == 'zh'){
				this.lang = 0
			}else{
				this.lang = 1;
			}
		
			
		}else{
			this.$i18n.locale = 'zh'
			this.lang = 0

		}



		//根据浏览器默认语言 自动选择语言
		// var language = navigator.language

		// if(language == 'zh-CN'){
		// 	this.$i18n.locale = 'zh'
		// }else{
		// 	this.$i18n.locale = 'en'
		// }

		//新浪登录
		var sina_name = this.$route.query.sina_name;

		if(sina_name){

			//自动登录
			localStorage.setItem('username',sina_name)
			localStorage.setItem('uid',this.$route.query.uid)
		}

		//判断是否登
		var name = localStorage.getItem('username')

		if(name == null){
			this.username == ''
		}else{
			this.username = name
		}
	},
	//监听属性，监测页面变化
	watch:{

		$route(to,from){

			//手动刷新
			this.$router.go(0);

		}

	},	
	methods:{

		search:function(){

			console.log(this.text);

			//跳转
			this.$router.push({path:'/search',query:{text:this.text}});
		},


		//语言切换
		xuanze(){

			if(this.lang == 1){
				this.$i18n.locale = 'en'
				localStorage.setItem('lang','en')
			}else{
				this.$i18n.locale = 'zh'
				localStorage.setItem('lang','zh')
			}


		},
		loginout(){

			localStorage.removeItem('username')
			localStorage.removeItem('uid')
			this.username = ''
			
			this.$router.push('/')


		}
	}

}
</script>

<style>

</style>