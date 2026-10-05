import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { productTemplates } from "./src/sanity/productTemplates";
import VisitStatistics from "./src/sanity/VisitStatistics";

export default defineConfig({
  name: "logusstudio",
  title: "logUs Studio",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  tools: (prev) => [...prev, {name:"visits",title:"방문 통계",component:VisitStatistics}],
  schema: {
    types: schemaTypes,
    templates: (prev) => [...prev, ...productTemplates],
  },
  document: {
    actions: (prev, context) => {
      if (context.schemaType === "siteSettings") {
        return prev.filter((action) => action.action !== "delete");
      }

      return prev;
    },
  },
});
