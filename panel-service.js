import Vue from 'vue';
import { vueSlideoutPanelService } from 'vue2-slideout-panel';

export default {
  name: 'slideout-panel',
  data() {
    return {}
  },
  methods: {
    showPanel() {
      vueSlideoutPanelService.show({
          component: 'slideout-panel',
          width: '500px', //customize the width
          cssClass: 'panel-1-custom-class', //add a custom CSS class
          props: {
            data: {
              firstName: 'John',
              lastName: 'Doe',
              age: 39
            }
          }
        })
        .then(results => {
          console.log('Results for panel 1:', results);
        });
    }
  }
};
