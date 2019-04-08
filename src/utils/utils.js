import {getRequest} from './api'
import {Message} from 'element-ui'

export const isNotNullORBlank = (...args)=> {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i];
    if (argument == null || argument == '' || argument == undefined) {
      Message.warning({message: '数据不能为空!'})
      return false;
    }
  }
  return true;
}
export const initMenu = (router, store)=> {
  if (store.state.routes.length > 0) {
    return;
  }
  getRequest("/system/menus").then(resp=> {
    if (resp && resp.status == 200) {
      var fmtRoutes = formatRoutes(resp.data.data);
      router.addRoutes(fmtRoutes);
      store.commit('initMenu', fmtRoutes);
      store.dispatch('connect');
    }
  })
}
export const formatRoutes = (routes)=> {
  let fmRoutes = [];
  routes.forEach(router=> {
    let {
      path,
      component,
      name,
      meta,
      children
    } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      component(resolve){
        if (component.startsWith("Home")) {
          require(['../components/' + component + '.vue'], resolve)
        } else if (component.startsWith("Sys")) {
          require(['../components/system/'+ component + '.vue'],resolve)
        }else if (component.startsWith("Data")){
          require(['../components/data_manager/'+ component + '.vue'],resolve)
        }
      },
      name: name,
      meta: meta,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
}
