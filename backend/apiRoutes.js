// backend/apiRoutes.js
import express from "express";
import { Router } from "express";
import fetch from "node-fetch";

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

// Create a new Customer
router.post("/create", async (req, res) => {
  try {
    // Extract required fields from req.body
    const {
      first_name,
      last_name,
      street,
      address,
      city,
      state,
      email,
      phone,
    } = req.body;

    // Validate mandatory fields
    if (!first_name || !last_name) {
      res.status(400).json({ error: "First Name or Last Name is missing" });
      return;
    }

    const createCustomerUrl = baseApiUrl + "assignment.jsp?cmd=create";

    const response = await fetch(createCustomerUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + req.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        street,
        address,
        city,
        state,
        email,
        phone,
      }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Create customer error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get customer list
router.get("/get_customer_list", async (req, res) => {
  try {
    const getCustomerListUrl =
      baseApiUrl + "assignment.jsp?cmd=get_customer_list";

    const response = await fetch(getCustomerListUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + req.headers.authorization,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Get customer list error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a customer
router.post("/delete", async (req, res) => {
  try {
    const deleteCustomerUrl =
      baseApiUrl + `assignment.jsp?cmd=delete&uuid=${req.body.uuid}`;

    const response = await fetch(deleteCustomerUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + req.headers.authorization,
      },
    });

    // Check if the response status is OK
    if (response.ok) {
      // Check the Content-Type header
      const contentType = response.headers.get('content-type');
      console.log(contentType);

      if (contentType && contentType.includes('application/json')) {
        // If the response is JSON, parse it
        try {
          const data = await response.json();
          res.status(response.status).json(data);
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError);
          res.status(500).json({ error: "Error parsing JSON from external API" });
        }
      } else {
        // If the response is not JSON, handle it accordingly
        const textData = await response.text();
        res.status(response.status).json({ message: textData.trim() });
      }
    } else {
      // If the response status is not OK, send an error response
      console.error("External API error:", response.status);
      res.status(response.status).json({ error: "Error from external API" });
    }
  } catch (error) {
    console.error("Delete customer error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Update a customer
router.post("/update", async (req, res) => {
  try {
    const {
      uuid,
      first_name,
      last_name,
      street,
      address,
      city,
      state,
      email,
      phone,
    } = req.body;

    // Validate mandatory fields
    if (!uuid || !first_name || !last_name) {
      res
        .status(400)
        .json({ error: "UUID, First Name, and Last Name are mandatory" });
      return;
    }

    const updateCustomerUrl =
      baseApiUrl + `assignment.jsp?cmd=update&uuid=${uuid}`;

    const response = await fetch(updateCustomerUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + req.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        street,
        address,
        city,
        state,
        email,
        phone,
      }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Update customer error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
