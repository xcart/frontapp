'use client'

import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup/dist/yup'
import {UserData} from '@xcart/storefront'
import {useRouter} from 'next/navigation'
import {signOut} from 'next-auth/react'
import * as yup from 'yup'
import {ButtonWithSpinner} from '~/components/elements/Button'
import {Input} from '~/components/elements/Input'
import {PasswordInput} from '~/components/elements/PasswordInput'
import {Alert} from '~/components/global/Alert'
import {getClient} from '../../lib/getClient'

const schema = yup
  .object({
    password: yup
      .string()
      .min(8, 'Must be at least 8 characters')
      .max(64, 'Must be at most 64 characters')
      .required('Required field'),
    confirm_password: yup
      .string()
      .min(8, 'Must be at least 8 characters')
      .max(64, 'Must be at most 64 characters')
      .required('Required field')
      .oneOf(
        [yup.ref('password'), null],
        "This password doesn't match. Try again.",
      ),
  })
  .required()

export function ProfileDetails({user}: {user: UserData}) {
  const [alert, setAlert] = useState<string | null>(null)
  const [alertType, setAlertType] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('info')
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  async function updateProfile(data: any) {
    const client = await getClient()
    setSubmitted(true)

    // @ts-ignore
    const response = await client.other.patchUserItem({
      login: user.login,
      password: data.password,
    })

    if (response instanceof Error) {
      setAlertType('error')
      setAlert('Something went wrong')
    } else {
      setAlertType('success')
      setAlert("You've successfully changed your password")
      router.refresh()

      setTimeout(() => setSubmitted(false), 2000)
    }
  }

  async function deleteUser() {
    const client = await getClient()

    // eslint-disable-next-line no-restricted-globals,no-alert
    const deleteAccount = confirm('Are you sure to delete your account?')

    if (deleteAccount) {
      const response = await client.other.deleteUserItem()

      if (response instanceof Error) {
        setAlertType('error')
        setAlert('Something went wrong')
      } else {
        setAlertType('success')
        setAlert('Profile has been deleted successfully')

        await signOut({redirect: false})
        router.refresh()
        router.push('/')
      }
    }
  }

  useEffect(() => {
    if (submitted) {
      reset({
        password: '',
        confirm_password: '',
      })
    }
  }, [reset, submitted])

  return (
    <>
      <Alert
        message={alert}
        type={alertType}
        onCloseHandler={() => setAlert(null)}
      />
      <div className="max-w-[500px]">
        <form
          onSubmit={handleSubmit(updateProfile)}
          className="flex flex-col gap-unit-6 md:gap-unit-4"
        >
          <Input
            type="email"
            label="Email *"
            labelFirst
            inputClasses="pointer-events-none bg-readonly/20 border-readonly/20"
            wrapperClasses="w-full mb-0 md:mr-unit-4"
            placeholder="example@mail.com"
            error={!!errors.email}
            errorText={
              errors.email ? (errors.email.message as string) : undefined
            }
            value={user.login}
            autoComplete="email"
            readOnly
          />

          <PasswordInput
            label="New Password *"
            wrapperClasses="w-full mb-0 md:mr-unit-4"
            placeholder="Enter new password"
            error={!!errors.password}
            errorText={
              errors.password ? (errors.password.message as string) : undefined
            }
            autoComplete="new-password"
            {...register('password', {required: true})}
          />

          <PasswordInput
            label="Confirm Password *"
            wrapperClasses="w-full mb-0 md:mr-unit-4"
            placeholder="Confirm new password"
            error={!!errors.confirm_password}
            errorText={
              errors.confirm_password
                ? (errors.confirm_password.message as string)
                : undefined
            }
            autoComplete="new-password"
            {...register('confirm_password', {required: true})}
          />

          <ButtonWithSpinner
            type="submit"
            buttonTitle="Update Profile"
            className="w-full whitespace-nowrap md:mt-unit-2"
            disabled={!isValid || submitted}
            showSpinner={submitted}
          />
        </form>

        <div className="mt-unit-8 text-center">
          <button onClick={deleteUser}>Delete profile</button>
        </div>
      </div>
    </>
  )
}
