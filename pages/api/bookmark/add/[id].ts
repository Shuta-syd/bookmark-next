import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { getSession } from "next-auth/react";

// リクエストとレスポンスの型指定
export default async (req: NextApiRequest, res: NextApiResponse) => {
  //reqのオブジェクトから認証情報を取得
  const session = await getSession({ req });

  if (session?.user?.email) {
    const result = await prisma.article.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
        users: {
          connect: { email: session?.user?.email },
        },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
