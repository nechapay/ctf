import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'

export default () => {
  Vue.use(ElementUI, { locale })
}
