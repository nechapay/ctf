import Vue from 'vue'
import Checkbox from '~/components/inputs/Checkbox'
import Link from '~/components/inputs/Link'
import Button from '~/components/inputs/Button'

export default () => {
  Vue.component('v-checkbox', Checkbox)
  Vue.component('v-link', Link)
  Vue.component('v-button', Button)
}
