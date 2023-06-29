import {StoryObj, Meta} from '@storybook/react'
import {ProductsGridSkeleton as Skeleton} from '~/components/global/skeleton/ProductsGridSkeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Global/Skeleton',
  component: Skeleton,
}

export default meta

export const ProductsSkeletonGrid: StoryObj<typeof Skeleton> = {
  render: args => <Skeleton {...args} />,
}

ProductsSkeletonGrid.args = {
  count: 9,
}
