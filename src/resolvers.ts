import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";
import { BaseReport, Report } from "./generated/graphql";
import { ReportInput } from "./types/customTypes";

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

      let userID = Number(userId);
      let matrixID = Number(matrixId);

      const results = await prisma.user.findUnique({
        where: {
          id: userID,
        },
        select: {
          level_id: true,
        },
      });

      if (!results?.level_id) throw "Cannot find level for user";

      const report = await prisma.key_area.findMany({
        where: {
          matrix_id: matrixID,
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
  Mutation: {
    saveReport: async (parent, { input }) => {
      const {
        rating_id,
        matrix_report_id,
        matrix_id,
        competency_id,
        user_id,
        rating,
        notes,
      } = input;

      const prisma = new PrismaClient();

      let matrixReportId = matrix_report_id ? Number(matrix_report_id) : 0;
      let ratingId = rating_id ? Number(rating_id) : 0;

      let ratingRecord = {};

      if (ratingId > 0) {
        ratingRecord = await prisma.rating.update({
          where: {
            id: ratingId,
          },
          data: {
            rating: Number(rating),
            notes: notes,
          },
        });
      } else {
        if (matrixReportId <= 0) {
          const newReport = await prisma.matrix_report.create({
            data: {
              matrix_id: Number(matrix_id),
              user_id: Number(user_id),
            },
          });

          matrixReportId = newReport.id;
        }
        ratingRecord = await prisma.rating.create({
          data: {
            competency_id: Number(competency_id),
            user_id: Number(user_id),
            rating: Number(rating),
            notes: notes,
            matrix_report_id: matrixReportId,
          },
        });
      }

      return ratingRecord;
    },
  },
};

export default resolvers;
