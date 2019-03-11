<template>
  <div class="addPage">
    <div class="title">
      <span>位置：</span>
      <Breadcrumb separator=">">
        <BreadcrumbItem>部门管理</BreadcrumbItem>
        <BreadcrumbItem>部门数据上报</BreadcrumbItem>
        <BreadcrumbItem>临时数据模板</BreadcrumbItem>
        <BreadcrumbItem>临时应急数据表单定义</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="addPagetitle">
      <BreadcrumbItem>临时应急数据表单定义</BreadcrumbItem>
      <div class="buttons pull-right" style="width:300px">
        <Button type="ghost" @click="btna">返回</Button>
        <Button type="primary" @click="_gettiaoList('formItem')" v-if="btns">新增保存</Button>
        <Button type="warning" @click="_gettiaoeditList" v-if="btn">修改保存</Button>
      </div>
    </div>

    <!--输入框-->
    <div class="cont">
      <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="80" class="forms">
        <Form-item label="表单名称" prop="formname" style="width:600px">
          <Input
            v-model="formItem.formname"
            :disabled="formDisabled"
            placeholder="请输入表单名称"
            style="width:600px"
          ></Input>
        </Form-item>
        <Form-item label="表单说明" prop="form_desc" style="width:600px">
          <Input v-model="formItem.form_desc" placeholder="请输入表单说明" style="width:600px"></Input>
        </Form-item>
        <!-- <Form-item label="选择部门" style="width:600px">
					<Select v-model="department_names" @on-change="depcoed" filterable multiple style="width:600px">
						<Option v-for="item in departmentLists" :value="item.fullname" :key="item.department_code">{{ item.fullname }}</Option>
					</Select>
        </Form-item>-->
        <FormItem label="导入excel" style="width:600px">
          <a href="javascript:;" class="a-upload">
            <input ref="referenceUpload" id="upload" type="file" v-on:input="uploadExcel">
            点击这里上传文件
          </a>
          <Button style="float:left;margin-left:20px" type="primary" @click="downloadExcel">模板下载</Button>
        </FormItem>
      </Form>
    </div>

    <!--模态框  -->
    <template slot="content">
      <!--确认删除  -->
      <Modal v-model="modal2" width="360">
        <p slot="header" style="color:red;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除</span>
        </p>
        <div style="text-align:center">
          <p>确认删除此栏位？</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long :loading="modal_loading" @click="_getDelList">确认</Button>
        </div>
      </Modal>

      <Modal v-model="modal3" :styles="{height:'500px'}" width="880px">
        <div slot="header">选择涉及部门</div>
        <div style="width:100%;display:block;position:relative;height:500px;overflow-y:scroll">
          <div style="display:inline-block;width:30%;float:left">
            <span>部门:</span>
            <div
              style="width:100%"
              v-for="item in selectedArr"
              :key="item.code"
              @click="exchange($event)"
            >
              <div
                style="width:100%"
                class="selectdep"
                @click="_getbumensListTwo(item.code)"
              >{{item.fullname}}</div>
            </div>
          </div>
          <div style="display:inline-block;margin-left:5%;width:30%;float:left">
            <span>子部门:</span>
            <div style="width:100%" v-for="item in selectedArrTwo" :key="item.code">
              <div class="selectdepi">
                {{item.fullname}}
                <input
                  style="width:10%;float:right;"
                  :value="item.fullname"
                  v-model="social"
                  type="checkbox"
                >
              </div>
            </div>
          </div>
          <div style="display:inline-block;margin-left:5%;width:30%;float:left">
            <span>已选:</span>
            <div style="width:100%;" v-for="item in social" :key="item">
              <div class="selectdepi">
                {{item}}
                <Button
                  @click="delItem(item)"
                  style="float:right;margin-top:-3px"
                  size="small"
                  type="error"
                >X</Button>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer">
          <Button type="primary" @click="_getaddInvolved">保存</Button>
        </div>
      </Modal>
    </template>

    <!-- 表格 -->
    <div class="center tablex">
      <Table border highlight-row :data="UserData" :columns="theadArr" stripe></Table>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { temporaryThead } from 'common/js/table'
