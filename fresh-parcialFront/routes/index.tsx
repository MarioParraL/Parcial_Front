import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Data = {
  is_valid: boolean;
  country: string;
  phone: string;
};

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = new URL(req.url);
    const phone = url.searchParams.get("phone") || "";

    try {
      const API_KEY = Deno.env.get("API_KEY");
      if (!API_KEY) {
        return new Response("API_KEY Error");
      }
      const url = `https://api.api-ninjas.com/v1/validatephone?number=${phone}`;
      const data = await fetch(url, {
        headers: {
          "X-API-KEY": API_KEY,
        },
      });

      const response = await data.json();
      const is_valid = response.is_valid;
      const country = response.country;

      return ctx.render({ is_valid, country, phone });
    } catch (_e) {
      return new Response("API NINJAS Error");
    }
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <>
      <div>
        <form method="GET" action={"/"}>
          <input
            type="text"
            name="phone"
            placeholder="phone with prefix"
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div>
        <h3>{props.data.phone}</h3>
        <a href={`/country/${props.data.country}`}>
          <h3>{props.data.country}</h3>
        </a>
      </div>
    </>
  );
};

export default Page;
