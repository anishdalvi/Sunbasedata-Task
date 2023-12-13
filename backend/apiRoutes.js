// backend/apiRoutes.js
import express from "express";
import { Router } from "express";
import fetch from 'node-fetch';

const router = Router();

const baseApiUrl = "https://qa2.sunbasedata.com/sunbase/portal/api/";
const authApiUrl = baseApiUrl + "assignment_auth.jsp";

router.post("/authenticate", async (req, res) => {
  try {
    const response = await fetch(authApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log(data);

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Add other API routes (create, get_customer_list, delete, update) similarly

export default router;
