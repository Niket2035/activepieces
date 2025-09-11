
    import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { CloudConvertAuth } from "./lib/common/auth";
import { convertFile } from "./lib/actions/convert-a-file";

    export const cloudconvert = createPiece({
      displayName: "Cloudconvert",
      auth: CloudConvertAuth,
      minimumSupportedRelease: '0.36.1',
      logoUrl: "https://cdn.activepieces.com/pieces/cloudconvert.png",
      authors: [],
      actions: [convertFile],
      triggers: [],
    });
    