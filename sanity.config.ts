import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import {
  PublishStatusAction,
  UnpublishStatusAction,
} from "./src/sanity/lib/statusActions";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "logusstudio",
  title: "logUs Studio",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      if (context.schemaType === "siteSettings") {
        return prev.filter((action) => action.action !== "delete");
      }

      if (
        context.schemaType === "product" ||
        context.schemaType === "socialLink"
      ) {
        return [
          PublishStatusAction,
          UnpublishStatusAction,
          ...prev.filter(
            (action) =>
              action.action !== "publish" && action.action !== "unpublish",
          ),
        ];
      }

      return prev;
    },
  },
});
