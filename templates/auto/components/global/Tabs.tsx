'use client'

import * as Tab from '@radix-ui/react-tabs'
import {tailwindMerge} from '~/helpers'

export interface ITabs {
  tabs: {
    name?: string
    content?: string | JSX.Element
    disabled?: Tab.TabsTriggerProps['disabled']
  }[]
  tabClasses?: string
  tabPanelsClasses?: string
  tabContentClasses?: string
  orientation?: Tab.TabsProps['orientation']
  wrapperClasses?: string
  hasDefault?: boolean
  sectionTitle?: string
  tabsWrapperClasses?: string
}

/**
 * Follow https://www.radix-ui.com/docs/primitives/components/tabs
 */
export function Tabs({
  tabs,
  tabClasses,
  tabPanelsClasses,
  tabContentClasses,
  orientation,
  wrapperClasses,
  hasDefault = true,
  sectionTitle,
  tabsWrapperClasses,
}: ITabs) {
  const baseTabClasses =
    'transition font-medium text-gray-700 py-unit px-unit-2 border-b-2 border-b-transparent mx-unit-2'
  const baseTabLgClasses = 'lg:text-lg lg:mx-unit-4'
  const baseTabActiveClasses =
    'data-[state=active]:border-primary data-[state=active]:text-primary'

  const defaultTab =
    hasDefault && tabs[0].name ? tabs[0].name.replaceAll(' ', '') + 0 : ''

  const tabStyles = tailwindMerge(
    baseTabClasses,
    baseTabLgClasses,
    baseTabActiveClasses,
    tabClasses,
  )

  return (
    <div className={tabsWrapperClasses}>
      {typeof sectionTitle !== undefined && (
        <h2 className="mb-unit-3 text-center lg:mb-unit-4">{sectionTitle}</h2>
      )}
      <Tab.Root
        orientation={orientation}
        className={wrapperClasses}
        defaultValue={defaultTab}
      >
        <Tab.List
          className={sectionTitle ? 'mb-unit-8 text-center' : 'mb-unit-6'}
        >
          {tabs.map((tab, index) => {
            return (
              tab.content !== undefined &&
              tab.content !== '' && (
                <Tab.Trigger
                  className={tabStyles}
                  key={tab.name}
                  disabled={tab.disabled}
                  value={
                    tab.name
                      ? tab.name.replaceAll(' ', '') + index
                      : index.toString()
                  }
                >
                  {tab.name}
                </Tab.Trigger>
              )
            )
          })}
        </Tab.List>
        {tabs.map((tab, index) => {
          const tabKey = tab.name
            ? tab.name.replaceAll(' ', '') + index
            : index.toString()
          return (
            tab.content !== undefined &&
            tab.content !== '' && (
              <Tab.Content
                className={tabPanelsClasses}
                value={tabKey}
                key={tabKey}
              >
                <div className={tabContentClasses}>
                  {typeof tab.content === 'string' ? (
                    <div dangerouslySetInnerHTML={{__html: tab.content}} />
                  ) : (
                    tab.content
                  )}
                </div>
              </Tab.Content>
            )
          )
        })}
      </Tab.Root>
    </div>
  )
}
