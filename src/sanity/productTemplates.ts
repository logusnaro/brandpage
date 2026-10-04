import { launchCatalogue } from "../lib/launchCatalogue";
import { appRoom } from "../lib/appDetailContent";

// Creation helpers only: no documents are created or published by loading Studio.
export const productTemplates = launchCatalogue.map((product) => {
  const room = appRoom(product);
  return {
    id: `launch-${product.name}`,
    title: `${product.displayName} 기본 소개로 시작`,
    schemaType: "product",
    value: {
      _type: "product",
      name: { _type: "slug", current: product.name },
      displayName: product.displayName,
      description: product.description,
      descriptionI18n: product.descriptionI18n,
      categoryI18n: product.categoryI18n,
      sortOrder: product.sortOrder,
      status: "draft",
      platforms: product.platforms,
      detail: {
        headlineI18n: room.headline,
        introI18n: room.intro,
        videoHeadingI18n: room.videoHeading,
        videoBodyI18n: room.videoBody,
        featureHeadingI18n: room.featureHeading,
      },
    },
  };
});
