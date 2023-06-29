import {IAccordionItems} from '~/components/global/Accordion/AccordionBase'

export function FooterMenuDesktop({items}: {items: IAccordionItems[]}) {
  return (
    <div className="hidden lg:flex w-1/2">
      {items.map((item, index) => {
        const itemKey = item.name
          ? item.name.replaceAll(' ', '') + index
          : index

        return (
          <div key={itemKey} className="pl-unit-4 flex-auto">
            <h3 className="mb-unit-5">{item.name}</h3>
            {/* @ts-ignore */}
            <div dangerouslySetInnerHTML={{__html: item.content}} />
          </div>
        )
      })}
    </div>
  )
}
