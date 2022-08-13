# dante

Let's try some E-Commerce.

## Prerequisities

1. Install Node.js >=18.7.0 - https://Node.js.org/en/download/. Recommended through NVM.
2. Install IDE, recommended [Visual Studio Code](https://code.visualstudio.com/download).

## Setup

1. Setup `.env` file with Stripe credentials in format
```shell
STRIPE_PUBLISHABLE_KEY="put stripe publishable key here"
STRIPE_PRODUCT_PRICE_ID="put procut price id herere"
```
2. Install dependencies
```shell
npm install
```
2. Run local, dev build:
```shell
npm run develop
```
3. Run production build:
```
npm run build
```
## Troubleshooting

If changes seem to not be reflected in the build, try cleaning cache using
```shell
npm run clean
```

## VSCode recommended plugins

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [PostCSS](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)
- [GraphQL](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)
- [Markdown](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

## Useful links

### GatsbyJS

- [TypeScript and Gatsby](https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/)
- [Install Tailwind CSS with Gatsby](https://tailwindcss.com/docs/guides/gatsby)
- [Documentation](https://www.gatsbyjs.com/docs/)
- [Tutorials](https://www.gatsbyjs.com/tutorial/)
- [API Reference](https://www.gatsbyjs.com/docs/api-reference/)
- [Plugin Library](https://www.gatsbyjs.com/plugins)
- [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/)

### Stripe
- [Stripe Payment Element](https://stripe.com/docs/payments/payment-element)
- [Integrating Stripe with Polish payment gateways](https://www.youtube.com/watch?v=c4DvnfVSW3A)
- [Quickstart: Gatsby Stripe Checkout 2021](https://medium.com/@developer-junaid/quickstart-gatsby-stripe-checkout-a661dde1a98c)
- [Digital Wallet payments with React Stripe Elements and Netlify Functions](https://github.com/stripe-samples/react-elements-netlify-serverless)
- [How to create a Jamstack pet store app using Stripe, Gatsbyjs, and Netlify functions](https://blog.greenroots.info/how-to-create-a-jamstack-pet-store-app-using-stripe-gatsbyjs-and-netlify-functions)
- [Building a Serverless E-commerce Store with Stripe, Netlify, & 11ty](https://sia.codes/posts/serverless-ecommerce-store/)