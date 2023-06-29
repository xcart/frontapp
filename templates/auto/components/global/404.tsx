'use client'

import {useRouter} from 'next/navigation'
import {Button} from '~/components/elements/Button'
import {IconNotFound} from '~/components/elements/Icons'
import PageContent from '~/components/global/PageContent'

export function NotFoundPage() {
  const router = useRouter()

  return (
    <PageContent additionalClasses="h-full">
      <div className="flex h-full items-center justify-center">
        <div className="flex max-w-[885px] flex-col items-start lg:flex-row lg:items-center">
          <div className="w-[260px] max-w-full">
            <IconNotFound />
          </div>
          <div className="mt-unit-4 h-1 lg:mt-0 lg:ml-unit-12 lg:mr-unit-12 lg:h-[180px] lg:w-1 lg:bg-gray-500" />
          <div>
            <h1 className="mb-unit-3">Oops, this Page not Found</h1>
            <p>
              This page is no longer explorable! If you are lost, use the search
              bar to find what you are looking for.
            </p>
            <Button
              variant="secondary"
              buttonTitle="Back to Home"
              className="mt-unit-5"
              onClick={() => router.push('/')}
            />
          </div>
        </div>
      </div>
    </PageContent>
  )
}
