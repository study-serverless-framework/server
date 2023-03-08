import createHttpError from "http-errors";
import { closeAuction } from "../utils/closeAuction";
import { getEndedAuctions } from "../utils/getEndedAuctions";

async function processAuctions(event, context) {
  try {
    const auctionsToClose = await getEndedAuctions();
    const closePromises = auctionsToClose.map((auction) =>
      closeAuction(auction)
    );

    await Promise.all(closePromises);

    return { closed: closePromises.length };
  } catch (error) {
    console.log(error);

    throw new createHttpError.InternalServerError(error);
  }
}

export const handler = processAuctions;
