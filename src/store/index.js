/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88" . "88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              ."" '< `.___\_<|>_/___.' >'"".
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
/**
 * Created by liangshan on 2017/7/13.
 */
// import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import * as types from './mutation-types'

const env = weex.config.env || WXEnvironment
if (env.platform !== 'Web') {
  Vue.use(Vuex)
}

function isEmptyObj (obj) {
  var t;
  for (t in obj)
    return !1
  return !0
}

const store = new Vuex.Store({
  actions,
  mutations: mutations.mutations,
  getters,
  state: {
    baseRequestUrl: 'http://127.0.0.1:3002/index/',
    // baseRequestUrl: 'http://talkapi.dei2.com/index/',
    storageKey: {
      login: 'weexUserInfo'
    },
    isLogin: false, // 是否为登录状态
    userInfo: {},   // 登录用户信息
    banner: {
      shown: true
    },
    topMenu: {
      shown: true
    },
    hotRecruitment: {
      shown: true
    },
    hotIndustry: {
      shown: true
    },
    hotSubject: {
      shown: true
    },
    feedback: {
      shown: true
    },
    app: {
      name: env.appName || '',
      version: env.appVersion || '0.0.1',
    },
    device: {
      model: env.deviceModel || '',
      width: env.deviceWidth || 750,
      height: env.deviceHeight || 1334,
      dpr: env.platform.toLowerCase() === 'web' ? env.dpr : 1
    },
    appHeader: {
      title: env.appName || '',
      theme: '#4fc08d',
      color: '#ffffff'
    },
    platform: env.platform && env.platform.toLowerCase() || '',
    location: {
      name: ''
    },
    popup: {
      title: '弹出窗口',
      shown: false
    },
    history: [],
    tabItems: [
      {
        index: 0,
        title: '百思不得姐',
        titleColor: '#000000',
        icon: '',
        image: 'http://static.dei2.com/app/ti/bdj_unselect.png',
        selectedImage: 'http://static.dei2.com/app/ti/bdj_selected.png',
        src: '/tabA',
        visibility: 'visible',
      },
      {
        index: 1,
        title: '今日头条',
        titleColor: '#000000',
        icon: '',
        image: 'http://static.dei2.com/app/ti/tt_unselect.png',
        selectedImage: 'http://static.dei2.com/app/ti/tt_selected.png',
        src: '/tabB',
        visibility: 'hidden',
      },
      {
        index: 2,
        title: '我',
        titleColor: '#000000',
        icon: '',
        image: 'http://static.dei2.com/app/ti/m_unselect.png',
        selectedImage: 'http://static.dei2.com/app/ti/m_selected.png',
        src: '/tabC',
        visibility: 'hidden',
      }
    ]
  }
})

const storage = weex.requireModule('storage')
storage.getItem('weexUserInfo', event => {
  let _data = ''
  try {
    _data = JSON.parse(event.data)
  } catch (err) {
    _data = event.data
  }
  if (!isEmptyObj(_data) && _data !== 'undefined') {
    store.commit(types.INIT_LOGIN_INFO, {
      userInfo: _data
    })
  } else {
    store.commit(types.RESET_LOGIN_INFO)
  }
})

export default store

if (env.platform.toLowerCase() !== 'web') {
  global.store = store
}