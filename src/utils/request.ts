export const request = <Resp>(url: string): Promise<Resp> => {
  return fetch(url).then(async (resp) => {
    if (resp.ok) {
      if (url.includes("api.allorigins.win")) {
        try {
          return JSON.parse((await resp.json()).contents);
        } catch (e) {
          throw e;
        }
      }

      return resp.json() as Resp;
    }

    throw new Error("ApiError");
  }).catch((e) => {
    console.error(e);
    throw e;
  })
}