import {StoryObj, Meta} from '@storybook/react'
import SubcategoriesMenu from '~/components/global/Subcategories'
import {SUBCATEGORIES} from './constants'

const meta: Meta<typeof SubcategoriesMenu> = {
  title: 'Components/Global/Subcategories',
  component: SubcategoriesMenu,
}

export default meta

export const Subcategories: StoryObj<typeof SubcategoriesMenu> = {
  render: args => <SubcategoriesMenu {...args} />,
}

Subcategories.args = {
  items: SUBCATEGORIES,
  categoryCleanUrl: 'parent-category-url',
}
