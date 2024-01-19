import { curriedPlural } from '../utils/string';

type PluralizeRenderProps = {
  $: (word: string, plural?: string) => string;
  count: number;
};

type PluralizeProps = {
  count: number;
  render: ({ $, count }: PluralizeRenderProps) => JSX.Element;
};

function Pluralize({ count, render }: PluralizeProps) {
  return render({ $: curriedPlural(count), count });
}

export default Pluralize;
