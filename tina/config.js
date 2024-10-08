import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "",
  cliendId: "",
  token: "",
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Page",
        path: "content/pages",
        format: "md",
        fields: [
          {
            name: "title",
            type: "string",
          },
        ],
      },
    ],
  },
});
