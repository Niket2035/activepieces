
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { WebScrapingAuth } from "./lib/common/auth";
import { askAQuestionAboutTheWebPage } from "./lib/actions/ask-a-question-about-the-web-page";
import { extractStructuredData } from "./lib/actions/extract-structured-data";
import { getAccountInformation } from "./lib/actions/get-account-information";
import { getPageHtml } from "./lib/actions/get-page-html";
import { scrapeWebsiteText } from "./lib/actions/scrape-website-text";

export const webscrapingAi = createPiece({
  displayName: "Webscraping-ai",
  auth: WebScrapingAuth,
  minimumSupportedRelease: '0.36.1',
  logoUrl: "https://cdn.activepieces.com/pieces/webscraping-ai.png",
  authors: [],
  actions: [askAQuestionAboutTheWebPage, extractStructuredData, getAccountInformation, getPageHtml, scrapeWebsiteText],
  triggers: [],
});
