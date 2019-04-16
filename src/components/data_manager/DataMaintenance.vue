<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过数据1搜索"
            clearable
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            @keyup.enter.native="searchData"
            v-model="searchCondition.dataOne">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchData">查询
          </el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddDataView">
            添加数据
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table
            :data="appData"
            v-loading="tableLoading"
            border
            stripe
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="dataOne"
              label="数据1"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              prop="dataTwo"
              label="数据2"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="dataThree"
              label="数据3"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              prop="dataFour"
              label="数据4"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="dataFive"
              label="数据5"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="dataSix"
              label="数据6"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="dataSeven"
              label="数据7"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="dataEight"
              label="数据8"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="dataNine"
              label="数据9"
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="dataTen"
              label="数据10"
              header-align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="130"
              header-align="center">
              <template slot-scope="scope">
                <el-button @click="showAddDataView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteData(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <div></div>
            <el-pagination
              background
              :page-size="page.size"
              :current-page="page.page"
              @current-change="currentChange"
              layout="total, prev, pager, next"
              :total="page.totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-form :model="appOneData" :rules="rules" ref="addAppData" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="isShowAddDataView"
          width="77%">
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="数据1:" prop="dataOne">
                  <el-input v-model="appOneData.dataOne" size="mini" style="width: 200px"
                            placeholder="请输入数据1"></el-input>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="6">
              <div>
                <el-form-item label="数据2" prop="dataTwo">
                  <el-input v-model="appOneData.dataTwo" size="mini" style="width: 200px"
                            placeholder="请输入数据2"></el-input>
                </el-form-item>
              </div>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="数据3" prop="dataThree">
                  <el-input v-model="appOneData.dataThree" size="mini" style="width: 200px"
                            placeholder="请输入数据3"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="数据4" prop="dataFour">
                  <el-input v-model="appOneData.dataFour" size="mini" style="width: 200px"
                            placeholder="请输入数据4"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="数据5" prop="dataFive">
                  <el-input v-model="appOneData.dataFive" size="mini" style="width: 200px"
                            placeholder="请输入数据5"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="数据6:" prop="dataSix">
                  <el-input v-model="appOneData.dataSix" size="mini" style="width: 200px"
                            placeholder="请输入数据6"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="数据7:" prop="dataSeven">
                  <el-input v-model="appOneData.dataSeven" size="mini" style="width: 200px"
                            placeholder="请输入数据7"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="数据8:" prop="dataEight">
                  <el-input v-model="appOneData.dataEight" size="mini" style="width: 200px"
                            placeholder="请输入数据8"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="数据9:" prop="dataNine">
                  <el-input v-model="appOneData.dataNine" size="mini" style="width: 200px"
                            placeholder="请输入数据9"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="数据10:" prop="dataTen">
                  <el-input v-model="appOneData.dataTen" size="mini" style="width: 200px"
                            placeholder="请输入数据10"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="isShowAddDataView=false">取 消</el-button>
    <el-button size="mini" type="primary" @click="addNewData('addAppData')">确 定</el-button>
  </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
  import {SUCCESS} from '../../utils/contant'
  export default {
    data() {
      return {
        searchCondition: {
          dataOne: ''
        },
        appOneData: {
          dataOne: '',
          dataTwo: '',
          dataThree: '',
          dataFour: '',
          dataFive: '',
          dataSix: '',
          dataSeven: '',
          dataEight: '',
          dataNine: '',
          dataTen: ''
        },

        appData: [],
        data: {},
        isShowAddDataView: false,
        tableLoading: false,
        currentPage: 1,
        totalCount: 0,
        dialogTitle: '',
        dialogVisible: false,
        edit: false,
        page: {
          page: 1,
          size: 20,
          totalCount: 0
        },
        rules: {
          dataOne: [{required: true, message: '必填:数据1', trigger: 'blur'}],
          dataTwo: [{required: true, message: '必填:数据2', trigger: 'blur'}],
          dataThree: [{required: true, message: '必填:数据3', trigger: 'blur'}],
          dataFour: [{required: true, message: '必填:数据4', trigger: 'blur'}],
          dataFive: [{required: true, message: '必填:数据5', trigger: 'blur'}],
          dataSix: [{required: true, message: '必填:数据6', trigger: 'blur'}],
          dataSeven: [{required: true, message: '必填:数据7', trigger: 'blur'}],
          dataEight: [{required: true, message: '必填:数据8', trigger: 'blur'}],
          dataNine: [{required: true, message: '必填:数据9', trigger: 'blur'}],
          dataTen: [{required: true, message: '必填:数据10', trigger: 'blur'}]
        }
      };
    },
    mounted: function () {
      this.loadAppData();

    },
    methods: {

      loadAppData(){
        let _this = this;
        let url = "/app-data-manager?page=" + _this.page.page + "&size=" + _this.page.size;
        if (_this.searchCondition.dataOne) {
          url += "&dataOne=" + _this.searchCondition.dataOne;
        }
        _this.getRequest(url).then(function (resp) {
          if (resp.status === 200) {
            if (resp.data['retCode'] === SUCCESS) {
              _this.appData = resp.data.data['list'];
              _this.page.totalCount = resp.data.data['totalCount'];
            }

          }
        })

      },
      searchData(){
        this.loadAppData()
      },
      showAddDataView(row){
        this.isShowAddDataView = true;
        if (row.id) {
          this.dialogTitle = '编辑数据';
          this.appOneData = row;
          this.edit = true;

        } else {
          this.dialogTitle = '添加数据';
          this.emptyAppData();
          this.edit = false;
        }
      },

      emptyAppData(){
        this.appOneData = {
          dataOne: '',
          dataTwo: '',
          dataThree: '',
          dataFour: '',
          dataFive: '',
          dataSix: '',
          dataSeven: '',
          dataEight: '',
          dataNine: '',
          dataTen: ''
        }
      },
      deleteData(row){
        this.$confirm('此操作将永久删除[' + row.id + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id);
        }).catch(() => {
        });
      },
      doDelete(id){
        let _this = this;
        if (id) {
          _this.deleteRequest("/app-data-manager/" + id).then(resp => {
            if (resp.status === 200) {
              if (resp.data['retCode'] === SUCCESS) {
                _this.$message.success(resp.data['retMsg']);
                _this.loadAppData();
              } else {
                _this.$message.error(resp.data['retMsg']);
              }
            }
          })
        } else {
          _this.$message.error("id不存在");
        }


      },
      addNewData(addAppData){
        let _this = this;
        _this.$refs[addAppData].validate((valid) => {
          if (valid) {
            if (_this.appOneData.id) {
              _this.tableLoading = true;
              _this.putRequest("/app-data-manager", _this.appOneData).then(resp => {
                _this.isShowAddDataView = false;
                _this.tableLoading = false;
                if (resp.status === 200) {
                  if (resp.data['retCode'] === SUCCESS) {
                    _this.$message.success("更新数据成功！");
                    _this.loadAppData();
                  } else {
                    _this.$message.error(resp.data['retMsg']);
                  }
                }
              })
            } else {
              _this.tableLoading = true;
              _this.postRequest("/app-data-manager", _this.appOneData).then(resp => {
                _this.isShowAddDataView = false;
                _this.tableLoading = false;
                if (resp.status === 200) {
                  if (resp.data['retCode'] === SUCCESS) {
                    _this.$message.success("新增数据成功！")
                    _this.loadAppData();
                  } else {
                    _this.$message.error(resp.data['retMsg']);
                  }
                }
              })
            }
          }
        })

      },
      currentChange(currentPage){
        this.page.page = currentPage;
        this.loadAppData();
      }


    }
  };
</script>
<style>
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
