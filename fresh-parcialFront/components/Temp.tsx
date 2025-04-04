import { FunctionalComponent } from "preact/src/index.d.ts";

type Props = {
  temp: number;
  name: string;
  country: string;
};

const Temp: FunctionalComponent<Props> = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <a href={`/country/${props.country}`}>
        <h2>{props.country}</h2>
      </a>
      <h3>{props.temp} ºC de temperatura</h3>
    </div>
  );
};

export default Temp;
