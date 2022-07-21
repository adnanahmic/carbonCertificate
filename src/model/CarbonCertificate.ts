import { Schema, model, Document } from "mongoose";
import mongoose from "mongoose";

export interface ICarbonCertificate extends Document {
  country: string;
  owner: string;
  Status: {
    available: Boolean;
    owned: Boolean;
    transferred: Boolean;
  };
}

const CarbonCertificateSchema: Schema = new Schema({
  country: { type: String },
  owner: { type: mongoose.Types.ObjectId, ref: `User` },
  Status: {
    available: { type: Boolean },
    owned: { type: Boolean },
    transferred: { type: Boolean },
  },
});

export default model<ICarbonCertificate>(
  "CarbonCertificate",
  CarbonCertificateSchema
);
