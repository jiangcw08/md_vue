<template>
  <div>
      <table>

          <tr v-show="src">
              <td>图片预览</td>
              <td><img :src="'http://jiangcw-upyun.test.upcdn.net/'+src"></td>
              <br>
              <td><Button @click="del" color="red">删除图片</Button></td>
          </tr>
          <tr>
              <td>又拍云上传</td>
              <td><input type="file" @change="upload"></td>
          </tr>

          <tr>
              <td><input type="text" v-model="srcname"></td>
              <td><Button @click="mkdir" color="blue">创建目录</Button></td>
          </tr>
      
              
      
      </table>
  </div>
</template>

<script>
export default {

    data(){
        return{
            src:'',
            srcname:'',
        }
    },
    methods:{


        //删除图片
        del(){
            this.axios.get('http://localhost:8000/del/',{params:{'name':this.src}}).then(result=>{
                console.log(result)
            })


        },


        //创建目录
        mkdir(){

            this.axios.get('http://localhost:8000/mkdir/',{params:{'name':this.srcname}}).then(result=>{
                console.log(result)
            })

        },
        upload(e){

            //获取文件
            let file = e.target.files[0];
            //声明参数
            let param = new FormData();
            param.append('file',file);

            //声明头部
            const config = {
                headers:{'Content-Type':'multipart/form-data'}
            }

            this.axios.post('http://localhost:8000/uploadupy/',param,config).then(result=>{

                console.log(result.data.filename)
                this.src = result.data.filename
            })
        }
    }

}
</script>

<style>

</style>