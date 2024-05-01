import prisma from "../prisma";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const hasSent =
    getCookie(event, `hasSent-${config.public.hasSentHash}`) || false;
  if (hasSent === "true") {
    return;
  }
  const postBody = await readBody(event);
  const data = { request_header: JSON.stringify(getRequestHeaders(event)), ...postBody }
  const message = await prisma.messages.create({ data: data }).then(() => {
    setCookie(event, `hasSent-${config.public.hasSentHash}`, "true");
  });
  return {
    status: 1,
  };
});
