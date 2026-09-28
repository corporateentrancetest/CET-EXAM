const Application = require("../models/Application");
const Candidate = require("../models/Candidate");
const Payment = require("../models/Payment");
const { success, error } = require("../utils/response");
const { APPLICATION_STATUS, PAYMENT_STATUS } = require("../constants");

/** GET /api/admin/stats — dashboard metrics. */
async function stats(req, res, next) {
  try {
    const [totalCandidates, totalApplications, drafts, submitted, paidCount, revenueAgg] =
      await Promise.all([
        Candidate.countDocuments(),
        Application.countDocuments(),
        Application.countDocuments({ status: APPLICATION_STATUS.DRAFT }),
        Application.countDocuments({ status: APPLICATION_STATUS.SUBMITTED }),
        Payment.countDocuments({ status: PAYMENT_STATUS.PAID }),
        Payment.aggregate([
          { $match: { status: PAYMENT_STATUS.PAID } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
      ]);

    const byStatus = await Application.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    return success(res, {
      data: {
        totalCandidates,
        totalApplications,
        drafts,
        submitted,
        paidCount,
        revenue: revenueAgg[0]?.total || 0,
        byStatus: byStatus.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {}),
      },
    });
  } catch (err) {
    return next(err);
  }
}

/** GET /api/admin/applications — paginated, filterable, searchable list. */
async function listApplications(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(parseInt(req.query.limit || "20", 10), 100);
    const { status, search } = req.query;

    const query = {};
    if (status && status !== "all") query.status = status;
    if (search) {
      const rx = new RegExp(search.trim(), "i");
      query.$or = [
        { applicationNumber: rx },
        { "contact.email": rx },
        { "contact.phone": rx },
        { "personal.fullName": rx },
      ];
    }

    const [items, total] = await Promise.all([
      Application.find(query)
        .populate("candidate", "fullName email phone")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Application.countDocuments(query),
    ]);

    return success(res, {
      data: { items, total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return next(err);
  }
}

/** GET /api/admin/applications/:id — single application detail. */
async function getApplication(req, res, next) {
  try {
    const application = await Application.findById(req.params.id).populate(
      "candidate",
      "fullName email phone createdAt"
    );
    if (!application) return error(res, { statusCode: 404, message: "Application not found" });
    return success(res, { data: application });
  } catch (err) {
    return next(err);
  }
}

/** PATCH /api/admin/applications/:id/status — update status. */
async function updateStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!Object.values(APPLICATION_STATUS).includes(status)) {
      return error(res, { statusCode: 400, message: "Invalid status value" });
    }
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application) return error(res, { statusCode: 404, message: "Application not found" });
    return success(res, { message: "Status updated", data: application });
  } catch (err) {
    return next(err);
  }
}

/** GET /api/admin/payments — recent payments. */
async function listPayments(req, res, next) {
  try {
    const payments = await Payment.find()
      .populate("candidate", "fullName email phone")
      .sort({ createdAt: -1 })
      .limit(100);
    return success(res, { data: payments });
  } catch (err) {
    return next(err);
  }
}

module.exports = { stats, listApplications, getApplication, updateStatus, listPayments };
