import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import client from "../tina/__generated__/client";
import { json } from "@remix-run/node";

export async function loader() {
  const result = await client.queries.page({ relativePath: "home.md" });
  return json(result);
}

export default function App() {
  const data = useLoaderData();

  const page = data?.data?.page;

  if (!page) {
    return <div>Error: No page data found!</div>;
  }

  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!</h1>
        <h3>Welcome to my website</h3>
        <p>TinaCMS page title: {page?.title}</p>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
