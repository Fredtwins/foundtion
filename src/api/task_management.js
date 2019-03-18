import { ajaxPost } from 'api/axios'
import { getUserIng } from 'common/js/util'

// 任务预设
// 查询全部列表
export function getpresetTaskList (obj) {
  let url = 'sf_task_preplan/listForDept'
  let data = {
    page: obj.page,
    pageSize: obj.pageSize,
    order: {_id: -1} || obj.order,
    searchValue: {
      ...obj.searchValue
    }
  }
  return ajaxPost(url, data, options())
}
// 列表
export function getpresetTaskListtemp (page = 1, search = {}) {
  let url = 'sf_task_preplan/listForDept'

  let data = {
    page: page,
    pageSize: 10,
    searchValue: {
      ...search
    },
    order: {_id: -1}
  }

  return ajaxPost(url, data, options())
}
// 增加
export function addpresetTask (obj) {
  let url = 'sf_task_preplan/new'

  return ajaxPost(url, obj, options())
}

// 编辑
export function editpresetTask (obj) {
  let url = 'sf_task_preplan/edit'
  return ajaxPost(url, obj, options())
}

// 删除
export function deletepresetTask (obj) {
  let url = 'sf_task_preplan/delete'
  return ajaxPost(url, obj, options())
}

// 任务执行
// 查询全部列表
export function getTaskCryList (obj) {
  let url = 'sf_task/listForDept'
  let data = {
    page: obj.page,
    pageSize: obj.pageSize,
    order: {_id: -1} || obj.order,
    searchValue: {
      ...obj.searchValue
    }
  }
  return ajaxPost(url, data, options())
}
// 增加
export function addTaskCry (obj) {
  let url = 'sf_task/new'

  return ajaxPost(url, obj, options())
}

// 编辑
export function editTaskCry (obj) {
  let url = 'sf_task/edit'
  return ajaxPost(url, obj, options())
}

// 删除
export function deleteTaskCry (obj) {
  let url = 'sf_task/delete'
  return ajaxPost(url, obj, options())
}

// 生成事前任务
export function addBeforeTask () {
  let url = 'sf_task/generateTask'
  let obj = {
    'department_code': getUserIng().department_code,
    'task_type': '事前任务'
  }
  return ajaxPost(url, obj, options())
}
