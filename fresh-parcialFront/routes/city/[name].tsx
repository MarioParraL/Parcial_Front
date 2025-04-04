import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Temp from "../../components/Temp.tsx";

type Data = {
  temp: number;
  name: string;
  country: string;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const name = ctx.params.name;

    try {
      const API_KEY = Deno.env.get("API_KEY");
      if (!API_KEY) {
        return new Response("API_KEY Error");
      }
      const url = `https://api.api-ninjas.com/v1/city?name=${name}`;
      const data = await fetch(url, {
        headers: {
          "X-API-KEY": API_KEY,
        },
      });

      const response = await data.json();
      const lat = response[0].latitude;
      const lon = response[0].longitude;
      const country = response[0].country;

      const url2 =
        `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`;
      const data2 = await fetch(url2, {
        headers: {
          "X-API-KEY": API_KEY,
        },
      });
      const response2 = await data2.json();
      const temp = response2.temp;

      return ctx.render({ temp, name, country });
    } catch (_e) {
      return new Response("API NINJAS Error");
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return <Temp {...props.data} />;
};

export default Page;
