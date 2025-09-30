'use client'

import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAtom, useSetAtom} from 'jotai/index'
import {useRouter} from 'next/navigation'
import {signIn} from 'next-auth/react'
import * as yup from 'yup'
import {client} from 'utils/unauthenticated-client'
import {mergeAnonymousCart} from '~/components/cart/functions/mergeAnonymousCart'
import {cartAtom} from '~/components/cart/store'
import {ButtonWithSpinner} from '~/components/elements/Button'
import {useDrawer} from '~/components/elements/Drawer'
import {Input} from '~/components/elements/Input'
import {PasswordInput} from '~/components/elements/PasswordInput'
import {mergeGarageAtom} from '~/components/mmy/store'
import {mergeWishlist} from '~/components/wishlist/functions/wishlistActions'
import {wishlistItems} from '~/components/wishlist/store'
import {RememberMe} from './RememberMe'
import {clearCartId} from '../cart/functions/cartActions'

const schema = yup
  .object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Required field'),
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

export function SignUp() {
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })
  const {setAlert} = useDrawer()
  const [cart, setCart] = useAtom(cartAtom)
  const [wishlist, setWishlist] = useAtom(wishlistItems)
  const mergeGarage = useSetAtom(mergeGarageAtom)

  async function signup(data: any) {
    setSubmitted(true)
    const response = await client.other.postUserCollection({
      login: data.email,
      password: data.password,
    })

    // successful registration, sign in then
    if (response?.login) {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      router.refresh()
      clearCartId()
      setTimeout(() => setSubmitted(false), 2000)
      setAlert(null)

      if (cart?.id) {
        await mergeAnonymousCart(cart.id, setCart)
      }

      if (wishlist?.length) {
        const updatedWishlist = await mergeWishlist(wishlist)

        if (updatedWishlist && updatedWishlist.productIds?.length) {
          setWishlist(updatedWishlist.productIds)
        }
      }

      mergeGarage()
    } else {
      setSubmitted(false)
      // @ts-ignore
      setAlert(response?.error['hydra:description'])
    }
  }

  return (
    <form onSubmit={handleSubmit(signup)} className="flex flex-col gap-unit-6">
      <Input
        type="email"
        label="Email *"
        labelFirst
        wrapperClasses="w-full mb-0 md:mr-unit-4"
        placeholder="example@mail.com"
        error={!!errors.email}
        errorText={errors.email ? (errors.email.message as string) : undefined}
        autoComplete="email"
        {...register('email', {required: true})}
      />

      <PasswordInput
        label="Password *"
        wrapperClasses="w-full mb-0 md:mr-unit-4"
        placeholder="Enter Password"
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
        placeholder="Confirm Password"
        error={!!errors.confirm_password}
        errorText={
          errors.confirm_password
            ? (errors.confirm_password.message as string)
            : undefined
        }
        autoComplete="new-password"
        {...register('confirm_password', {required: true})}
      />

      <RememberMe />

      <ButtonWithSpinner
        type="submit"
        buttonTitle="Sign up"
        className="w-full whitespace-nowrap"
        disabled={!isValid || submitted}
        showSpinner={submitted}
      />
    </form>
  )
}
