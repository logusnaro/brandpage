import { product } from "./product";
import { siteSettings } from "./siteSettings";
import { socialLink } from "./socialLink";
import { mascot } from "./mascot";
import { legalDocument } from "./legalDocument";
import { appRelease } from "./appRelease";
import { contactSubmission } from "./contactSubmission";
import { dailyScene, introScene, lifeStage, localizedString, localizedText } from "./storyObjects";

export const schemaTypes = [
  localizedString,
  localizedText,
  dailyScene,
  introScene,
  lifeStage,
  siteSettings,
  product,
  socialLink,
  mascot,
  legalDocument,
  appRelease,
  contactSubmission,
];
