import prisma from "../prisma";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const postBody = await readBody(event);
  const request_header = getRequestHeaders(event);
  const geoip = await import("geoip-lite");


  const hasSent =
    getCookie(event, `hasSent-${config.public.hasSentHash}`) || false;
  if (hasSent === "true") {
    return;
  }
  const data = {
    request_header: JSON.stringify(request_header),
    geoip: JSON.stringify(geoip.default.lookup(request_header['x-forwarded-for'])),
    ...postBody,
  };

  const message = await prisma.messages.create({ data: data }).then(() => {
    setCookie(event, `hasSent-${config.public.hasSentHash}`, "true");
  });
  setResponseStatus(event, 201, "Record Created");
  return {
    status: message,
  };
});
