<template>
  <div>
    <el-container>
      <el-header>
        <div>查看图片</div>
      </el-header>
      <el-main>
        <div>
          <el-table
            :data="pictures"
            v-loading="tableLoading"
            border
            stripe
            size="mini"
            style="width: 100%">
            <el-table-column
              header-align="center"
            >
              <template slot-scope="scope">
                <img :src="scope.row.pictureUrl" min-width="300" height="300"/>
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
  </div>

</template>
<script>
  import {SUCCESS} from '../../utils/contant'
  export default {
    data(){
      return {
        pictures: [],
        tableLoading: false,
        page: {
          page: 1,
          size: 10,
          totalCount: 0
        }
      }
    },
    mounted: function () {
      this.loadAppPicture();

    },
    methods: {
      loadAppPicture(){
        let _this = this;
        let url = "/app-picture?page=" + _this.page.page + "&size=" + _this.page.size;
        _this.getRequest(url).then(resp => {
          if (resp.status === 200) {
            if (resp.data['retCode'] === SUCCESS) {
              _this.pictures = resp.data['data']['list'];
              _this.page.totalCount = resp.data['data']['totalCount'];
            }
          }
        })

      }
    }
  }

</script>
