import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const VerificationEmail = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return VerificationEmail;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const VerificationToken = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return VerificationToken;
  } catch {
    return null;
  }
};
