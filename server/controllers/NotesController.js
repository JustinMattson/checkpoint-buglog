import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { noteService } from "../services/NoteService";
import { bugService } from "../services/BugService";

export class NotesController extends BaseController {
  constructor() {
    super("api/notes");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .post("", this.create)
      // .put("/:id", this.edit)  // Stretchy
      .delete("/:id", this.delete);
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await noteService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  // async edit(req, res, next) {
  //   try {
  //     //allowed only if bug is open and user validated by email
  //     let data = await bugService.getAll()
  //     let data = await noteService.edit(
  //       req.params.id,
  //       req.userInfo.email,
  //       req.body
  //     );
  //     return res.send(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  async delete(req, res, next) {
    try {
      await noteService.delete(req.params.id, req.userInfo.email);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}
