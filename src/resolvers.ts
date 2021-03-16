import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";

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
    getReports: async (parent, { managerId }) => {
      const prisma = new PrismaClient();

      return await prisma.user.findMany({
        where: {
          manager_id: managerId,
        },
      });
    },
    getMatrixReportsForUser: async (parent, { userId }) => {
      const prisma = new PrismaClient();

      return await prisma.matrix_report.findMany({
        where: {
          user_id: userId,
        },
      });
    },
  },
};

export default resolvers;
