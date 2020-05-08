<template>

    <div>
        <myheader></myheader>
         <!-- 面包屑导航 -->
        <div>
                <Breadcrumb :datas="datas"></Breadcrumb>
        </div>
        <section class="featured-block text-center">

            <div class="container">


                <table>
                    <tr>
                        <td>用户名：</td>
                        <td><input type="text" v-model="username"> </td>
                    </tr>

                    <tr>
                        <td>密  码：</td>
                        <td><input type="password" v-model="password"></td>
                    </tr>
                    <!-- 验证码 -->
                    <tr>
                        <td>验证码：</td>
                        <td><input type="text" v-model="code"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><img class="imgcode" alt="点击刷新" :src="src" @click="changeimage"></td>
                    </tr>
                    <!-- 滑块验证码 -->
                    <tr>

                        <td></td>
                        <td>
                            <drag-verify
                            :width="width"
                            :height="height"
                            :text="text"
                            ref="Verify"

                            ></drag-verify>
                        </td>
                    </tr>


                    <tr>
                        <td></td>
                        <td><Button color="green" @click="sub">登录</Button>

                            &emsp;&emsp;

                            <img @click="sina" class="sina" src="http://localhost:8000/static/sina.png">
                        
                        </td>
                    </tr>
                </table>


                
            </div>

        </section>
    </div>
  
</template>

<script>

//导入滑块验证码
import dragVerify from 'vue-drag-verify'
import myheader from './myheader'
export default {
    data(){
        return{
            // 面包屑导航变量
            datas:[{title:'首页',route:{name:'index'}},{title:'登录页面'}],
            username:'',
            password:'',
            phone:'',
            code:'',
            src:'http://localhost:8000/code/',
            //滑块验证码数据
            width:300,
            height:40,
            text:'将滑块验证码拖动到右侧'
            


        }
    },
    components:{
        myheader,
        dragVerify
    },
    methods:{



        //新浪登录
        sina(){


            //拼接url
		    let url = "https://api.weibo.com/oauth2/authorize?client_id=518243583&redirect_uri=http://127.0.0.1:8000/sina_weibo"
            //跳转
            window.location.href = url;

        },

        
        

        //刷新验证码
        changeimage:function(){

            //随机字符串
            var num = Math.ceil(Math.random()*10);
            //赋值地址
            this.src = this.src + "?code=" + num;
        },



        //提交注册
        sub(){


            //判断是否拖动
            console.log(this.$refs.Verify.isPassing);
            if(this.$refs.Verify.isPassing == false){
                this.$Message('请拖动验证码')
                return false
            }

            if(this.username == ''){
                this.$Message('请输入用户名')
                return false
                // callback(new Error('用户名不能为空'))
            }
   
            this.axios.get('http://localhost:8000/login/',{params:{code:this.code,username:this.username,password:this.password}}).then((result=>{

                

                if(result.data.code == 200){

                    this.$Message(result.data.message)

                    localStorage.setItem('uid',result.data.uid)
                    localStorage.setItem('username',result.data.username)
                    localStorage.setItem('jwt',result.data.jwt)

                    this.$router.push('/')

                }else{
                    this.changeimage()
                    this.$Notice(result.data.message)
                }
            }))
           
             
            
        }
    }

}
</script>

<style>

td{
    padding: 10px;
}
.sina{
    cursor: pointer;
}

</style>