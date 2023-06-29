import {StoryObj, Meta} from '@storybook/react'
import {Categories as Menu} from '~/components/global/Categories'
import {ROOT_CATEGORIES} from './constants'

const meta: Meta<typeof Menu> = {
  title: 'Components/Global/Categories',
  component: Menu,
}

export default meta

export const Categories: StoryObj<typeof Menu> = {
  render: args => <Menu {...args} />,
}

Categories.args = {
  rootClasses: 'flex items-center',
  itemClasses: 'px-unit-2 whitespace-nowrap',
  linkClasses: 'text-gray-700 hover:text-primary hover:no-underline',
  categories: ROOT_CATEGORIES,
}
