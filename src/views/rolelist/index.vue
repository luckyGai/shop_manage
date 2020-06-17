<template>
  <div class="">
    <myBread lavel1="角色管理" lavel2="角色列表"></myBread>
    <el-button type="primary">添加角色</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand" label="" width="80">
        <template slot-scope="scope">
          <el-row v-for="(item, index) in scope.row.children" :key="index">
            <el-col :span="4">
              <el-tag class="m5" type="pramary" closable>{{
                item.authName
              }}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(ite, ind) in item.children" :key="ind">
                <el-col :span="4">
                  <el-tag class="m5" type="success" closable>{{
                    ite.authName
                  }}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    v-for="(v, i) in ite.children"
                    :key="i"
                    type="warning"
                    class="m5"
                  >
                    {{ v.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-tag type="pramary" v-if="scope.row.children.length == 0"
            >目前该角色暂无权限</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="80"> </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            circle
            @click="editUser(scope.row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            circle
            @click="deleteUser(scope.row.id)"
          ></el-button>

          <!-- 分配权限按钮 -->
          <el-button
            type="warning"
            icon="el-icon-star-off"
            size="small"
            circle
            @click="setRoleList(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限弹框 -->

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-tree
        ref="roletree"
        :data="rightsTree"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps"
        default-expand-all
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          style="margin-left:10px;"
          type="primary"
          @click="setRightsRole"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getRightTree, setRightsRole } from "@/http/api.js";
// import {treeToList} from '@/utils/tree.js'
export default {
  name: "",
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      rightsTree: [], //树形结构数据
      defaultProps: {
        children: "children",
        label: "authName",
      },
      currentId: -1,
    };
  },
  props: [],
  components: {},
  mounted() {},
  created() {
    // 获取角色列表
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const res = await getRoleList();
      console.log(res);
      if (res.data.meta.status === 200) {
        this.$message({
          message: res.data.meta.msg,
          type: "success",
        });
      }
      this.tableData = res.data.data;
    },
    //打开分配权限弹框
    async setRoleList(row) {
      console.log(row);
      this.currentId = row.id;
      this.dialogVisible = true;
      //调用树形结构数据
      let res = await getRightTree();
      console.log(res);
      this.rightsTree = res.data.data;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          console.log(_);
          done();
        })
        .catch((_) => {
          console.log(_);
        });
    },
    // 将树形结构得选中的权限赋值给某个角色
    async setRightsRole() {
      //返回目前选中的节点所组成的数组
      const arr = this.$refs.roletree.getHalfCheckedKeys();
      //返回全部选中的节点组成的数组
      const arr2 = this.$refs.roletree.getCheckedKeys();
      console.log(arr);
      console.log(arr2);
      //合并两个数组
      const resultArr = [...arr, ...arr2];
      console.log(resultArr);
      let res = await setRightsRole(this.currentId,{rids: resultArr});
      console.log(res);
      this.dialogVisible = false;
    },
  },
  watch: {},
  computed: {},
};
</script>

<style scoped>
.el-button {
  margin: 20px 0;
}
.m5 {
  margin: 5px;
}
</style>
