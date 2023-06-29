import Image from 'next/image'
import Link from 'next/link'
import {IconThinArrow} from '~/components/elements/Icons'
import banner from '../../public/main_banner.jpeg'

export function MainBanner() {
  return (
    <div className="page mb-unit-4 h-[320px] lg:h-[580px]">
      <Link
        href="/bestsellers"
        className="group relative ml-auto mr-auto flex h-full max-w-page-inner justify-end overflow-hidden"
        aria-label="Bestsellers"
      >
        <Image
          src={banner}
          alt="Bestsellers"
          width={1760}
          height={580}
          className="-mr-[50px] h-full max-w-[none] transition-transform duration-[450ms] group-hover:translate-x-[-2%] group-hover:scale-[104%] md:mr-0"
          priority
          sizes="(min-width: 1760px) 1760px,
            (min-width: 1280px) 1280px,
            (min-width: 1024px) 1024px,
            (min-width: 768px) 970px,
            200vw"
        />
        <span className="absolute bottom-unit-6 left-unit-4 max-w-[292px] text-invariant-dark md:bottom-auto md:top-1/2 md:left-[10.5%] md:-translate-y-1/2 lg:max-w-[529px]">
          <span className="text-2xl font-medium leading-h1 lg:text-[3.5rem] lg:leading-[4.5rem]">
            Elegant and Stylish Clothes
          </span>
          <span className="flex items-center font-medium no-underline lg:mt-unit-3 lg:text-lg">
            Explore now &nbsp;
            <IconThinArrow fill="var(--color-invariant-dark)" />
          </span>
        </span>
      </Link>
    </div>
  )
}
