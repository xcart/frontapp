import {StoryObj, Meta} from '@storybook/react'
import {Tooltip as TooltipStyled} from '~/components/global/Tooltip'

const meta: Meta<typeof TooltipStyled> = {
  title: 'Components/Global/Tooltip',
  component: TooltipStyled,
}

export default meta

export const Tooltip: StoryObj<typeof TooltipStyled> = {
  render: args => <TooltipStyled {...args}>Hover to see Tooltip</TooltipStyled>,
}

Tooltip.args = {
  tooltipText: 'Tooltip test text',
  placement: 'bottom',
}
