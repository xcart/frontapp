import {ColorModeToggle} from '~/components/global/ColorModeToggle'

export function FooterBottom() {
  return (
    <div className="flex flex-col pt-unit-8 items-center w-full lg:flex-row">
      <ColorModeToggle />
      <div className="text-xs">
        Copyrights © 2022 All Rights Reserved by Company
      </div>
    </div>
  )
}
