import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { env } from "process";

const API_ROUTE = env.API_ROUTE;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const url = `${API_ROUTE}/problem/all`;
  
  axios
    .get(url)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export default handler;