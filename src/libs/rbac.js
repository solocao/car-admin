import store from '@/store';

const roles = {
  admin: ['admin', 'advertiser', 'lease', 'service'],
  advertiser: ['advertiser'],
  lease: ['lease'],
  service: ['service']
}



const rbac = (role) => {
  const userRole = store.state.user.info.role;
  const can = roles[userRole];
  return can.includes(role);
}

export default rbac;