<template>
  <!-- 项目名称：供应商列表
    开始时间：2018.12.5 11:30
  开始人：廖佳新-->
  <div class="SupplierList">
    <!-- 头部-搜索框处 -->
    <div class="title-bar">
      <span class="title-bar-name">供应商列表</span>
      <div class="ss-box headerInput">
        <el-input placeholder="请输入内容" v-model="InputValue" class="input-with-select" clearable>
          <el-select v-model="SelectValue" slot="prepend" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <!-- 内容主体 -->
    <div class="conter">
      <!-- 日期选择器 -->
      <div class="date-picker-box">
        <el-date-picker
          class="iconfont icon-rili"
          v-model="startTime"
          type="date"
          placeholder="开始时间"
        ></el-date-picker>
      </div>
      <div class="split" style="position:relative">
        <i
          class="iconfont icon-xiala"
          style="color:#c0c4cc;position:absolute;right: 25px;top:-3px;font-size:18px;"
        ></i>
        一
      </div>
      <div class="date-picker-box">
        <el-date-picker class="iconfont icon-rili" v-model="endTime" type="date" placeholder="结束时间"></el-date-picker>
        <i
          class="iconfont icon-xiala"
          style="color:#c0c4cc;position:relative;right: 30px;top:1px;font-size:18px;"
        ></i>
      </div>
      <!-- 状态 -->
      <div style="display:inline-block">
        <el-select v-model="SelectValues" placeholder="状态" class="iconfont icon-xiala">
          <el-option
            v-for="item in optionss"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 这段代码有毒 -->
        <el-select style="display:none"></el-select>
      </div>
      <!-- 添加按钮 -->
      <div class="addArea">
        <el-button class="bluebg fz14" type="primary" @click="handAdd">添加供应商</el-button>
      </div>
    </div>
    <!-- 表格开始 -->
    <div style="padding:0 40px 0 20px;">
      <el-table :data="tableData" style="width: 100%" stripe class="tabless">
        <el-table-column prop="date" label="ID" width="80"></el-table-column>
        <el-table-column prop="mark" label="账号" width="180"></el-table-column>
        <el-table-column prop="name" label="公司名称"></el-table-column>
        <el-table-column prop="linkman" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-text="开启" inactive-text="停用"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              class="medium bluebg white buttons fz12"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              class="medium buttons buttonEEE fz12"
              @click="resetPass(scope.$index, scope.row)"
            >重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格结束 -->
    <!-- 分页器 START -->
    <div class="page-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="800"
      ></el-pagination>
    </div>
    <!-- 分页器 END -->
    <!--添加供应商模态框-->
    <el-dialog
      class="ht-dialog"
      :title="topTitle?'修改':'编辑'"
      :visible.sync="addFormVisible"
      width="640px"
    >
      <el-form :model="datas" ref="datas" label-position="left">
        <el-form-item label="账号：" label-width="90px">
          <el-input autocomplete="off" placeholder="请输入邮箱或手机号" v-model="datas.mark"></el-input>
        </el-form-item>
        <el-form-item label="公司名称：" label-width="90px">
          <el-input autocomplete="off" placeholder="请输入公司名称" v-model="datas.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" label-width="90px">
          <el-input autocomplete="off" placeholder="请输入联系人姓名" v-model="datas.linkman"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" label-width="90px">
          <el-input autocomplete="off" placeholder="请输入联系电话号码" v-model="datas.phone"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱：" label-width="90px">
          <el-input autocomplete="off" placeholder="请输入邮箱" v-model="datas.email"></el-input>
        </el-form-item>
        <el-form-item label="地址：" label-width="90px">
          <el-input autocomplete="off" placeholder="请输入地址" v-model="datas.site"></el-input>
        </el-form-item>
        <el-form-item label="结算方式：" label-width="90px">
          <el-radio-group v-model="datas.radio2">
            <el-radio :label="3">周结</el-radio>
            <el-radio :label="6">半月结</el-radio>
            <el-radio :label="9">月结</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="bluebg fz14"
          type="primary"
          style="width:120px;height:34px;"
          @click="addGoods(datas)"
        >{{topTitle?'创建':'确定'}}</el-button>
      </div>
    </el-dialog>
    <!--添加供应商模态框结束-->
    <!--重置密码开始-->
    <el-dialog class="ht-dialog" title="重置密码" :visible.sync="dataPassWords" width="640px">
      <el-form label-position="left" v-model="dataPassWord" ref="dataPassWord" :rules="rules2">
        <el-form-item label="新密码：" label-width="90px" prop="pass">
          <el-input
            autocomplete="off"
            type="password"
            placeholder="请输入密码"
            v-model="dataPassWord.pass"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次输入：" label-width="90px" prop="checkPass">
          <el-input
            autocomplete="off"
            type="password"
            placeholder="请再次输入密码"
            v-model="dataPassWord.checkPass"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="bluebg fz14"
          type="primary"
          style="width:120px;height:34px;"
          @click="resetSucceed(dataPassWord)"
        >确定</el-button>
      </div>
    </el-dialog>
    <!--重置密码结束-->
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.dataPassWord.checkPass !== "") {
          this.$refs.dataPassWord.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.dataPassWord.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      InputValue: "", //头部input
      SelectValue: "", //头部select
      options: [
        //头部option值
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      startTime: "", // 开始时间
      endTime: "", // 结束时间
      SelectValues: "", //状态select
      optionss: [
        //状态ption值
        {
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "启用"
        },
        {
          value: "选项3",
          label: "停用"
        }
      ],
      value3: true, //状态开关
      tableData: [
        {
          date: "1",
          mark: "王小虎",
          name: "上海市普陀区金沙江路 1518 弄",
          linkman: "廖佳新",
          phone: "15512341234",
          email: "429894594@qq.com",
          state: true
        },
        {
          date: "2",
          mark: "王小虎",
          name: "上海市普陀区金沙江路 1517 弄",
          linkman: "廖佳新",
          phone: "15512341234",
          email: "429894594@qq.com",
          state: false
        },
        {
          date: "3",
          mark: "王小虎",
          name: "上海市普陀区金沙江路 1519 弄",
          linkman: "廖佳新",
          phone: "15512341234",
          email: "429894594@qq.com",
          state: true
        },
        {
          date: "4",
          mark: "王小虎",
          name: "上海市普陀区金沙江路 1516 弄",
          linkman: "廖佳新",
          phone: "15512341234",
          email: "429894594@qq.com",
          state: false
        },
        {
          date: "5",
          mark: "王小虎",
          name: "上海市普陀区金沙江路 1516 弄",
          linkman: "廖佳新",
          phone: "15512341234",
          email: "429894594@qq.com",
          state: false
        }
      ],
      // 添加处模态框
      addFormVisible: false, //点击添加或编辑供应商
      topTitle: true, //true为修改；false为编辑
      datas: {
        mark: "",
        name: "",
        linkman: "",
        phone: "",
        email: "",
        site: "",
        radio2: 3 //结算方式,单选按钮
      },
      //重置密码
      dataPassWords: false,
      dataPassWord: {
        pass: "",
        checkPass: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 添加-点击创建时 和 编辑-点击确定时
    addGoods(key) {
      console.log(key); //点击时获取的数据
      this.addFormVisible = false;
      // this.$message({
      //   message: "恭喜你，品牌添加成功",
      //   type: "success"
      // });
      this.$message.error("添加失败,还没有接口！");
    },
    // 点击添加
    handAdd() {
      var that = this;
      that.addFormVisible = true;
      that.topTitle = true;
      that.datas.mark = "";
      that.datas.name = "";
      that.datas.linkman = "";
      that.datas.phone = "";
      that.datas.email = "";
      that.datas.site = "";
      that.radio2 = 3;
    },
    // 点击编辑
    handleEdit(index, row) {
      var that = this;
      console.log(index, row);
      that.addFormVisible = true;
      that.topTitle = false;
      that.datas.mark = row.mark;
      that.datas.name = row.name;
      that.datas.linkman = row.linkman;
      that.datas.phone = row.phone;
      that.datas.email = row.email;
    },
    // 点击重置
    resetPass(index, row) {
      var that = this;
      console.log(index, row);
      that.dataPassWords = true;
      that.dataPassWord.pass = "";
      that.dataPassWord.passWord = "";
    },
    resetSucceed(key) {
      console.log(key);
      this.dataPassWords = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
.SupplierList {
  background-color: #fff;
  margin: 22px;
  border-radius: 4px;
}
.SupplierList>>>.el-select .el-input{
	width: 125px;
}
.headerInput {
  float: right;
  margin: 12px 20px;
}
.conter {
  padding: 20px 0px 0px 20px;
}
.split {
  color: #c4c4c4;
  display: inline-block;
  border-radius: 4px;
}
.addArea .bluebg {
  height: 34px;
  height: 34px;
  width: 110px;
}
.SupplierList .addArea {
  padding: 15px 0px;
}
.buttons {
  width: 68px;
}
.buttonEEE {
  background-color: #eee;
}
/* 日期选择器 */
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 150px;
}
</style>