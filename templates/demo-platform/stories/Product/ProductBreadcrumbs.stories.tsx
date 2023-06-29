import {StoryObj, Meta} from '@storybook/react'
import {ProductBreadcrumbs as BreadcrumbsComponent} from '~/components/product/ProductBreadcrumbs'
import {BREADCRUMBS} from '../constants'

const meta: Meta<typeof BreadcrumbsComponent> = {
  title: 'Components/Product/ProductBreadcrumbs',
  component: BreadcrumbsComponent,
}

export default meta

export const ProductBreadcrumbs: StoryObj<typeof BreadcrumbsComponent> = {
  render: args => <BreadcrumbsComponent {...args} />,
}

ProductBreadcrumbs.args = {
  items: BREADCRUMBS,
}
