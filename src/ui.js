import Vue from 'vue';
import FastClick from 'fastclick';

// vant
import { Toast } from 'vant';

// 组件
// import Icon from '@/components/Icon'

// 设置rem
import './assets/js/flexible';

// css
import './assets/css/normalize.css';
import './assets/css/common.css';

// 使用： this.$toast('...')
Vue.use(Toast);

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body);
    },
    false,
  );
}
