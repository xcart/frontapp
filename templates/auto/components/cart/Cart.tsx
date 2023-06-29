import {useAtomValue} from 'jotai'
import {AddToCartButton} from '~/components/cart/AddToCartButton'
import {CartItemImage} from '~/components/cart/CartItemImage'
import {DeleteProductFromCart} from '~/components/cart/DeleteProductFromCart'
import {ProductToAdd} from '~/components/cart/interface'
import {cartAtom} from '~/components/cart/store'
import {Button} from '~/components/elements/Button'
import {useDrawer} from '~/components/elements/Drawer'
import {Link} from '~/components/navigation/link'
import {DiscountedPrice} from '~/components/product/DiscountedPrice'
import {Label} from '~/components/product/Label'
import {WishlistButton} from '~/components/wishlist/WishlistButton'

export function Cart() {
  const cart = useAtomValue(cartAtom)
  const drawer = useDrawer()

  return cart?.items?.length > 0 ? (
    <div>
      {cart?.items?.map((item: any) => {
        const cartProduct: ProductToAdd = {
          id: item.productId,
          amount: 1,
          attributes: item.attributes,
        }

        const hasEnoughQty =
          item.variant && Object.keys(item.variant).length > 0
            ? item.amount + 1 <= item.variant.amount
            : item.amount + 1 <= item.inStock

        return (
          <div
            key={item.id}
            className="mb-unit-8 grid grid-cols-[65px_minmax(calc(100%-85px),_1fr)] gap-unit-4 last:mb-0 lg:grid-cols-[80px_minmax(320px,_1fr)] lg:gap-unit-8"
          >
            <div className="flex flex-col justify-between">
              <div className="h-unit-13 w-unit-13 lg:h-unit-16 lg:w-unit-16">
                <Link
                  href={`/${item.cleanUrl}`}
                  className="relative block h-full w-full"
                >
                  <CartItemImage item={item} />
                </Link>
              </div>
              <WishlistButton
                productId={item.productId}
                buttonClasses="static rounded z-0"
              />
            </div>

            <div>
              <Label
                productPrice={item.clear_price}
                productSalePrice={item.display_price}
              />
              <div className="mb-unit-2 text-sm font-medium lg:text-base">
                <Link href={`/${item.cleanUrl}`} className="no-underline">
                  {item.name}
                </Link>
              </div>
              {item.attributes.length > 0 && (
                <div className="mb-unit-2 flex gap-unit-4 text-sm">
                  {item.attributes.map((attribute: any) => {
                    return (
                      <div key={attribute.attributeValueId}>
                        {attribute.name}: {attribute.attributeValue}
                      </div>
                    )
                  })}
                </div>
              )}
              <div className="mb-unit-2 flex items-center">
                <DiscountedPrice
                  productPrice={item.clear_price}
                  productSalePrice={item.display_price}
                  baseStyles="lg:text-lg"
                />
              </div>
              <div className="flex max-w-[360px] gap-unit-4">
                <AddToCartButton
                  isCart
                  cartId={cart?.id}
                  amount={item.amount}
                  productToAdd={cartProduct}
                  buttonClasses="w-[calc(100%-60px)] lg:w-[calc(100%-80px)]"
                  hasEnoughQty={hasEnoughQty}
                />
                <DeleteProductFromCart cartId={cart?.id} cartItemId={item.id} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  ) : (
    <div>
      <p>Looks like you haven’t added anything yet, let’s get you started!</p>
      <Button
        className="mt-unit-4 w-full"
        buttonTitle="Continue Shopping"
        onClick={() => drawer.setOpen(false)}
      />
    </div>
  )
}
