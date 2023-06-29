'use client'

import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {client} from 'utils/unauthenticated-client'
import {Button} from '~/components/elements/Button'
import {useDrawer} from '~/components/elements/Drawer'
import {Input} from '~/components/elements/Input'

const schema = yup
  .object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Required field'),
  })
  .required()

export function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  const {setAlert} = useDrawer()

  async function submit(data: any) {
    const response = await client.other.resetPasswordAuthenticationCollection({
      username: data.email,
    })
    if (response instanceof Error) {
      // @ts-ignore
      setAlert(response?.error['hydra:description'])
    } else {
      setEmail(data.email)
      setSent(true)
      setAlert(null)
    }
  }

  return (
    <>
      {sent ? (
        <>
          <div className="text-sm md:text-base">
            An email message with further instructions has just been sent to{' '}
            <span className="font-medium">{email}</span>.
          </div>
          <div className="mb-unit-8 mt-unit-2 text-sm md:text-base">
            If you don't see it in your inbox, please check the spam folder,
            too.
          </div>
          <button
            onClick={() => setSent(false)}
            className="text-sm underline outline-none md:text-base"
            aria-label="Send it again"
          >
            Send it again
          </button>
        </>
      ) : (
        <>
          <div className="text-sm md:text-base">
            Please enter the email address associated with your user account.
          </div>
          <div className="mb-unit-8 mt-unit-2 text-sm md:text-base">
            An email message with further instructions will be sent to you
            shortly.
          </div>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-unit-6"
          >
            <Input
              type="email"
              label="Email *"
              labelFirst
              wrapperClasses="w-full mb-0 md:mr-unit-4"
              placeholder="example@mail.com"
              error={!!errors.email}
              errorText={
                errors.email ? (errors.email.message as string) : undefined
              }
              {...register('email', {required: true})}
            />

            <Button
              type="submit"
              buttonTitle="Submit"
              className="w-full whitespace-nowrap"
              disabled={!isValid}
            />
          </form>
        </>
      )}
    </>
  )
}