import { mapMutations } from 'vuex'
import { successNotice, errorNotice, getLocalStorage, senActive } from 'common/js/dom'
import { cloneObj, likeStrSearch, getFileName, getFileType, unique } from 'common/js/util'
import { getaddList, getUserList, geteditList} from 'api/temporarypagemodel'
import { getUserLists } from 'api/temporary'
import { getbumensList, getDepList, getbumenlist, getbumensListOne, getbumensListTwo } from 'api/bumenlist'
import { temporarypagemodelRules } from 'common/js/rules'

export default {
  data () {
    return {
    ruleValidate: temporarypagemodelRules,
    spinShow: false,
    theadArr: temporaryThead(this),
    UserData: [],
    modal_loading: false,
    index: 0,
    modal2: false,
    updateTitle: '',
    involvedTitle: '选择部门',
    modal1: false,
    modal3: false,
    btns: true,
    btn: false,
    formDisabled: false,
    departmentLists: [],
    involved: {
      _index: 0,
      department_list: []
    },
    department_names: [],
    formItem: {
      formname: '',
      form_desc: '',
      col_info: [{}]
    },
    involvedItem: {
      col_info: '' // 模态框2涉及部门
    },
    selectedArr:[],  //级联一级目录
    selectedArrTwo:[],  //级联二级目录
    social:[],
    }
  },
  methods: {
    btna () {
      this.$router.push('/home/depManagement/temporary')
    },
    exchange:function(event){
      //获取被点击的元素对象
      var classElements = document.getElementsByClassName('selectdep');
      for (var i=0; i<classElements.length; i++) {
        classElements[i].setAttribute('style', 'color:#495060; border-color: #dddee1;')
      }
      event.target.setAttribute('style', 'color:#2db7f5; border-color: #2db7f5;')
    },
    delItem(i) {
      this.social.splice(this.social.findIndex(item => item === i),1)
    },
    // 选择部门
    depcoed (names) {
      this.involved.department_list = []
      for (var i = 0; i < names.length; i++) {
        for (var j = 0; j < this.departmentLists.length; j++) {
          if (this.departmentLists[j].fullname === names[i]) {
            var str = {}
            str.department_name = this.departmentLists[j].fullname
            str.department_level = this.departmentLists[j].level
            str.department_code = this.departmentLists[j].code
            this.involved.department_list.push(str)
          }
        }
      }
    },

    // 表格列表
    _getUserList (search) {
      search = {
        _id: this.temporaryid
      }
      // this.loading = true
      // 判断这个is是否是新增还是编辑，如果是新增表格内容那就为空
      // 以下是编辑页面执行
      if (getLocalStorage('temporaryid') != 'false' && getLocalStorage('temporaryid') != 'detail') {
        getUserList(search).then(res => {
          if (res.code === ERR_OK) {
            // this.loading = false;
            this.formDisabled = true
            this.btn = true
            this.btns = false
            this.formItem = res.result.result[0]
            this.UserData = res.result.result[0].col_info
          }
        })
      }
    },
  // 改变栏位类型
  changeType (r, e) {
    var that = this
      let i = r._index
      that.UserData[i].栏位类型 = e
    },
    // 改变栏位说明
    inputExplain (r, e) {
      var that = this
      let i = r._index
      that.UserData[i].栏位说明 = e.srcElement.value   //获取栏位值
    },
    // 改变涉及部门
    selectDepartment (r, e) {
      var that = this
      var i = r._index
      that.involved._index = i
      if(that.UserData[i].涉及部门 == '') {
        that.social = []
        that.modal3 = true
      } else {
        var ss = that.UserData[i].涉及部门
        var arr = ss.split('|')
        that.social = arr
        that.modal3 = true
        }
    },
    // 上传excel
    uploadExcel (e) {
        var _this = this
        var tableType = getFileType(e.currentTarget.files[0].name)   //获取导入的文件后缀 用于判断
        if (tableType == 'csv' || tableType == 'xlsx' || tableType == 'xls') {
          _this.tableName = getFileName(e.currentTarget.files[0].name)   //获取Excel的表名
          var files = e.target.files
          var fileReader = new FileReader()
          fileReader.onload = function (e) {
            try {
              var data = e.target.result,
                workbook = XLSX.read(data, {
                  type: 'binary'
                }), // 以二进制流方式读取得到整份excel表格对象
                persons = [] // 存储获取到的数据
            } catch (e) {
              this.$Message.error('文件类型不正确')
              return
          }

          // 表格的表格范围，可用于判断表头是否数量是否正确
          var fromTo = ''
          // 遍历每张表读取
          for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              fromTo = workbook.Sheets[sheet]['!ref']
              persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
              // break; // 如果只取第一张表，就取消注释这行
            }
          }

          var arr = []
          var tableData = []
          persons.forEach(function (v,k) {
              arr.push(v)
          })
          for (let j = 0; j < arr.length; j++) {
            let newJson = {栏位名称: '', 栏位类型: '', 栏位说明: '', 涉及部门: '', 部门CODE: ''}
            newJson.栏位名称 = arr[j].栏位名称
            newJson.栏位说明 = arr[j].栏位说明
            tableData.push(newJson)
          }
          _this.UserData = tableData
          _this.$refs.referenceUpload.value = null;
                // 以二进制方式打开文件
          }
          fileReader.readAsBinaryString(files[0])
      } else {
        alert('请选择Excel文件')
      }
    },
    //下载模板
    downloadExcel(){
      var url = window.location.hostname + ':' + window.location.port + '/sanfang/foundation/download/demo.xlsx'
      window.location.href = `http://${url}`
    },
    // 部门列表
    getDepartmentNameList (page, search) {
      getbumensList(page, search).then(res => {
        if (res.code === ERR_OK) {
          this.departmentLists = res.result.result
          // this.depcoed();
          this._getUserList()
        }
      })
    },

    // 选择涉及部门模态框
    _getaddInvolved () {
      var that = this
      let _index = that.involved._index
      let array = that.social
      var arr = []
      if(array.length != 0) {
        for (var i = 0; i< array.length; i++) {
          for (var j = 0; j < that.departmentLists.length; j++) {
            if(that.departmentLists[j].fullname === array[i]){
              var str = []
              str.department_name = that.departmentLists[j].fullname
              str.department_level = that.departmentLists[j].level
              str.department_code = that.departmentLists[j].code
              //if(str.department_name)
              arr.push(str)
              that.involved.department_list = arr
              //that.involved.department_list.push(str)
            }
          }
        }
        this.dep()
      } else {
        that.involved.department_list = []
        this.dep()
      }

    },
    dep() {
      var that = this
      let _index = that.involved._index
      let arrays = that.involved.department_list
      let newArrays = []                              //新数组，用于去重
      for (let i = 0; i < arrays.length; i++) {
        var flag = true
        for (let j = 0; j < newArrays.length; j++) {
          if(arrays[i].department_name == newArrays[j].department_name) {
            flag = false
          }
        }
        if(flag){
          newArrays.push(arrays[i])
        }
      }

      var codeArray = ''
      var nameArray = ''
      for (let p in newArrays) {
          codeArray += newArrays[p].department_code + '|'
          nameArray += newArrays[p].department_name + '|'
      }
      codeArray = codeArray.substr(0, codeArray.length - 1)
      nameArray = nameArray.substr(0, nameArray.length - 1)
      that.UserData[_index].涉及部门 = nameArray
      that.UserData[_index].部门CODE = codeArray
      that.involvedItem.col_info = []
      that.modal3 = false
    },
    // 页面点击新增保存按钮
    _gettiaoList (name) {
      if (this.UserData.length == 0) {
        this.$Notice.warning({
          title: '请导入或添加栏位'
        })
      } else {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.formItem.col_info = this.UserData
            // if(this.formItem.col_info != "" && this.formItem.col_info != null) {
            this.spinShow = true
            let search = {
              formname:this.formItem.formname
            }
            getUserLists(search).then(res => {
              if (res.result.result.length === 0){
                // 新增保存时候调用新增的接口
                getaddList(this.formItem).then(res => {
                  if (res.code === ERR_OK) {
                    this.$Notice.success({
                      title: '新增成功'
                    })
                    this.$router.push('/home/depManagement/temporary')
                  }
                  else if (res.code === '9999') {
                    this.$Notice.warning({
                      title: '已存在此表'
                    })
                  }
                  else if (res.code === '0001') {
                    this.$Notice.warning({
                      title: '系统异常'
                    })
                  }
                  else {
                    this.$Notice.warning({
                      title: '请或导入添加栏位'
                    })
                  }
                  this.spinShow = false
                })
              } else {
                this.spinShow = false
                this.$Notice.warning({
                      title: '已存在此表'
                })
              }
            })
          }
        })
      }
    },
    // 页面点击修改按钮
    _gettiaoeditList () {
      this.formItem.col_info = this.UserData
      geteditList(this.formItem).then(res => {
        if (res.code === ERR_OK) {
          this.$Notice.success({
            title: '修改成功'
          })
          this.$router.push('/home/depManagement/temporary')
        }
      })
    },
    // 页面点击删除按钮
    _getDelList () {
      this.UserData.splice(this.index._index, 1)
      this.modal2 = false
    },
    // 删除
    del (index) {
      this.modal2 = true
      this.index = index
    },
    //获取级联一级菜单
    _getbumensListOne (page) {
      getbumensListOne(page).then(res => {
        if(res.code === ERR_OK) {
          this.selectedArr = res.result.result
        }
      })
    },
    _getbumensListTwo (search) {
      getbumensListTwo(search).then(res => {
        if(res.code === ERR_OK) {
          var arr = res.result.result
          var arr2 = []
          arr.forEach(function(val,key){
            if(val.level3 != '' && val.level4 == '' ) {
              arr2.push(val)
            }
          })
          //子部门去重
          var obj = {}
          var arr3 = []
          arr2.forEach(function(val,key){
            if(!obj[val.fullname]){
              obj[val.fullname] = 1
              arr3.push(val)
            }
          })
          this.selectedArrTwo = arr3
        }
      })
    },
  },
  mounted () {
    this.getDepartmentNameList()
    this._getbumensListOne()
  },
  created () {
    this.temporaryid = getLocalStorage('temporaryid')
  }
}
/* eslint-enable */
</script>

