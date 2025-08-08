export const sendBooksContent = async (textsContent: string[]) => {
  const req = await fetch("http://127.0.0.1:4590/recommendations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(textsContent),
  });

  const res = await req.json();
  return res;
};
