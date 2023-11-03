// import 'ant-design-vue/dist/antd.css';
import 'sanitize.css';
// import 'sanitize.css/forms.css';
// import 'sanitize.css/typography.css';
import '/@/styles/index.less';
import "vue3-colorpicker/style.css";
import Vue3ColorPicker from "vue3-colorpicker";



import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { store } from './store';
import { setupGlobDirectives } from './directives';
import './router/permission';
// import { setupComponents } from './plugin';

const app = createApp(App);

app.use(store);

app.use(router);

app.use(Vue3ColorPicker)
// Register global directive
setupGlobDirectives(app);

// Register UI components
// setupComponents(app);

// 全局属性
// app.config.globalProperties.AuthEnum = AuthEnum;

app.mount('#app');
