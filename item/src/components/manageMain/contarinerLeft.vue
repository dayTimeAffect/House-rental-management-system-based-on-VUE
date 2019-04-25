<template>
    <div class="contarinerLeft">
      <ul class="tree">
        <router-link to="/manageMain/examine" tag="li" class="tree_node" v-bind:class="{tree_node1:node_change == 1}" v-on:click.native="change_node(1)">房屋信息管理</router-link>
        <router-link to="/manageMain/personalDetails" tag="li" class="tree_node" v-bind:class="{tree_node1:node_change == 2}" v-on:click.native="change_node(2)">个人信息</router-link>
        <router-link to="/manageMain/rentSituation" tag="li" class="tree_node" v-bind:class="{tree_node1:node_change == 3}" v-on:click.native="change_node(3)">房屋租赁管理</router-link>
        <router-link to="/manageMain/contract" tag="li" class="tree_node" v-bind:class="{tree_node1:node_change == 4}" v-on:click.native="change_node(4)">房屋租赁合同</router-link>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "contarinerLeft",
      data(){
          return {
            node_change:-1
          }
      },
      methods:{
          change_node:function (num) {
            this.node_change = num;
          }
      }
    }
</script>

<style scoped>

  .contarinerLeft{
    height: 100%;
    overflow: hidden;
  }
  .tree{
    background-color: #ccc;
    font-size: 14px;
  }
  .tree_node{
    cursor: pointer;
    height: 60px;
    padding-top: 20px;
    text-align: center;
    line-height: 60px;
    width: 100%;
    border-bottom: 1px solid #999;
  }
  .tree_node:hover{
    background-color: #e5e5e5;
  }
  .tree_node1{
    background-color: #e5e5e5;
  }

</style>
