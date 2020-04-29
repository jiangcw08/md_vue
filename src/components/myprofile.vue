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
                    
                    <Avatar :src="src" :width="150" fill="fill"></Avatar>
                    <tr>
                        <td> 用户头像：</td>
                        <td><input type="file" @change="upload"></td>
                    </tr>

                   
                </table>


                
            </div>

        </section>
    </div>
  
</template>

<script>

//导入滑块验证码

import myheader from './myheader'
export default {
    data(){
        return{
            // 面包屑导航变量
            datas:[{title:'首页',route:{name:'index'}},{title:'我的首页'}],
            //头像
            src:'',
      


        }
    },
    components:{
        myheader,
  
    },
    methods:{



        




        //提交注册
        upload(e){

            //获取文件
            let file = e.target.files[0]

            //声明表单参数
            let param = new FormData()

            param.append('file',file,file.name);

            //声明请求头
            let config = {headers:{'Content-Type':'multipart/form-data'}}

   
            this.axios.post('http://localhost:8000/file/',param,config).then((result=>{

                this.src = 'http://localhost:8000/static/upload/'+result.data.filename

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