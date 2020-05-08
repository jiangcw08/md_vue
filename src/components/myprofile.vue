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

                    
                    <tr>
                        <td> qiniu：</td>
                        <td>
                            
                            <input type="file" @change="qn_upload">
                            <!-- {{  load_percentL }} -->
                            <!-- 进度条标签 -->
                            <Progress :percent="load_int" v-show="load_int">
                                <span slot="text"> {{ load_int }}%</span>
                            </Progress>

                        
                        </td>
                    </tr>
                    

                    <tr>
                        <td></td>

                        <td>
                            <video :src="videosrc" width="300" height="200" controls="controls" autoplay="autoplay"></video>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            拖拽上传又拍云：
                        </td>
                        <td>
						<input type="file" @change="up_upload"> 

						<div id="upyun">
							拖拽上传
						</div>
                        </td>
                    </tr>


                   
                </table>


                
            </div>

        </section>
    </div>
  
</template>

<script>

//导入文件
import {config} from '../config.js'

//导入滑块验证码

import myheader from './myheader'
export default {
    data(){
        return{
            // 面包屑导航变量
            datas:[{title:'首页',route:{name:'index'}},{title:'我的首页'}],
            //头像
            src:'',
            //七牛token
            token:'',
            //视频地址
            videosrc:'',
            //上传进度展示
            load_percentL:'',
            //整形进度变量
            load_int:0,
      


        }
    },
    components:{
        myheader,
  
    },

    mounted:function(){

        this.get_token();
        this.get_user();

        //注册拖拽容器
        let upyun = document.querySelector('#upyun')
        //声明监听事件
        upyun.addEventListener('dragenter',this.onDrag,false);
        upyun.addEventListener('dragover',this.onDrag,false);
        upyun.addEventListener('drop',this.onDrop,false);


        
    },
    methods:{


        //监听用户鼠标
        onDrag(e){

            e.stopPropagation();
            e.preventDefault();

        },
        onDrop(e){

            e.stopPropagation();
            e.preventDefault();

            //调用自定义上传方法
            this.up_upload(e.dataTransfer.files);

        },


        //又拍云上传
        up_upload(files){

            //获取拖拽文件
            let file = files[0];
            //声明参数
            let param = new FormData();
            param.append('file',file);

            //声明头部
            const config = {
                headers:{'Content-Type':'multipart/form-data'}
            }

            this.axios.post('http://localhost:8000/upyun/',param,config).then(result=>{

                console.log(result)
            })

        },

        //获取用户信息
        get_user(){

            this.axios.get('http://localhost:8000/userinfo/',{params:{'id':localStorage.getItem('uid'),'jwt':localStorage.getItem('jwt')}}).then(result=>{

                // console.log(result)

                if(result.data.code == 400){
                    this.$Message(result.data.message)
                    localStorage.removeItem('username')
                    this.$router.push('/')
                }

                // this.src  = config['baseurl']+result.data.img;
                this.src  = "http://localhost:8000/static/upload/"+result.data.img;
            })
        },

        qn_upload(e){

            //获取文件
            let file = e.target.files[0];

            //声明表单参数
            let param = new FormData();

            param.append('file',file,file.name);
            param.append('token',this.token);

            //定制axios
            const axios_qiniu = this.axios.create({withCredenttials:false});

            //发送请求
            axios_qiniu({
                method:'POST',
                url:'http://up-z1.qiniu.com/',
                data:param,
                timeout:30000,

                onUploadProgress:(e)=>{

                    //计算上传百分比
                    var complete = (e.loaded / e.total);
                    
                    if(complete < 1){
                        this.load_percentL = (complete * 100).toFixed(2) + '%';
                        this.load_int = parseInt((complete * 100).toFixed(2));
                    }

                }

            }).then(result=>{

                //手动赋值100%
                this.load_percentL = '100%'; 
                this.load_int = 100;
                // console.log(result)

                this.src = config['baseurl']+result.data.key;
                this.videosrc = 'http://q9ksrmfb3.bkt.clouddn.com/'+result.data.key;

                let data = {
                    'id':localStorage.getItem('uid'),
                    'img':result.data.key,

                }

                this.axios.put('http://localhost:8000/userimg/',data=data).then(result=>{
                    console.log(result)
                })
            })
        },



        get_token(){

            this.axios.get('http://localhost:8000/qn/').then((result=>{
                
                this.token = result.data.token

                
            
            }))
        },




        //提交注册
        upload(e){

            //获取文件
            let file = e.target.files[0]

            //声明表单参数
            let param = new FormData()

            param.append('file',file,file.name);
            param.append('uid',localStorage.getItem('uid'));

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

#upyun{
	margin:100px auto;
	width:300px;
	height:150px;
	border:1px dashed gray; 
}

</style>