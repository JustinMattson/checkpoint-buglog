import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugService {
  async getAll() {
    return await dbContext.Bugs.find({}).populate("creator", "name picture");
  }
  async getById(id) {
    let data = await dbContext.Bugs.findOne({ _id: id });
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData);
    return data;
  }
  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate(
      { _id: id, creatorEmail: userEmail, closed: false },
      update,
      {
        new: true,
      }
    );
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
  async delete(id, userEmail, update) {
    update.closed = true;
    // REVIEW verify that the date is correct and the user email is validated.
    update.closedDate = new Date();
    let data = await dbContext.Bugs.findByIdAndUpdate(
      { _id: id, creatorEmail: userEmail },
      update,
      { new: true }
    );
    return data;
  }
}

export const bugService = new BugService();
