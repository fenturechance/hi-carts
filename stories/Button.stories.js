import MyButton from './Button.vue'
import '../assets/css/build.css'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: MyButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: `<my-button @onClick="onClick" v-bind="$props" class="${args.class}" />`
})

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
  class: 'bg-cyan-600 text-white py-2 hover:bg-cyan-500'
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button',
  class: 'border border-cyan-600 text-cyan-600 hover:bg-cyan-50'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button',
  class: 'w-full bg-cyan-600 text-white rounded-lg py-2 cursor-pointer'
}

export const Warning = Template.bind({})
Warning.args = {
  size: 'warning',
  label: 'Button',
  class: 'py-2 px-5 rounded-md bg-red-50 text-red-500 whitespace-nowrap'
}
