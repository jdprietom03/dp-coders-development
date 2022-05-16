import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { env } from "process";

const API_ROUTE = env.API_ROUTE;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const url = `${API_ROUTE}/problem/new`;
  
  //Post request to the API

    axios
    .post(url, {
        problem_id: req.body.problem_id,
        title: req.body.title,
        difficulty: req.body.difficulty,
        memory_limit: req.body.memory_limit,
        execution_time: req.body.execution_time,
    })
    .then((response) => {
        res.status(200).json({ message: "Problem added successfully" });
    })

};

export default handler;