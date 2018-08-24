import Vue from 'vue';
import { VueSlideoutPanel } from 'vue2-slideout-panel';

export default {
  name: 'panel-1',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    closePanel() {
      this.$emit('closePanel', {
        name: this.form.name
      });
    }
  }
};
