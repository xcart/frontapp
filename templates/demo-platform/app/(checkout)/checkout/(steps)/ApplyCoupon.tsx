import {useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useRouter} from 'next/navigation'
import * as yup from 'yup'
import {useNotification} from '~/components/checkout/Notification'
import {ButtonWithSpinner} from '~/components/elements/Button'
import {IconClose} from '~/components/elements/Icons'
import {Input} from '~/components/elements/Input'
import {applyCoupon} from '../actions'

const schema = yup
  .object({
    code: yup.string().required('Required field'),
  })
  .required()

function Form() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLFormElement>(null)
  const {
    register,
    reset,
    handleSubmit,
    formState: {errors, isValid, isSubmitting},
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  })
  const {setNotification} = useNotification()
  const router = useRouter()

  async function submit(data: any) {
    const result = await applyCoupon(data.code)
    setNotification({
      opened: true,
      content: result.message,
      type: result.error ? 'error' : 'success',
    })
    if (!result.error) {
      reset()
      router.refresh()
    }
  }

  useEffect(() => {
    ref.current?.querySelector('input')?.focus()
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [])

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-unit-6"
      ref={ref}
    >
      <div className="relative">
        <Input
          label="Discount Code"
          placeholder="Enter here"
          autoComplete="off"
          error={!!errors.code}
          errorText={errors.code ? (errors.code.message as string) : undefined}
          {...register('code', {required: true})}
        />
        {isValid ? (
          <button
            type="button"
            className="absolute bottom-0 right-0 flex h-unit-8 w-unit-8 items-center justify-center lg:bottom-unit-2"
            onClick={() => reset()}
            aria-label="Reset"
          >
            <IconClose className="w-unit-4 fill-gray-700" />
          </button>
        ) : null}
      </div>
      <div ref={scrollRef}>
        <ButtonWithSpinner
          type="submit"
          className="w-full"
          variant="secondary"
          disabled={!isValid || isSubmitting}
          showSpinner={isSubmitting}
          buttonTitle="Apply"
        />
      </div>
    </form>
  )
}

export function ApplyCoupon() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <button
        className="mb-unit-2 flex w-full justify-center"
        onClick={() => setIsVisible(v => !v)}
      >
        <div className="border-b border-dashed border-primary text-sm lg:text-base">
          Do you have a discount code?
        </div>
      </button>
      {isVisible ? <Form /> : null}
    </>
  )
}
