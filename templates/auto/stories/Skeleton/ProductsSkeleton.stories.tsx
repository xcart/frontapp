import {StoryObj, Meta} from '@storybook/react'
import {ProductSkeleton as Skeleton} from '~/components/global/skeleton/ProductSkeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Global/Skeleton',
  component: Skeleton,
}

export default meta

export const ProductSkeleton: StoryObj<typeof Skeleton> = {
  render: () => (
    <div className="w-[300px]">
      <Skeleton />
    </div>
  ),
}
