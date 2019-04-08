<template>
  <div>
    <div style="flex-direction: column;justify-content: flex-start;margin: 10px">
      <el-button type="primary"  @click="dialogFormVisible = true">
        添加角色
      </el-button>
    </div>

    <el-table
      :data="roles"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="roleId"
        label="角色ID"
        header-align="center"
      >
      </el-table-column>

      <el-table-column
        prop="roleName"
        label="角色名称"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        prop="roleZhName"
        label="角色中文名称"
        header-align="center"
      >
      </el-table-column>

      <el-table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="lookupRoleMenus(scope.row)">查看角色权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="角色" :visible.sync="dialogFormVisible">
      <el-form :model="newRole">
        <el-form-item label="角色英文名称" :label-width="formLabelWidth">
          <el-input v-model="newRole.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色中文名称" :label-width="formLabelWidth">
          <el-input v-model="newRole.roleZhName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewRole">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="角色权限" :visible.sync="roleDialogFormVisible">
      <el-card class="box-card" :v-model="lookRole">
        <div slot="header">
          <span>可访问的资源</span>
        </div>
        <div>
          <el-tree :props="props"
                   :key="lookRole.roleId"
                   :data="treeData"
                   :default-checked-keys="checkedKeys"
                   node-key="menuId"
                   ref="tree"
                   show-checkbox
                   highlight-current
          >
          </el-tree>
        </div>
        <div style="display: flex;justify-content: flex-end;margin-right: 10px">
          <el-button size="mini" @click="roleDialogFormVisible=false">取消修改</el-button>
          <el-button type="primary" size="mini" @click="updateRoleMenu">确认修改</el-button>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
  import {isNotNullORBlank} from '../../utils/utils'
  import {SUCCESS} from '../../utils/contant'
  export default{
    data(){
      return {
        props: {
          label: 'name',
          children: 'children'
        },
        treeData: [],
        checkedKeys: [],
        roles: [],
        loading: false,
        dialogFormVisible: false,
        roleDialogFormVisible: false,
        formLabelWidth: '100px',
        newRole: {},
        lookRole: {}
      };
    },
    mounted: function () {
      this.loading = true;
      this.initRoles();
    },

    methods: {
      initRoles(){
        let _this = this;
        this.getRequest("/system/roles").then(resp => {
          _this.loading = false;
          if (resp && resp.status === 200) {
            if (resp.data['retCode'] === SUCCESS) {
              _this.roles = resp.data.data;
            } else {
              _this.$message.error(resp.data['retMsg'])
            }
          }
        })
      },
      handleDelete(row){
        let _this = this;
        let roleName = row['roleName'];
        this.$confirm('删除角色[' + roleName + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.deleteRequest("/system/role/" + row.roleId).then(resp => {
            if (resp && resp.status === 200) {
              if (resp.data['retCode'] === SUCCESS) {
                _this.$message.success("删除成功！")
                _this.initRoles();
              }
            }
          })
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },

      //有五个树，但是五个树用的同一个数据源
      updateRoleMenu(){
        var checkedKeys = this.$refs.tree.getCheckedKeys(true);
        var _this = this;
        this.putRequest("/system/updateMenuRole", {
          roleId: this.lookRole.roleId,
          menuIds: checkedKeys
        }).then(resp => {
          if (resp && resp.status === 200) {
            if (resp.data['retCode'] === SUCCESS) {
              _this.$message.success(resp.data['retMsg'])
              _this.roleDialogFormVisible = false;
            }
          }
        })
      },
      lookupRoleMenus(row){
        var _this = this;
        _this.lookRole = row;
        this.getRequest("/system/menuTree/" + row['roleId']).then(resp => {
          if (resp && resp.status === 200) {
            if (resp.data['retCode'] === SUCCESS) {
              var data = resp.data.data;
              _this.treeData = data.menus;
              _this.checkedKeys = data.selMenuId;
              _this.roleDialogFormVisible = true;
            }
          }
        })

      },
      addNewRole(){
        let _this = this;
        this.loading = true;
        _this.dialogFormVisible = false
        this.postRequest("/system/addRole",
          this.newRole).then(resp => {
          _this.loading = false;
          if (resp && resp.status === 200) {
            if (resp.data['retCode'] === SUCCESS) {
              _this.initRoles();
            } else {
              _this.$message.error(resp.data['retMsg'])
            }
          }
        })
      }
    },

  }
</script>

