import Main from '@/view/main'
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
    component: () => import('@/view/login/login.vue')
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
        component: () => import('@/view/single-page/home')
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
      title: '上报管理',
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
        component: () => import('@/view/report/verify.vue')
      },
      {
        path: 'report_appeal',
        name: 'report_appeal',
        meta: {
          icon: 'ios-navigate',
          title: '申诉处理'
        },
        component: () => import('@/view/report/appeal.vue')
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
        component: () => import('@/view/org/rank.vue')
      },
      {
        path: 'depart',
        name: '地区项目部门',
        meta: {
          icon: 'ios-ionic-outline',
        },
        component: () => import('@/view/org/depart.vue')
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
        component: () => import('@/view/user/list.vue')
      },
      {
        path: 'role_manage',
        name: 'role_manage',
        meta: {
          icon: 'ios-contact',
          title: '用户权限'
        },
        component: () => import('@/view/user/role.vue')
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
        component: () => import('@/view/reward/SetAmount.vue')
      },
      {
        path: 'comfirm_send',
        name: 'comfirm_send',
        meta: {
          icon: 'ios-paper-plane',
          title: '奖励发放'
        },
        component: () => import('@/view/reward/ComfirmSend.vue')
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
        component: () => import('@/view/setting/type.vue')
      },
      {
        path: 'safe',
        name: 'safe',
        meta: {
          icon: 'ios-body',
          title: '安全类型'
        },
        component: () => import('@/view/setting/safe.vue')
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
        component: () => import('@/view/statistic/depart.vue')
      },
      // {
      //   path: 'drag_list_page',
      //   name: 'drag_list_page',
      //   meta: {
      //     icon: 'ios-infinite',
      //     title: '问题类型'
      //   },
      //   component: () => import('@/view/components/drag-list/drag-list.vue')
      // }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
