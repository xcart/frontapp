import {StoryObj, Meta} from '@storybook/react'
import {FooterNewsletter} from '~/components/global/Footer/FooterNewsletter'

const meta: Meta<typeof FooterNewsletter> = {
  title: 'Components/Global/Footer',
  component: FooterNewsletter,
}

export default meta

export const NewsletterSubscription: StoryObj<typeof FooterNewsletter> = {
  render: () => <FooterNewsletter />,
}
