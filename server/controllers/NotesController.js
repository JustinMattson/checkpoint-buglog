import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { bugService } from "../services/NoteService";

export class NotesController extends BaseController {
  constructor() {
    super("api/bugs");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      .get("/:id", this.getById)
      //.get("/:id/notes", this.getNotesByNoteId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.edit);
  }

  async getAll(req, res, next) {
    try {
      let data = await bugService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await bugService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  // async getNotesByNoteId(req, res, next) {
  //   try {
  //     let data = await noteService.getNotesByBoardId(req.params.id);
  //     return res.send(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await bugService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      //allowed only if bug is open and user validated by email
      let data = await bugService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      // DO NOT DELETE
      // simply PUT the bug status to closed
      // and user validated by email
      let data = await bugService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
    } catch (error) {
      next(error);
    }
  }
}
