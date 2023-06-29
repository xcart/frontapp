import Image from 'next/image'
import Link from 'next/link'
import banner1 from '../../public/stylish_banner1.jpeg'
import banner2 from '../../public/stylish_banner2.jpeg'

export function CenterBanners() {
  return (
    <div className="mt-unit-13 flex flex-col lg:mt-unit-16 lg:flex-row">
      <div className="mb-unit-4 h-[240px] flex-auto lg:mb-0 lg:w-1/2 lg:pr-unit-4">
        <Link
          href="/c/women/walking-shoes"
          className="group relative flex h-full w-full justify-end overflow-hidden bg-gray-300"
        >
          <Image
            src={banner1}
            alt="Walking shoes"
            width={860}
            height={240}
            className="-mr-[150px] h-full max-w-none transition-transform duration-[450ms] group-hover:translate-x-[-4%] group-hover:scale-[108%] sm:mr-0 sm:w-full sm:object-cover lg:w-auto"
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 860px, 200vw"
          />
          <h3 className="absolute bottom-unit-4 left-unit-4 text-invariant-dark xl:bottom-unit-6 xl:left-unit-6">
            Banner #1
          </h3>
        </Link>
      </div>
      <div className="flex h-[240px] flex-auto justify-end lg:w-1/2 lg:pl-unit-4">
        <Link
          href="/recent-arrivals"
          className="group relative flex h-full w-full justify-end overflow-hidden bg-gray-300"
        >
          <Image
            src={banner2}
            alt="Recent arrivals"
            width={860}
            height={240}
            className="-mr-[280px] h-full max-w-none transition-transform duration-[450ms] group-hover:translate-x-[-4%] group-hover:scale-[108%] sm:mr-0 sm:w-full sm:object-cover lg:w-auto"
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 860px, 200vw"
          />
          <h3 className="absolute bottom-unit-4 left-unit-4 text-invariant-dark xl:bottom-unit-6 xl:left-unit-6">
            Banner #2
          </h3>
        </Link>
      </div>
    </div>
  )
}
