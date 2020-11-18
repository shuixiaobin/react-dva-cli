import request from '../utils/request'

// 课程详情
export function getClassDetail(params) {
  return request.get('/lumenapi/v4/common/class/class_detail', {
    params
  })
}
// 课程介绍
export function getClassIndro(params) {
  return request.get('/lumenapi/v4/common/class/course_introduction', {
    params
  })
}

// 课程详情html
export function getClassExt(params) {
  return request.get('/lumenapi/v4/common/class/class_ext', {
    params
  })
}

// 课程评价列表
export function getEvaluateList(params) {
  return request.get('/lumenapi/v4/common/class/evaluation', {
    params
  })
}
// 老师介绍
export function getIntroduceList(params) {
  return request.get('/lumenapi/v4/common/teacher/teacher_info', {
    params
  })
}

// 获取课程大纲
export function getOutline(params) {
  return request.get('/lumenapi/v4/common/class/class_syllabus', {
    params
  })
}

// 获取活动列表
export function getActivityList(params) {
  return request.get('/lumenapi/v4/common/class/appClass_activity_details', {
    params
  })
}

// 获取试听列表
export function getAuditionList(params) {
  return request.get('/lumenapi/v4/common/class/class_audition_list', {
    params
  })
}

// 获取售后老师列表
export function getAfterTeacher(params) {
  return request.get('/lumenapi/v4/common/class/syllabus_teachers', {
    params
  })
}

// 获取售后阶段和课程列表
export function getAfterClassList(params) {
  return request.get('/lumenapi/v4/common/class/syllabus_classes', {
    params
  })
}

// 获取售后大纲数据
export function getAfterOutline(params) {
  return request.get('/lumenapi/v4/common/class/buy_after_syllabus', {
    params
  })
}

// 获取讲义接口
export function getHandouts(params) {
  return request.get('/lumenapi/v4/common/class/get_handouts', {
    params
  })
}

// 获取直播链接
export function getLiveUrl(params) {
  return request.get('/lumenapi/v4/common/class/class_token', {
    params: {
      netClassId: params.netClassId,
      roomID: params.bjyRoomId,
      userAvatar: params.userAvatar,
      userName: params.userName,
      userNick: params.userNick,
      userNumber: params.userNumber,
      userRole: 0,
      videoType: 2
    }
  })
}

// 提交课件评价
export function submitEvaluation(params) {
  return request.post('/lumenapi/v4/common/evaluation/submit', {
    json: params
  })
}

// 是否评价
export function isEvaluation(params) {
  return request.get('/lumenapi/v4/app/lession/evaluate', {
    params
  })
}

// 获取课程详情神策埋点信息
export function getSensorsData(params) {
  return request.get('/lumenapi/v4/common/class/class_sensors', {
    params
  })
}
