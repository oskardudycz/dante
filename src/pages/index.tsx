import * as React from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import Products from '../components/products';

type StripeCheckoutOptions = {
  publishableKey: string;
  productPriceId: string;
};

type DataProps = {
  site: {
    siteMetadata: {
      title: string;
      stripe: StripeCheckoutOptions;
    };
  };
};

const IndexPage = ({
  data: {
    site: {
      siteMetadata: { stripe },
    },
  },
}: PageProps<DataProps>) => {
  console.log(stripe);

  return (
    <main>
      <h1 className="text-3xl font-bold underline text-slate-700 dark:text-slate-500">
        Dante's Shop
      </h1>

      <Products />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

export const query = graphql`
  query SiteMetadata {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
