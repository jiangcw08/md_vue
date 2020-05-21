<template>
  <div>

	
	  	<myheader></myheader>

		   <!-- 面包屑导航 -->
        <div>
                <Breadcrumb :datas="datas"></Breadcrumb>
        </div>


		  <div>
			  买家:{{ username }} <br>

			  {{ content }} <br>

			  <div>
				  <a href="">
					  <img :src="good['img']" width="200">

					  {{ good['desc'] }} 

					  <span class="lead mt-2 mb-3 primary-color">   ${{  good['price'] }}</span>
				  </a>
			  </div>

			  <div>
				  全部评论：

			  </div>


			 <p class="relative" style="width: 300px"><textarea v-model="comment_text" style="width:100%" rows="2" maxlength="100" v-wordcount="100"></textarea></p>  

			 <Button color="green" @click="sub">评论</Button>



		  </div>
	

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
	  datas:[{title:'首页',route:{name:'index'}},{title:'评价详情'}],
	  msg: "这是一个变量",
	  username:'',
	  content:'',
	  comment_text:'',
	  gid:this.$route.query.gid,
	  good:{},
	  cid:'',
	  


    }
  },

  components:{
	myheader
},

filters:{



},

  mounted:function(){

	  this.cid = this.$route.query.cid
	  console.log(this.cid)
	  this.username = this.$route.query.username
	  this.content = this.$route.query.content
	  this.get_good();
	
  
},
  methods:{

	  //请求商品详情
	  get_good(){
		  this.axios.get('http://localhost:8000/goodinfo/',{params:{'id':this.gid}}).then(result=>{
			  var data = result.data
			  var glist = []
			  glist.push({name:data['name'],price:data['price'],img:'http://localhost:8000/static/upload/'+data['img'],desc:data['desc']})
			//   console.log(glist[0])
			  this.good = glist[0]
		  })
	  },
	  //提交回复
	  sub(){
		  
		  this.axios.get('http://localhost:8000/reply/',{params:{'id':this.cid,'username':localStorage.getItem('username'),'content':this.comment_text,}}).then(result=>{

		  })

	  }
  }
}


</script>
 
<style>



</style>