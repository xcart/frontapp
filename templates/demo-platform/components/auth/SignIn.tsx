'use client'

import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useAtom} from 'jotai'
import {useRouter} from 'next/navigation'
import {signIn} from 'next-auth/react'
import * as yup from 'yup'
import {mergeAnonymousCart} from '~/components/cart/functions/mergeAnonymousCart'
import {cartAtom} from '~/components/cart/store'
import {ButtonWithSpinner} from '~/components/elements/Button'
import {useDrawer} from '~/components/elements/Drawer'
import {Input} from '~/components/elements/Input'
import {PasswordInput} from '~/components/elements/PasswordInput'
import {
  getWishlist,
  mergeWishlist,
} from '~/components/wishlist/functions/wishlistActions'
import {wishlistItems} from '~/components/wishlist/store'
import {RememberMe} from './RememberMe'
import {clearClient} from '../../lib/getClient'
import {clearCartId, getCart} from '../cart/functions/cartActions'

const schema = yup
  .object({
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Required field'),
    password: yup.string().required('Required field'),
  })
  .required()

export function SignIn() {
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

  async function signin(data: any) {
    setSubmitted(true)
    const response = await signIn('credentials', {
      ...data,
      redirect: false,
    })

    if (!response?.ok) {
      setAlert('Incorrect email or password')
      setSubmitted(false)
    } else {
      router.refresh()
      clearCartId()
      clearClient()
      setTimeout(() => setSubmitted(false), 2000)
      setAlert(null)

      if (cart?.id) {
        await mergeAnonymousCart(cart.id, setCart)
      } else {
        const newCart = await getCart()
        if (newCart) {
          setCart(newCart)
        }
      }

      if (wishlist?.length) {
        const updatedWishlist = await mergeWishlist(wishlist)

        if (updatedWishlist && updatedWishlist.productIds?.length) {
          setWishlist(updatedWishlist.productIds)
        }
      } else {
        const customerWishlist = await getWishlist()

        if (customerWishlist && customerWishlist.productIds?.length) {
          await setWishlist(customerWishlist.productIds)
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(signin)} className="flex flex-col gap-unit-6">
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
        placeholder="password"
        error={!!errors.password}
        errorText={
          errors.password ? (errors.password.message as string) : undefined
        }
        autoComplete="current-password"
        {...register('password', {required: true})}
      />

      <RememberMe />

      <ButtonWithSpinner
        type="submit"
        buttonTitle="Sign in"
        className="w-full whitespace-nowrap"
        disabled={!isValid || submitted}
        showSpinner={submitted}
      />
    </form>
  )
}
