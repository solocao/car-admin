import store from '@/store'
const roles = ['admin', 'advertiser', 'lease', 'server'];
const rbac = (role) => {
  console.log('看看传过来的role值');
  console.log(role);
  console.log(store.state);
  return true;
}

export default rbac;