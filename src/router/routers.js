import Main from '@/views/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true
        },
        component: () => import('@/views/single-page/home')
      }
    ]
  },
  {
    path: '/gaikuang',
    name: '概况',
    component: Main,
    tabMenu: 'home',
    children: [
      {
        path: 'gaikuang',
        name: 'gaikuang',
        meta: {
          icon: 'ios-navigate',
          title: '概况'
        },
        component: () => import('@/views/report/verify.vue')
      },
    ]
  },
  // 首页 设置
  {
    path: '/gaikuang',
    name: '设置',
    component: Main,
    tabMenu: 'home',
    children: [
      {
        path: 'gaikuang',
        name: 'gaikuang',
        meta: {
          icon: 'ios-navigate',
          title: '概况'
        },
        component: () => import('@/views/report/verify.vue')
      },
    ]
  },


  // 出行活动
  {
    path: '/active',
    name: '出行活动',
    component: Main,
    tabMenu: 'active',
    children: [
      {
        path: 'add',
        name: 'normal_add',
        meta: {
          icon: 'ios-navigate',
          title: '新增活动'
        },
        component: () => import('@/views/active/normal/add.vue')
      },
      {
        path: 'list',
        name: 'normal_list',
        meta: {
          icon: 'ios-navigate',
          title: '活动列表'
        },
        component: () => import('@/views/active/normal/list.vue')
      },
      {
        path: 'detail',
        name: 'normal_detail',
        meta: {
          icon: 'ios-navigate',
          title: '活动详情'
        },
        component: () => import('@/views/active/normal/detail.vue')
      },
    ]
  },
  // 服务网点
  {
    path: '/active',
    name: '服务网点',
    component: Main,
    tabMenu: 'active',
    children: [
      {
        path: 'service/point',
        name: 'service_point',
        meta: {
          icon: 'ios-navigate',
          title: '网点列表'
        },
        component: () => import('@/views/active/ServicePoint.vue')
      },
      {
        path: 'service/active',
        name: 'service_active',
        meta: {
          icon: 'ios-navigate',
          title: '贴纸管理'
        },
        component: () => import('@/pages/operate/service/active.vue')
      },
    ]
  },

  // 系统消息
  {
    path: '/message',
    name: '系统消息',
    component: Main,
    tabMenu: 'active',
    children: [
      {
        path: 'list',
        name: 'message_list',
        meta: {
          icon: 'ios-navigate',
          title: '消息列表'
        },
        component: () => import('@/pages/operate/message/list.vue')
      },
      {
        path: 'add',
        name: 'message_add',
        meta: {
          icon: 'ios-navigate',
          title: '新增消息'
        },
        component: () => import('@/pages/operate/message/add.vue')
      },
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Main,
    name: '订单管理',
    tabMenu: 'ad',
    children: [
      {
        path: 'list124',
        name: 'list14',
        meta: {
          icon: 'ios-navigate',
          title: '订单列表'
        },
        component: () => import('@/views/order/orderList.vue')
      },
    ]
  },

  // 用户 普通用户
  {
    path: '/user',
    name: '普通用户',
    component: Main,
    tabMenu: 'user',
    children: [
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '用户列表'
        },
        component: () => import('@/views/user/common/list.vue')
      },
      {
        path: 'verify',
        name: 'verify_list',
        meta: {
          icon: 'ios-navigate',
          title: '认证列表'
        },
        component: () => import('@/views/user/common/verifyList.vue')
      },
    ]
  },
  // 用户 租赁商
  {
    path: '/user',
    name: '租赁商',
    component: Main,
    tabMenu: 'user',
    children: [
      {
        path: 'lease/add',
        name: 'lease_user_add',
        meta: {
          icon: 'ios-navigate',
          title: '新增租赁商'
        },
        component: () => import('@/views/user/lease/add.vue')
      },
      {
        path: 'lease/list',
        name: 'lease_user_list',
        meta: {
          icon: 'ios-navigate',
          title: '租赁商列表'
        },
        component: () => import('@/views/user/lease/list.vue')
      },
      {
        path: 'lease/car',
        name: 'lease_user_car',
        meta: {
          icon: 'ios-navigate',
          title: '租赁商车型库'
        },
        component: () => import('@/views/user/lease/car.vue')
      },
    ]
  },
  // 用户 广告主
  {
    path: '/advertiser',
    name: '广告主',
    component: Main,
    tabMenu: 'user',
    children: [
      {
        path: 'user/add',
        name: 'advertiser_user_add',
        meta: {
          icon: 'ios-navigate',
          title: '新增广告主'
        },
        component: () => import('@/views/user/advertiser/add.vue')
      },
      {
        path: 'list',
        name: 'advertiser_user_list',
        meta: {
          icon: 'ios-navigate',
          title: '广告主列表'
        },
        component: () => import('@/views/user/advertiser/list.vue')
      }
    ]
  },
  // 车辆
  {
    path: '/car',
    name: '车型库',
    component: Main,
    tabMenu: 'car',
    children: [
      {
        path: 'category',
        name: 'category',
        meta: {
          icon: 'ios-navigate',
          title: '品牌分类'
        },
        component: () => import('@/views/car/category.vue')
      }, {
        path: 'list',
        name: 'list',
        meta: {
          icon: 'ios-navigate',
          title: '车型列表'
        },
        component: () => import('@/views/user/UserNormal.vue')
      }
    ]
  },
  // 财务
  {
    path: '/finance',
    name: '财务操作',
    component: Main,
    tabMenu: 'finance',
    children: [
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '提现申请'
        },
        component: () => import('@/views/user/UserNormal.vue')
      },
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '提现申请'
        },
        component: () => import('@/views/user/UserNormal.vue')
      }
    ]
  },
  {
    path: '/finance',
    name: '财务记录',
    component: Main,
    tabMenu: 'finance',
    children: [
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '充值记录'
        },
        component: () => import('@/views/user/UserNormal.vue')
      },
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '资金管理'
        },
        component: () => import('@/views/user/UserNormal.vue')
      }
    ]
  },
  // 财务 佣金记录
  {
    path: '/finance',
    name: '拥金记录',
    component: Main,
    tabMenu: 'finance',
    children: [
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '充值记录'
        },
        component: () => import('@/views/user/UserNormal.vue')
      },
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '资金管理'
        },
        component: () => import('@/views/user/UserNormal.vue')
      }
    ]
  },
  // 小程序
  {
    path: '/applet',
    name: '小程序',
    component: Main,
    tabMenu: 'weixin',
    children: [
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '首页导航按钮'
        },
        component: () => import('@/views/user/UserNormal.vue')
      },
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '首页幻灯片'
        },
        component: () => import('@/views/user/UserNormal.vue')
      },
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '小程序支付配置'
        },
        component: () => import('@/views/user/UserNormal.vue')
      },
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '小程序配置'
        },
        component: () => import('@/views/user/UserNormal.vue')
      }
    ]
  },
  // 公众号 
  {
    path: '/applet',
    name: '公众号',
    component: Main,
    tabMenu: 'weixin',
    children: [
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '首页导航按钮'
        },
        component: () => import('@/views/user/UserNormal.vue')
      },
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '首页幻灯片'
        },
        component: () => import('@/views/user/UserNormal.vue')
      },
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '小程序支付配置'
        },
        component: () => import('@/views/user/UserNormal.vue')
      },
      {
        path: 'normal',
        name: 'normal',
        meta: {
          icon: 'ios-navigate',
          title: '小程序配置'
        },
        component: () => import('@/views/user/UserNormal.vue')
      }
    ]
  },
  {
    path: '/report',
    name: 'report',
    component: Main,
    tabMenu: 'home',
    meta: {
      hide: true,
      title: '统计管理',
      icon: 'ios-list-box'
    },
    children: [
      {
        path: 'report_verify',
        name: 'report_verify',
        meta: {
          icon: 'ios-navigate',
          title: '上报审核'
        },
        component: () => import('@/views/report/verify.vue')
      },
      {
        path: 'report_appeal',
        name: 'report_appeal',
        meta: {
          icon: 'ios-navigate',
          title: '申诉处理'
        },
        component: () => import('@/views/report/appeal.vue')
      }
    ]
  },
  {
    path: '/org',
    name: '组织结构',
    meta: {
      icon: 'md-list-box',
    },
    component: Main,
    children: [
      {
        path: 'rank',
        name: '总部管理部门',
        meta: {
          icon: 'md-ionic',
        },
        component: () => import('@/views/org/rank.vue')
      },
      {
        path: 'depart',
        name: '地区项目部门',
        meta: {
          icon: 'ios-ionic-outline',
        },
        component: () => import('@/views/org/depart.vue')
      }]
  },
  {
    path: '/user',
    name: '用户管理',
    meta: {
      icon: 'ios-people',
    },
    component: Main,
    children: [
      {
        path: 'user_manage',
        name: 'user_manage',
        meta: {
          icon: 'ios-contacts',
          title: '用户列表'
        },
        component: () => import('@/views/user/list.vue')
      },
      {
        path: 'role_manage',
        name: 'role_manage',
        meta: {
          icon: 'ios-contact',
          title: '用户权限'
        },
        component: () => import('@/views/user/role.vue')
      }
    ]
  },
  {
    path: '/money',
    name: '红包管理',
    meta: {
      hide: true,
      title: '红包管理',
      icon: 'logo-yen'
    },
    component: Main,
    children: [
      {
        path: 'set_amount',
        name: 'set_amount',
        meta: {
          icon: 'logo-yen',
          title: '设置金额'
        },
        component: () => import('@/views/reward/SetAmount.vue')
      },
      {
        path: 'comfirm_send',
        name: 'comfirm_send',
        meta: {
          icon: 'ios-paper-plane',
          title: '奖励发放'
        },
        component: () => import('@/views/reward/ComfirmSend.vue')
      }
    ]
  },
  {
    path: '/setting',
    name: '参数设置',
    meta: {
      hide: true,
      title: '参数设置',
      icon: 'md-settings'
    },
    component: Main,
    children: [
      {
        path: 'type',
        name: 'type',
        meta: {
          icon: 'md-hand',
          title: '检查类别'
        },
        component: () => import('@/views/setting/type.vue')
      },
      {
        path: 'safe',
        name: 'safe',
        meta: {
          icon: 'ios-body',
          title: '活动类型'
        },
        component: () => import('@/views/setting/safe.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '统计分析'
    },
    component: Main,
    children: [
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '项目部统计'
        },
        component: () => import('@/views/statistic/depart.vue')
      },
      // {
      //   path: 'drag_list_page',
      //   name: 'drag_list_page',
      //   meta: {
      //     icon: 'ios-infinite',
      //     title: '问题类型'
      //   },
      //   component: () => import('@/views/components/drag-list/drag-list.vue')
      // }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/404.vue')
  }
]
