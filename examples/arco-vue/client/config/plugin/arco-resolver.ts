/**
 * If you use the template method for development, you can use the unplugin-vue-components
 * plugin to enable on-demand loading support.
 *
 * https://github.com/antfu/unplugin-vue-components
 */
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default function configArcoResolverPlugin() {
  const arcoResolverPlugin = Components({
    dirs: [],
    deep: false,
    resolvers: [ArcoResolver()],
  });
  return arcoResolverPlugin;
}
