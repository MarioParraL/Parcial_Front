import { FunctionalComponent } from "preact/src/index.d.ts";

type Props = {
  capital: string;
  name: string;
};
const Capital: FunctionalComponent<Props> = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <a href={`/city/${props.capital}`}>
        <h2>{props.capital}</h2>
      </a>
    </div>
  );
};

export default Capital;
