import axios from 'axios';


interface paramGet{
    page:number;
    limit:number;
    search?:string;
}

class CrudDataWithClass {

   async  getAllData({page,limit}:paramGet) {
        let datas=await axios.get('https://dummyjson.com/users');
        let resp=await datas.data
        // console.log(JSON.stringify(resp));
        // return resp;
        return {data:resp,page:page,limit:limit};
    }
    getDataById() {
        let users=['apple','manggo','banana'];
        return users;
    }
    
    createData() {
        let users=['apple','manggo','banana'];
        return users;

    }
    updateData(token) {
        let users=['apple','manggo','banana'];
        return users;

    }
    
    deleteData() {
        let users=['apple','manggo','banana'];
        console.log(JSON.stringify(users));
    }
  }
  
  export default new CrudDataWithClass();