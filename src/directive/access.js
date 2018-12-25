import rbac from '@/libs/rbac'
/**
 * access 指令
 * @param {*} Vue 
 */
const accessDirective = function (Vue) {
  Vue.directive('access', {
    bind: function (el, { value, arg, modifiers }) {
      // 有权限就不需要隐藏
      if (rbac(value)) {

      } else {
        el.style.display = 'none';
      }
    }
  })
}

export default accessDirective
