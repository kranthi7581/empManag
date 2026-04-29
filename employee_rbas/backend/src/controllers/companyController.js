const Company = require("../models/Company");
const asyncHandler = require("../utils/asyncHandler");

const companyPopulation = { path: "createdBy", select: "name email" };

const buildScope = (req) => {
  if (req.user?.isSuperAdmin) {
    return {};
  }

  return req.user?.companyId ? { _id: req.user.companyId } : { createdBy: req.user.userId };
};

exports.createCompany = asyncHandler(async (req, res) => {
  const payload = {
    ...req.body,
    createdBy: req.body.createdBy || req.user?.userId,
  };

  const company = await Company.create(payload);
  const populatedCompany = await Company.findById(company._id).populate(companyPopulation);

  return res.status(201).json({
    message: "Company created successfully",
    company: populatedCompany,
  });
});

exports.getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find(buildScope(req))
    .populate(companyPopulation)
    .sort({ createdAt: -1 });

  return res.status(200).json({ count: companies.length, companies });
});

exports.getCompanyById = asyncHandler(async (req, res) => {
  const company = await Company.findOne({
    _id: req.params.id,
    ...buildScope(req),
  }).populate(companyPopulation);

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  return res.status(200).json({ company });
});

exports.updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findOneAndUpdate(
    {
      _id: req.params.id,
      ...buildScope(req),
    },
    req.body,
    { new: true, runValidators: true },
  ).populate(companyPopulation);

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  return res.status(200).json({
    message: "Company updated successfully",
    company,
  });
});

exports.deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findOneAndDelete({
    _id: req.params.id,
    ...buildScope(req),
  });

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  return res.status(200).json({ message: "Company deleted successfully" });
});
