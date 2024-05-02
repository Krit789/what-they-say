import prisma from "../prisma";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const request_header = getRequestHeaders(event)
  if (!("x-secret-ref" in request_header) || request_header['x-secret-ref'] !== config.secret) {
    throw createError({
      status: 403,
      message: "You don't have permission to see this!",
    });
  }
  const message = await prisma.messages.findMany();
  message.map((message) => {
    message.request_header = JSON.parse(message.request_header);
    message.geoip = JSON.parse(message.geoip)
  });
  return {
    status: "success",
    message: message,
  };
});
