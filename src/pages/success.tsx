import * as React from 'react';
import { HeadFC } from 'gatsby';

const SuccessPage = () => {
  return (
    <main>
      <h1 className="text-3xl font-bold underline text-slate-700 dark:text-slate-500">
        Success!!
      </h1>

      <a href="/">Back to the Main</a>
    </main>
  );
};

export default SuccessPage;

export const Head: HeadFC = () => <title>Success Page</title>;
