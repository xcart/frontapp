import {StoryObj, Meta} from '@storybook/react'
import {SectionWithButton as Section} from '~/components/homepage/SectionWithButton'
import {PRODUCTS} from '../constants'

const meta: Meta<typeof Section> = {
  title: 'Components/Homepage/SectionWithButton',
  component: Section,
}

export default meta

export const SectionWithButton: StoryObj<typeof Section> = {
  render: args => <Section {...args} />,
}

SectionWithButton.args = {
  products: PRODUCTS,
  title: 'Section with button',
  path: 'test',
}
