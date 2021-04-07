import { NextApiRequest, NextApiResponse } from 'next'

export default (req_: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'Hello' })
}
