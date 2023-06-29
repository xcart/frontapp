import {StoryObj, Meta} from '@storybook/react'
import {Search as SearchComponent} from '~/components/global/Header/Search'
import {ROOT_CATEGORIES} from '../constants'

const meta: Meta<typeof SearchComponent> = {
  title: 'Components/Global/Header/Search',
  component: SearchComponent,
}

export default meta

export const Search: StoryObj<typeof SearchComponent> = {
  render: args => (
    <div className="lg:mt-unit-8">
      <SearchComponent {...args} />
    </div>
  ),
}

Search.args = {
  popular: ROOT_CATEGORIES,
}

Search.parameters = {
  nextjs: {
    navigation: {
      path: '/search',
      asPath: '/search',
      query: {
        q: 'test',
      },
    },
  },
}
