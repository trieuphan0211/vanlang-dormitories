export async function POST(request: Request) {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  const { partnerCode, requestId, orderInfo, redirectUrl, ipnUrl, amount } =
    await request.json();
  console.log({
    partnerCode,
    requestId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    amount,
  });
  // Demo data
  // var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  // var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  // var orderInfo = "pay with MoMo";
  // var redirectUrl = "http://localhost:3000/home/payment";
  // var ipnUrl = "http://localhost:3000/home/payment";
  // var amount = "50000";
  var requestType = "captureWallet";
  var extraData = ""; //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------");
  console.log(rawSignature);
  //signature
  const crypto = require("crypto");
  var signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");
  console.log("--------------------SIGNATURE----------------");
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    items: [
      {
        image: "https://momo.vn/uploads/product1.jpg",
        name: "Product 1",
        quantity: 1,
        amount: 20000,
      },
      {
        image: "https://momo.vn/uploads/product2.jpg",
        name: "Product 2",
        quantity: 2,
        amount: 30000,
      },
    ],
    signature: signature,
    lang: "en",
  });
  //Create the HTTPS objects
  const axios = require("axios");
  // options axios
  const optionsAxios = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };
  try {
    const rerult = await axios(optionsAxios);
    return Response.json({ data: rerult.data });
  } catch (error) {
    return Response.json({ error: error });
  }
}
