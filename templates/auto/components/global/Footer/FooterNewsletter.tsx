'use client'

import {useEffect, useState} from 'react'
import {Button} from '~/components/elements/Button'
import {Input} from '~/components/elements/Input'
import {validateEmail} from '~/helpers'

export function FooterNewsletter() {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const errorText = 'Please enter a valid email address'

  const clickHandler = () => {
    if (value) {
      if (validateEmail(value)) {
        console.info('Email: ', value)
      } else {
        setError(true)
      }
    }
  }

  useEffect(() => {
    if ((value && validateEmail(value)) || !value) {
      setError(false)
    }
  }, [value])

  return (
    <div className="mb-unit-8 w-full lg:mb-0 lg:w-1/2">
      <h3 className="mb-unit-5">Join Newsletter</h3>
      <div className="flex flex-col items-end md:flex-row">
        <Input
          type="email"
          label="Email"
          labelFirst
          inputClasses="bg-contrast border-gray-500"
          wrapperClasses="w-full mb-unit-4 md:mr-unit-4 md:mb-0 md:max-w-[400px]"
          placeholder="example@mail.com"
          onChange={event => setValue(event.target.value)}
          errorText={error ? errorText : undefined}
          error={error}
        />
        <Button
          variant="secondary"
          buttonTitle="Go"
          className="w-full md:w-auto"
          onClick={() => clickHandler()}
        />
      </div>
    </div>
  )
}
