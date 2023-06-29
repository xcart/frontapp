import {StoryObj, Meta} from '@storybook/react'
import {ProductDetailsSkeleton as Skeleton} from '~/components/global/skeleton/ProductDetailsSkeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Global/Skeleton',
  component: Skeleton,
}

export default meta

export const ProductDetailsPageSkeleton: StoryObj<typeof Skeleton> = {
  render: () => <Skeleton />,
}
