import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";
import { BaseReport } from "./generated/graphql";

const resolvers: IResolvers = {
  Query: {
    getMatrices: async () => {
      const prisma = new PrismaClient();

      return await prisma.matrix.findMany();
    },
    getLevels: async (parent, { matrixId }) => {
      const prisma = new PrismaClient();

      return await prisma.level.findMany({
        where: {
          matrix_id: matrixId,
        },
      });
    },
    getUsers: async (parent, { managerId }) => {
      const prisma = new PrismaClient();

      return await prisma.user.findMany({
        where: {
          manager_id: managerId,
        },
      });
    },
    getReportsForUser: async (parent, { userId }) => {
      const prisma = new PrismaClient();

      return await prisma.matrix_report.findMany({
        where: {
          user_id: userId,
        },
      });
    },
    getBaseReportForUser: async (parent, { userId, matrixId }) => {
      const prisma = new PrismaClient();

      const results = await prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
        select: {
          level_id: true,
        },
      });

      if (!results?.level_id) throw "Cannot find level for user";

      const report = await prisma.key_area.findMany({
        where: {
          matrix_id: Number(matrixId),
        },
        include: {
          attribute: {
            include: {
              competency: {
                include: {
                  competency_description: {
                    where: {
                      level_id: results?.level_id,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return report;
    },
  },
};

export default resolvers;
