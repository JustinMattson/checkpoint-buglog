import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NoteService {
  // async getAll() {
  //   return await dbContext.Notes.find({}).populate("creator", "name picture");
  // }
  // async getById(id) {
  //   let data = await dbContext.Notes.findOne({ _id: id });
  //   if (!data) {
  //     throw new BadRequest("Invalid ID");
  //   }
  //   return data;
  // }
  async create(rawData) {
    let data = await dbContext.Notes.create(rawData);
    return data;
  }
  async getNotesByBugId(id) {
    return await dbContext.Notes.find({ bug: id }).populate(
      "creator",
      "name picture"
    );
  }
  // async edit(id, bugId, userEmail, update) {
  //   let bugData = await dbContext.Bugs.findOne({ id: bugId })
  //   let data = await dbContext.Notes.findOneAndUpdate(
  //     { _id: id, creatorEmail: userEmail},
  //     update,
  //     { new: true }
  //   );
  //   if (!data) {
  //     throw new BadRequest("Invalid ID");
  //   }
  //   return data;
  // }
  async delete(id, userEmail) {
    let data = await dbContext.Notes.findByIdAndRemove({
      _id: id,
      creatorEmail: userEmail,
    });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not onwn this note.");
    }
  }
}

export const noteService = new NoteService();
