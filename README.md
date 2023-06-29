```
git clone git@github.com:xcart/frontapp.git
```
```
cd ./frontapp
```

**1. Setting up .env**

Create and populate `templates/demo-platform/.env.local` (or `templates/auto/.env.local`)

Add the address of the deployed X-Cart v5.5.1.x store (for example, `http://example.com`):
```
NEXT_PUBLIC_XCART_API_URL=http://example.com
```
The public API key can be found in the section **Storefront API** at `http://example.com/admin/?target=settings&page=API`:
```
NEXT_PUBLIC_API_KEY=test_key_s
``` 
Add a secret key (any):
```
NEXTAUTH_SECRET=secret
```
Add the address at which the new storefront will be available:
```
NEXTAUTH_URL=http://localhost:3000
```
In dev mode, the variable `APP_ENV` must be set to "dev":
```
APP_ENV=dev
```
The variables `NEXT_PUBLIC_CLOUD_SEARCH_API_URL` and `NEXT_PUBLIC_CLOUD_SEARCH_API_KEY` are used for X-Cart CloudSearch setup https://www.x-cart.com/ecommerce-search-engine.html

**2. Installing the necessary add-ons**
```
yarn or yarn install
```

**3. Building**

The monorepo contains the following workspaces:
- packages/storefront - HTTP client
- packages/components - useful hooks for work with X-Cart data
- templates/demo-platform - demo storefront for X-Cart Platform edition
- templates/auto - demo storefront for X-Cart Auto edition

To use the client and the hooks, run the following in the project root directory.
All storefronts:
```
yarn build
```
Demo storefront for X-Cart Platform edition:
```
yarn build:platform
```
Demo storefront for X-Cart Auto edition:
```
yarn build:auto
```


**4. Running**

From `templates/demo-platform` or `templates/auto`, run the following:
```
yarn start
```
After that, the storefront should be accessible at localhost:3000

**5. Running in dev mode**

Run `templates/demo-platform`
```
yarn platform
```
Run `templates/auto`
```
yarn auto
```

**6. Storybook**

Run storybook for visual testing of components in the demo-platform template
```
cd ./storefront/templates/demo-platform
yarn storybook
```

The storybook interface should be accessible at localhost:6006
