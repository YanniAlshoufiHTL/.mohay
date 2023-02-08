import { createStore } from 'vuex';

import DocumentationHome from '../views/documentation/documentation-components/DocumentationHome.vue';
import DocumentationComments from '../views/documentation/documentation-components/DocumentationComments.vue';
import DocumentationConstants from '../views/documentation/documentation-components/DocumentationConstants.vue';
import DocumentationLines from '../views/documentation/documentation-components/DocumentationLines.vue';
import DocumentationPoints from '../views/documentation/documentation-components/DocumentationPoints.vue';
import DocumentationShapes from '../views/documentation/documentation-components/DocumentationShapes.vue';
import DocumentationVariables from '../views/documentation/documentation-components/DocumentationVariables.vue';
import DocumentationVectors from '../views/documentation/documentation-components/DocumentationVectors.vue';

export default createStore({
  state() {
    return {
      documentationPages: [
        { name: 'Home', component: DocumentationHome },
        { name: 'Comments', component: DocumentationComments },
        { name: 'Constants', component: DocumentationConstants },
        { name: 'Lines', component: DocumentationLines },
        { name: 'Points', component: DocumentationPoints },
        { name: 'Shapes', component: DocumentationShapes },
        { name: 'Variables', component: DocumentationVariables },
        { name: 'Vectors', component: DocumentationVectors },
      ],
    };
  },
  mutations: {},
});
