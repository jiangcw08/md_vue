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
                        <td></td>
                        <td><Button color="green" @click="sub">登录</Button></td>
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
            datas:[{title:'首页',route:{name:'index'}},{title:'登录页面'}],
            username:'',
            password:'',
            phone:'',

        }
    },
    components:{
        myheader
    },
    methods:{




        //提交注册
        sub(){

            if(this.username == ''){
                this.$Message('请输入用户名')
                return false
                // callback(new Error('用户名不能为空'))
            }
   
            this.axios.get('http://localhost:8000/login/',{params:{username:this.username,password:this.password}}).then((result=>{

                this.$Message(result.data.message)

                if(result.data.code == 200){

                    localStorage.setItem('uid',result.data.uid)
                    localStorage.setItem('username',result.data.username)

                    this.$router.push('/')
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

</style>