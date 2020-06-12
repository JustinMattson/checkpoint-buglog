import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import BugSchema from "../models/Bug";
import NoteSchema from "../models/Note";
import ProfileSchema from "../models/Profile";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Bugs = mongoose.model("Bug", BugSchema);
  Notes = mongoose.model("Note", NoteSchema);
}

export const dbContext = new DbContext();
