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

                    <tr>
                        <td>手机号：</td>
                        <td><input type="text" v-model="phone"></td>
                    </tr>

                    <tr>
                        <td>验证码：</td>
                        <td><input type="text" v-model="code"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><img class="imgcode" alt="点击刷新" :src="src" @click="changeimage"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Button color="green" @click="sub">注册</Button></td>
                    </tr>
                </table>


                
            </div>

        </section>
    </div>
  
</template>

<script>
import myheader from './myheader'
export default {
    data(){
        return{
            // 面包屑导航变量
            datas:[{title:'首页',route:{name:'index'}},{title:'注册页面'}],
            username:'',
            password:'',
            phone:'',
            code:'',
            src:'http://localhost:8000/code/',

        }
    },
    components:{
        myheader
    },
    methods:{

        //刷新验证码
        changeimage:function(){

            //随机字符串
            var num = Math.ceil(Math.random()*10);
            //赋值地址
            this.src = this.src + "?code=" + num;
        },


        //提交注册
        sub(){

            if(this.username == ''){
                this.$Message('请输入用户名')
                return false
                // callback(new Error('用户名不能为空'))
            }
            if(this.phone == ''){

                this.$Message('请输入手机号')
                return false


            }


            
            if(!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.phone)){
                this.$Message('请输入正确的手机号')
                return false
            }        
            this.axios.get('http://localhost:8000/register/',{params:{code:this.code,phone:this.phone,username:this.username,password:this.password}}).then((result=>{

                this.$Message(result.data.message)
            }))
           
             
            
        }
    }

}
</script>

<style>

td{
    padding: 10px;
}

.imgcode{
   cursor:pointer; 
}

</style>