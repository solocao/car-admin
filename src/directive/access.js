import store from '@/store'
/**
 * access 指令
 * @param {*} Vue 
 */
const accessDirective = function (Vue) {
  Vue.directive('access', {
    bind: function (el, { value, arg, modifiers }) {
      console.log('来啦，老弟');
      console.log(value);
      console.log(store.state);
      el.style.display = 'none';
    }
  })
}

export default accessDirective;