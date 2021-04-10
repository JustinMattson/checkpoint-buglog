import express from "express";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";

export class ProfilesController extends BaseController {
  constructor() {
    super("api/profile");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserProfile)
      .put("/:id", this.edit);
  }
  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await profilesService.updateProfile(
        req.userInfo.email,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
