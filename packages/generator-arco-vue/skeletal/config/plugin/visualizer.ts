/**
 * Generation packaging analysis.
 */
import visualizer from 'rollup-plugin-visualizer';

export default function configVisualizerPlugin() {
  if (process.env.REPORT === 'true') {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    });
  }
  return [];
}
