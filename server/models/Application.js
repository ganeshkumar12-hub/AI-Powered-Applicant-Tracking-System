const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    resume: {
      type: String,
      default: "",
    },

    coverLetter: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Interview",
        "Shortlisted",
        "Rejected",
        "Selected",
      ],
      default: "Applied",
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    aiSummary: {
      type: String,
      default: "",
    },

    recommendation: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },
    recruiterNotes: {
  type: String,
  default: "",
},
interviewDate: {
  type: Date,
  default: null,
},

interviewTime: {
  type: String,
  default: "",
},

interviewMode: {
  type: String,
  enum: ["Online", "Offline"],
  default: "Online",
},

meetingLink: {
  type: String,
  default: "",
},
  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);