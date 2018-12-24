import rbac from '@/libs/rbac'
/**
 * access 指令
 * @param {*} Vue 
 */
const accessDirective = function (Vue) {
  Vue.directive('access', {
    bind: function (el, { value, arg, modifiers }) {
      if (!rbac(value)) {
        el.style.display = 'none';
      }
    }
  })
}

export default accessDirective;