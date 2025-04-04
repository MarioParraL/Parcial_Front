import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Capital from "../../components/Capital.tsx";

type Data = {
  capital: string;
  name: string;
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const name = ctx.params.name;

    try {
      const API_KEY = Deno.env.get("API_KEY");
      if (!API_KEY) {
        return new Response("API_KEY Error");
      }
      const url = `https://api.api-ninjas.com/v1/country?name=${name}`;
      const data = await fetch(url, {
        headers: {
          "X-API-KEY": API_KEY,
        },
      });

      const response = await data.json();
      const capital = response[0].capital;

      return ctx.render({ capital, name });
    } catch (_e) {
      return new Response("API NINJAS Error");
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return <Capital {...props.data} />;
};

export default Page;
