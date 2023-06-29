import {StoryObj, Meta} from '@storybook/react'
import {ProductsPageSkeleton as Skeleton} from '~/components/global/skeleton/ProductsPageSkeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Global/Skeleton',
  component: Skeleton,
}

export default meta

export const ProductsPageSkeleton: StoryObj<typeof Skeleton> = {
  render: args => <Skeleton {...args} />,
}

ProductsPageSkeleton.args = {
  hasSubcategories: true,
}
