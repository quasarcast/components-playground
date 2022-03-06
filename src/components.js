import { kebabCase } from 'lodash-es'
import { markRaw } from 'vue'
import videoIds from './videoIds'

const modelFileContext = require.context('src/componentScratchpads', false, /\.vue$/)
const routes = modelFileContext.keys().map(modelPath => {
  const componentName = modelPath
    .replace('.vue', '')
    .replace('./', '')

  const path = kebabCase(componentName)

  return {
    path,
    componentName,
    component: () => import('pages/ComponentPage/ComponentPage.vue'),
    props: {
      component: markRaw(modelFileContext(modelPath).default),
      videoId: videoIds[componentName] ?? null
    }
  }
})

export default routes