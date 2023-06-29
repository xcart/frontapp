import {FooterMenuDesktop} from '~/components/global/Footer/FooterMenuDesktop'
import {FooterMenuMobile} from '~/components/global/Footer/FooterMenuMobile'
import {FooterNewsletter} from '~/components/global/Footer/FooterNewsletter'
import {FooterBottom} from './FooterBottom'

const menuItems = [
  {
    name: 'Contact Us',
    content:
      '<div class="leading-base"><strong><a href="tel:1-800-657-7957" class="no-underline">1-800-657-7957</a></strong><div class="text-xs leading-sm">Mon-Fr, 09.00 - 17.00</div></div>',
  },
  {
    name: 'Service',
    content:
      '<ul><li class="mb-unit-3"><a href="/">Link 1</a></li><li class="mb-unit-3"><a href="/">Link 2</a></li><li><a href="/">Link 3</a></li></ul>',
  },
]

export function Footer() {
  return (
    <footer className="bg-gray-300">
      <div className="flex flex-wrap p-unit-4 lg:px-unit-16 lg:pt-unit-9 page">
        <FooterNewsletter />
        <FooterMenuMobile items={menuItems} />
        <FooterMenuDesktop items={menuItems} />
        <FooterBottom />
      </div>
    </footer>
  )
}
