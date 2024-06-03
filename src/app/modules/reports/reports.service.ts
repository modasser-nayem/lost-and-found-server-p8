import { prisma } from "../../utils/prisma";

const totalItemCountReport = async () => {
  const totalLostItem = await prisma.lostItem.count();
  const totalFoundLostItem = await prisma.lostItem.count({
    where: { isFound: true },
  });
  const totalFoundItem = await prisma.foundItem.count();

  const totalClaimRequest = await prisma.claimItem.count();
  const totalClaimRequestPending = await prisma.claimItem.count({
    where: { status: "pending" },
  });
  const totalClaimRequestApproved = await prisma.claimItem.count({
    where: { status: "approved" },
  });
  const totalClaimRequestRejected = await prisma.claimItem.count({
    where: { status: "rejected" },
  });

  return {
    totalLostItem,
    totalFoundLostItem,
    totalFoundItem,
    totalClaimRequest,
    totalClaimRequestPending,
    totalClaimRequestApproved,
    totalClaimRequestRejected,
  };
};

const reportServices = { totalItemCountReport };
export default reportServices;
