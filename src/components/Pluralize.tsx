import { ReactNode } from 'react';
import { curriedPlural } from '../utils/string';

type PluralizeRenderProps = {
  $: (word: string, plural?: string) => string;
  count: number;
};

type PluralizeProps = {
  count?: number;
  fallback?: ReactNode;
  render: ({ $, count }: PluralizeRenderProps) => ReactNode;
};

function Pluralize({ count, render, fallback }: PluralizeProps) {
  if (!count) {
    return fallback || null;
  }

  return render({ $: curriedPlural(count), count });
}

export default Pluralize;
