import AWS from "aws-sdk";
import createHttpError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

export const getAuctionById = async (id) => {
  let auction;

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id },
      })
      .promise();

    auction = result.Item;
  } catch (error) {
    console.error(error);

    throw new createHttpError.InternalServerError(error);
  }

  if (!auction) {
    throw new createHttpError.NotFound(`Auction with ID ${id} not found!`);
  }

  return auction;
};
