import { NextApiRequest, NextApiResponse } from "next";

const JUDGE_KEY = "9b01a18e52msh9e2df9b7d9d3b07p1df9c0jsn8ebdab338489";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, input, language_id } = req.body;
  
  const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
    method: "POST",
    headers: {
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "x-rapidapi-key": "9b01a18e52msh9e2df9b7d9d3b07p1df9c0jsn8ebdab338489",
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      source_code: code,
      stdin: input,
      language_id: language_id,
    }),
  });

  const jsonResponse = await response.json();
  let jsonGetSolution = {
    status: { description: "Queue" },
    stderr: "",
    compile_output: "",
    stdout: "",
    memory: "",
    time: null,
  };
  
  let attempt = 0;
  while (jsonGetSolution.status.description !== "Accepted" && attempt < 10) {
    attempt++;
    if (jsonResponse.token) {
      let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
      const getSolution = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key":
            "9b01a18e52msh9e2df9b7d9d3b07p1df9c0jsn8ebdab338489",
          "content-type": "application/json",
        },
      })
      jsonGetSolution = await getSolution.json();
    }
  }
  
  if (jsonGetSolution.stdout) {
    jsonGetSolution.stdout = Buffer.from(jsonGetSolution.stdout, "base64").toString();
    res.status(200).json(jsonGetSolution);
  } else if (jsonGetSolution.stderr) {
    jsonGetSolution.stderr = Buffer.from(jsonGetSolution.stderr, "base64").toString();
    res.status(200).json(jsonGetSolution);
  } else {
    jsonGetSolution.compile_output =  Buffer.from(jsonGetSolution.compile_output, "base64").toString();
  }

}
