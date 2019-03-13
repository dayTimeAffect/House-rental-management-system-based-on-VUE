import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    user:{},
    img:"",
  },
  mutations:{
    UseLocalStorage:state => {
      if(!window.localStorage){
        alert('请使用新版浏览器')
      }else{
        let storage=window.sessionStorage;
        for(let key in state.user){
          storage.setItem(key,state.user[key])
        }

      }
    },
    recoverState:state => {
      let key = ['age','email','id','manage','name','password','phone','sex','user','path']
      let storage=window.sessionStorage;
      key.forEach((value)=>{
        state.user[value] = storage[value]
      })
    },
    emptyLocalStorage:state => {
      let storage=window.sessionStorage;
      storage.clear();
    }
  }
})
export default  store
