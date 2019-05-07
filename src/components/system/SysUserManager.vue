<template>
  <div style="margin: 10px">
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="userId"
        label="用户ID"
        header-align="center"
      ></el-table-column>

      <el-table-column
        prop="name"
        label="姓名"
        header-align="center"
      >
      </el-table-column>

      <el-table-column
        prop="username"
        label="用户名"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        label="禁用"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-switch
            style="display: inline;margin-left: 5px"
            v-model="scope.row.enabled"
            active-color="#13ce66"
            inactive-color="#aaaaaa"
            active-text="启用"
            :key="scope.row.userId"
            @change="switchChange(scope.row.enabled,scope.row.userId)"
            inactive-text="禁用">
          </el-switch>
        </template>
      </el-table-column>

      <!--<el-table-column label="操作" header-align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="handleEdit(scope.$index, scope.row)">编辑-->
          <!--</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>
<script>
  import {SUCCESS} from '../../utils/contant'
  export default{
    data(){
      return {
        tableData: [],
      }
    },
    mounted: function () {
      this.initUser();
    },
    methods: {
      handleEdit(index, row){

      },
      handleDelete(index, row){

      },
      switchChange(enabled, userId){
        let _this = this;
        this.putRequest("/system/appUser", {
          userId: userId,
          enabled: enabled
        }).then(resp => {
          if (resp && resp.status === 200) {
            if (resp.data['retCode'] === SUCCESS) {
              _this.initUser();
            }
          }
        })
      },
      initUser(){
        let _this = this;
        this.getRequest("/appUsers").then(resp => {
          if (resp && resp.status === 200) {
            if (resp.data['retCode'] === SUCCESS) {
              _this.tableData = resp.data.data;
            }
          }
        })
      }
    }

  }
</script>
<style>
  .user-info {
    font-size: 12px;
    color: #09c0f6;
  }
</style>
