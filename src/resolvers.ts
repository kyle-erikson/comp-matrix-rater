import { IResolvers } from "graphql-tools";
import { PrismaClient } from "@prisma/client";
import { BaseReport } from "./generated/graphql";
import { Report } from "./types/customTypes";
import { error } from "node:console";

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
    getReport: async (parent, { reportId }) => {
      const prisma = new PrismaClient();

      const matrixReport = await prisma.matrix_report.findUnique({
        where: {
          id: reportId,
        },
        select: {
          matrix_id: true,
          user_id: true,
        },
      });

      if (!matrixReport)
        throw new Error("Could not find corresponding matrix report");

      const jobLevel = await prisma.user.findUnique({
        where: {
          id: matrixReport.user_id,
        },
        select: {
          level_id: true,
        },
      });

      if (!jobLevel) throw new Error("No job level defined for user");

      const report = await prisma.key_area.findMany({
        where: {
          matrix_id: matrixReport.matrix_id,
        },
        include: {
          attribute: {
            include: {
              competency: {
                select: {
                  name: true,
                  id: true,
                  competency_description: {
                    where: {
                      level_id: jobLevel.level_id,
                    },
                  },
                  rating: {
                    where: {
                      matrix_report_id: reportId,
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
        competency_id,
        user_id,
        rating,
        notes,
      } = input;

      const prisma = new PrismaClient();

      let ratingId = rating_id ? Number(rating_id) : 0;
      let userId = user_id ? { user_id: Number(user_id) } : null;

      let ratingRecord = {};

      if (!userId) {
        userId = await prisma.matrix_report.findUnique({
          where: {
            id: matrix_report_id,
          },
          select: {
            user_id: true,
          },
        });
      }

      if (!userId) throw new Error("Could not find user for this atrix report");

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
        ratingRecord = await prisma.rating.create({
          data: {
            competency_id: Number(competency_id),
            user_id: userId.user_id,
            rating: Number(rating),
            notes: notes,
            matrix_report_id: matrix_report_id,
          },
        });
      }

      return ratingRecord;
    },
    createReport: async (parent, { userId }) => {
      const prisma = new PrismaClient();

      const recordId = await prisma.matrix_report.create({
        data: {
          matrix_id: 1,
          user_id: Number(userId),
        },
        select: {
          id: true,
        },
      });

      return recordId.id;
    },
  },
};

export default resolvers;
