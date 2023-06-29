import {StoryObj, Meta} from '@storybook/react'
import {ProductAccordion as Accordion} from '~/components/product/ProductAccordion'
import {TABS} from '../constants'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Product/ProductAccordion',
  component: Accordion,
}

export default meta

export const ProductAccordion: StoryObj<typeof Accordion> = {
  render: args => <Accordion {...args} />,
}

ProductAccordion.args = {
  items: TABS,
}
