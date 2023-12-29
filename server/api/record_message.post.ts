import prisma from "../prisma";

export default defineEventHandler(async (event) => {
  const hasSent = getCookie(event, "hasSent") || false;
  if (hasSent === 'true') {
    return
  }
  let postBody = await readBody(event);
  const message = await prisma.messages.create({ data: postBody }).then(() => {
    setCookie(event, 'hasSent', 'true')
  });
  return {
    status: 1,
  };
});
