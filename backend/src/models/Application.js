const mongoose = require("mongoose");
const { APPLICATION_STATUS } = require("../constants");

const fileSchema = new mongoose.Schema(
  { url: String, publicId: String, uploadedAt: Date },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true, unique: true },
    applicationNumber: { type: String, required: true, unique: true },

    // Section: Personal details / identity
    personal: {
      fullName: String,
      dateOfBirth: String,
      gender: String,
      category: String, // General / OBC / SC / ST / EWS
      idType: String, // Aadhaar / PAN / Passport / Voter ID
      idNumber: String,
    },

    contact: {
      email: String,
      phone: String,
    },

    // Section: Academic
    academic: {
      college: String,
      university: String,
      course: String,
      specialization: String,
      graduationYear: String,
      cgpa: String,
    },

    // Section: Address
    address: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
    },

    // Section: Exam / interview preference + career interest
    preferences: {
      examShift: String,
      examCity: String,
      interviewMode: { type: String, default: "Virtual" },
      careerInterest: String,
    },

    // Section: Declarations
    declarations: {
      infoAccurate: { type: Boolean, default: false },
      termsAccepted: { type: Boolean, default: false },
    },

    // Section: Documents (uploaded AFTER payment)
    documents: {
      photo: fileSchema,
      signature: fileSchema,
      idProof: fileSchema,
      collegeId: fileSchema,
    },

    // Payment snapshot (authoritative record lives in Payment model)
    payment: {
      status: { type: String, default: "unpaid" },
      amount: Number,
      orderId: String,
      paymentId: String,
      method: String,
      paidAt: Date,
    },

    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.DRAFT,
    },
    currentStep: { type: Number, default: 1 },
    submittedAt: Date,
  },
  { timestamps: true, collection: "applications" }
);

module.exports = mongoose.model("Application", applicationSchema);
