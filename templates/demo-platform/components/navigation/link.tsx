'use client'

import NextLink, {LinkProps} from 'next/link'
import {useModal} from '~/components/providers/ModalContext'

type Props = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode
  } & React.RefAttributes<HTMLAnchorElement>

export function Link(props: Props) {
  const modalContext = useModal()

  const clickHandler = (e: any) => {
    if (typeof props?.onClick !== 'undefined') {
      // eslint-disable-next-line react/destructuring-assignment
      props.onClick(e)
    }
    if (modalContext.open) {
      modalContext.setOpen(false)
    }
  }

  return <NextLink {...props} onClick={clickHandler} />
}
