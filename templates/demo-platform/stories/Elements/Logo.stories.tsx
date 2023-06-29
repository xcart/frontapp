import {Meta, StoryObj} from '@storybook/react'
import {Logo as LogoComponent} from '~/components/elements/Logo'

const meta: Meta<typeof LogoComponent> = {
  title: 'Components/Elements/StoreLogo',
  component: LogoComponent,
}

export default meta

export const Logo: StoryObj<typeof LogoComponent> = {
  render: () => <LogoComponent />,
}
