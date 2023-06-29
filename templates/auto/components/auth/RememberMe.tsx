'use client'

import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {Checkbox} from '~/components/elements/Checkbox'

export function RememberMe() {
  const [remember, setRemember] = useState(
    () => Cookies.get('remember_me') === 'true',
  )

  useEffect(() => {
    Cookies.set('remember_me', remember ? 'true' : 'false', {expires: 365})
  }, [remember])

  return (
    <Checkbox
      label={<span className="text-sm md:text-base">Remember me</span>}
      onChange={() => setRemember(v => !v)}
      checked={remember}
    />
  )
}
