import { computed } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { cloneDeep } from 'lodash';
import type { RouteLocationNormalized } from 'vue-router';
import { usePermission } from '@/hooks';
import appMenuRoutes from './routes';

const appMenu = computed(() => {
  const { accessRouter } = usePermission();
  const travel = (_route: RouteRecordRaw[], nodes: RouteRecordRaw[] = []) => {
    _route.forEach((element) => {
      if (element.children) {
        const children = travel(element.children);
        if (children.length === 0) return;
        element.children = children;
        nodes.push(element);
        return;
      }
      if (accessRouter(element)) {
        nodes.push(element);
      }
    });
    return nodes;
  };
  return travel(cloneDeep(appMenuRoutes));
});

const findAppMenuItem = (
  newRoute: RouteLocationNormalized
): RouteRecordRaw[] => {
  const travel = (
    _route: RouteRecordRaw[],
    name: string,
    nodes: RouteRecordRaw[]
  ): boolean => {
    for (let i = 0; i < _route.length; i += 1) {
      const element = _route[i];
      if (element.children) {
        nodes.push(element);
        if (travel(element.children, name, nodes)) return true;
        nodes.pop();
      } else if (element.name === name) {
        nodes.push(element);
        return true;
      }
    }
    return false;
  };

  const nodes: RouteRecordRaw[] = [];
  travel(appMenu.value, newRoute.name as string, nodes);
  return nodes;
};

export { appMenu, findAppMenuItem };
