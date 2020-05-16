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
                        <td> 商品图片：</td>
                        <td><input type="file" @change="upload"></td>
                    </tr>
                    <tr>
                        <td>商品名称：</td>
                        <td><input type="text" v-model="name" placeholder="请输入商品名称"></td>
                    </tr>
                    <tr>
                        <td>商品价格：</td>
                        <td><input type="number" v-model="price"></td>
                    </tr>
                    <tr>
                        <td>品牌：</td>
                        <td><input type="text" v-model="brand"></td>
                    </tr>
                    <tr>
                        <td>型号：</td>
                        <td><input type="text" v-model="type"></td>
                    </tr>

                    <tr>
                        <td>商品分类：</td>
                        <td>
                            <Select :datas="cate" v-model="selected" ></Select>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Button color="green" @click="sub">添加</Button></td>
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
            datas:[{title:'首页',route:{name:'index'}},{title:'添加商品'}],
            img:'',
            name:'',
            price:'',
            brand:'',
            type:'',
            cate:[],
            selected:'',

            


        }
    },
    components:{
        myheader,

    },
    mounted:function(){

        this.get_cate()

    },
    
    methods:{


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

                

                this.img = result.data.filename

            }))

            
           
             
        },

        //获取商品分类
        get_cate(){

            this.axios.get('http://localhost:8000/catelist/').then(result=>{


                var mycate = []
                for(let i=0;i<result.data.length;i++){

                    mycate.push({'key':result.data[i].id,'title':result.data[i].name})

                    // this.cate[result.data[i].name] = [result.data[i].id]

                    // console.log(this.cate)
                }

                this.cate = mycate
              

            })
        },


        //提交
        sub(){



            console.log(this.selected)
           

            
            let params = {};
            params['brand'] = this.brand;
            params['type'] = this.type;

            //转换字符串
            params = JSON.stringify(params);


            let data = {'img':this.img,'name':this.name,'price':this.price,'params':params,cid:this.selected}

   
            this.axios.post('http://localhost:8000/insertgoods/',data).then((result=>{

                console.log(result.data.message)
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

</style>