<style scoped lang="scss">
	.addPagetitle {
		font-size: 20px;
		margin-bottom: 40px;
	}

	.cont {
		margin: 0 auto;
		width: 200rem;
        .a-upload {
			position: relative;
			display: inline-block;
			background: #D0EEFF;
			border: 1px solid #99D3F5;
			border-radius: 4px;
			padding: 4px 12px;
			overflow: hidden;
			color: #1E88C7;
			text-decoration: none;
			text-indent: 0;
			line-height: 20px;
      float: left;
		}
		.a-upload  input {
			position: absolute;
			font-size: 100px;
			right: 0;
			top: 0;
			opacity: 0;
		}

		.a-upload:hover {
			background: #AADFFD;
			border-color: #78C3F3;
			color: #004974;
			text-decoration: none;
		}
	}

	.addPage {
		text-align: center;
		/* width: 30rem; */
		height: 100%;
		.title {
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			flex-direction: row;
			width: 100%;
			background: rgb(237, 246, 250);
			height: 0.5rem;
			line-height: 0.5rem;
			padding-left: 10px;
			>span {
				font-size: 14px;
				font-weight: 600;
			}
		}
	}
	.mangerment section {
		overflow: hidden;
	}
	.selectdep {
		margin-bottom: 2px;
		font-weight: 400;
		text-align: center;
		vertical-align: middle;
		touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 4px 15px;
    font-size: 12px;
    //border-radius: 4px;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
    color: #495060;
    background-color: #f7f7f7;
    border-color: #dddee1;
	}

	.selectdeped {
		margin-bottom: 2px;
		font-weight: 400;
		text-align: center;
		vertical-align: middle;
		touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 4px 15px;
    font-size: 12px;
    //border-radius: 4px;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
    color: #2db7f5;
    background-color: #f7f7f7;
    border-color: #2db7f5;
	}

	.selectdepi {
		margin-bottom: 2px;
		font-weight: 400;
		// text-align: center;
		vertical-align: middle;
		touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 4px 15px;
    font-size: 12px;
    //border-radius: 4px;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
    color: #495060;
    background-color: #f7f7f7;
    // border-color: #dddee1;
	}
</style>
