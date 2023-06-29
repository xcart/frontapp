import {StoryObj, Meta} from '@storybook/react'
import {ITabs, Tabs} from '~/components/global/Tabs'
import {SectionWithButton} from '~/components/homepage/SectionWithButton'
import {PRODUCTS, PRODUCTS2} from '../constants'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Homepage/TabsMain',
  component: Tabs,
}

export default meta

export const TabsMain: StoryObj<typeof Tabs> = {
  render: (args: ITabs) => <Tabs {...args} />,
}

TabsMain.args = {
  sectionTitle: 'Collections',
  tabs: [
    {
      name: 'Bestsellers',
      content: <SectionWithButton products={PRODUCTS} path="bestsellers" />,
      disabled: false,
    },
    {
      name: 'Recent Arrivals',
      content: <SectionWithButton products={PRODUCTS2} path="new-arrivals" />,
      disabled: false,
    },
  ],
}
