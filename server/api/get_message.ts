import prisma from "../prisma";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const request_header = getRequestHeaders(event);
  if (
    !("x-secret-ref" in request_header) ||
    request_header["x-secret-ref"] !== config.secret
  ) {
    throw createError({
      status: 403,
      message: "You don't have permission to see this!",
    });
  }

  if (query.m_id && query.m_id !== "") {
    const message = await prisma.messages
      .findFirstOrThrow({
        select: {
          message: true,
        },
        where: {
          id: {
            equals: parseInt(query.m_id),
          },
        },
      })
      .catch((err) => {
        throw createError({
          status: 404,
          message: "Message not found",
        });
      });
    return {
      status: "success",
      message: message,
    };
  } else {
    const message = await prisma.messages.findMany();
    message.map((message) => {
      message.request_header = JSON.parse(message.request_header);
      message.geoip = JSON.parse(message.geoip);
    });
    return {
      status: "success",
      message: message,
    };
  }
});
