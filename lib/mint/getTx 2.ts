import {
  bigintDeserializer,
  Address,
  bigintSerializer,
  BoxActionRequest,
} from "@decent.xyz/box-common";

// Prepare Transaction //
export const generateResponse = async ({
  txConfig,
  account,
}: {
  txConfig: BoxActionRequest;
  account: Address;
}) => {
  const BASE_URL = "https://box-v2.api.decent.xyz/api/getBoxAction";

  let req;
  if (account) {
    req = txConfig;
  }

  const url = new URL(BASE_URL);
  url.searchParams.set("arguments", JSON.stringify(req, bigintSerializer));

  const requestOptions = {
    method: "GET",
    headers: { "x-api-key": process.env.NEXT_PUBLIC_DECENT_API_KEY as string },
  };

  try {
    const response = await fetch(url.toString(), requestOptions);
    const textResponse = await response.text();
    const actionResponse = JSON.parse(textResponse, bigintDeserializer);

    return {
      config: req,
      response: actionResponse,
    };
  } catch (e) {
    console.error("Error getting response", e);
    return {
      config: null,
      response: null,
    };
  }
};
