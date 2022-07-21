import { RequestHandler } from "express";
import createHttpError from "http-errors";
import CarbonCertificateModel, {
  ICarbonCertificate,
} from "../model/CarbonCertificate";
import userModel from "../model/User";
import jwt_decode from "jwt-decode";

export const getExample: RequestHandler = (req, res, next) => {
  res.json({ message: "hello" });
};

export const createCarbonCertificate: RequestHandler = async (
  req,
  res,
  next
) => {
  const { country, owner }: ICarbonCertificate = req.body;
  try {
    let Status = {
      available: true,
      owned: false,
      transferred: false,
    };
    if (owner) {
      Status.available = false;
      Status.owned = true;
    }
    const certificate = new CarbonCertificateModel({
      country,
      owner,
      Status,
    });
    await certificate.save();

    return res.status(200).json({ success: true, data: certificate });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const ownedCarbonCertificate: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const currentUser: any = jwt_decode(req.cookies.jwt);
    const userid: string = currentUser.userId;

    const userOwnedCertificates = await CarbonCertificateModel.find({
      owner: userid,
    });

    return res.status(200).json({ success: true, data: userOwnedCertificates });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const availableCarbonCertificate: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    let availableStatus = {
      available: true,
      owned: false,
      transferred: false,
    };
    const availableCertificates = await CarbonCertificateModel.find({
      Status: availableStatus,
    });

    return res.status(200).json({ success: true, data: availableCertificates });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const transferCarbonCertificate: RequestHandler = async (
  req,
  res,
  next
) => {
  const { transferToUser, certificateId } = req.body;

  try {
    const currentUser: any = jwt_decode(req.cookies.jwt);
    const userid: string = currentUser.userId;

    let certificate = await CarbonCertificateModel.findById(certificateId);
    let targetUser = await userModel.findById(transferToUser);

    if (certificate && targetUser) {
      if (certificate.owner) {
        if (certificate.owner.toString() === userid) {
          certificate.owner = transferToUser;
          certificate.Status.transferred = true;
        } else {
          throw new Error("userId does not match with the owner");
        }
      } else {
        throw new Error("Owner property is not available on the certificate");
      }
    } else {
      throw new Error("Certificate or User not found");
    }

    let transferDetails = await CarbonCertificateModel.findByIdAndUpdate(
      certificateId,
      certificate,
      { new: true }
    ).exec();

    return res.status(200).json({ success: true, data: transferDetails });
  } catch (error: any) {
    return next(createHttpError(error));
  }
};

export const seedCarbonCertificate: RequestHandler = async (req, res, next) => {
  try {
    const currentUser: any = jwt_decode(req.cookies.jwt);
    const owner: string = currentUser.userId;

    const country = "canada";
    const availableStatus = {
      available: true,
      owned: false,
      transferred: false,
    };
    const ownedStatus = {
      available: false,
      owned: true,
      transferred: false,
    };

    for (let i = 0; i < 5; i++) {
      let Status = availableStatus;

      const availableCertificates = new CarbonCertificateModel({
        country,
        Status,
      });
      await availableCertificates.save();
    }

    for (let i = 0; i < 5; i++) {
      let Status = ownedStatus;

      const ownedCertificates = new CarbonCertificateModel({
        country,
        owner,
        Status,
      });

      await ownedCertificates.save();
    }

    return res
      .status(200)
      .json({ success: true, msg: "Records inserted successfully" });
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};
