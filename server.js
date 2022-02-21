const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { check, validationResult } = require("express-validator");
const { getConnection } = require("./helper");
const OPTIONS = {
    "definition": {
      "openapi": "3.0.0",
      "info": {
        "title": "Swagger API",
        "version": "1.0.0",
        "description": "Simple Express Swagger API",
        "termsOfService": "http://example.com/terms/",
        "contact": {
          "name": "Sree Gauthami",
          "url": "https://github.com/Sree-Gauthami-Gundaram/ITIS-6177-Assignment8",
          "email": "sree.gauthami1@gmail.com"
        }
      },
  
      "servers": [
        {
          "url": "http://137.184.125.91:3000/",
          "description": "Swagger Express API Documentation"
        }
      ]
    },
    "apis": ["./*.js"]
  }
const PORT = process.env.PORT || 3000;
const app = express();
const specs = swaggerJsDoc(OPTIONS);

app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       properties:
 *         ITEMCODE:
 *           type: string
 *         ITEMNAME:
 *           type: string
 *         BATCHCODE:
 *           type: string
 *         CONAME:
 *           type: string
 */

/**
 * @swagger
 * /list:
 *   post:
 *     summary: Insert a item
 *     tags: [listofitem]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ITEMCODE:
 *                    type: string
 *                    example: I007
 *                  ITEMNAME:
 *                    type: string
 *                    example: Gulab Jamun
 *                  BATCHCODE:
 *                    type: string
 *                    example: 2507
 *                  CONAME:
 *                    type: string
 *                    example: GJ
 *     responses:
 *       200:
 *         description: Succesfully inserted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not insert
 */
app.post("/list", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("INSERT INTO listofitem (ITEMCODE, ITEMNAME, BATCHCODE, CONAME) VALUES (?,?,?,?);",
          [body.ITEMCODE, body.ITEMNAME, body.BATCHCODE, body.CONAME])
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Returns the list of items
 *     tags: [listofitem]
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/listofitem'
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not get items
 */
  app.get("/list", (req, res) => {
    getConnection()
      .then((conn) => {
        conn
          .query("SELECT * from listofitem")
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /list:
 *   put:
 *     summary: Update a item
 *     tags: [listofitem]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ITEMNAME:
 *                    type: string
 *                    example: Sree
 *                  ITEMCODE:
 *                    type: number
 *                    example: I007
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not update
 */
app.put("/list", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE listofitem SET ITEMNAME = ? WHERE ITEMCODE = ?",
          [body.ITEMNAME,  body.ITEMCODE])
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /list:
 *   patch:
 *     summary: Update a item
 *     tags: [listofitem]
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  CONAME:
 *                    type: string
 *                    example: Biscuit
 *                  ITEMCODE:
 *                    type: string
 *                    example: I007
 *     responses:
 *       200:
 *         description: Succesfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not update
 */
app.patch("/list", (req, res) => {
    let body = req.body;
    getConnection()
      .then((conn) => {
        conn
          .query("UPDATE listofitem SET CONAME = ? WHERE ITEMCODE = ?",
          [body.CONAME, body.ITEMCODE])
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

/**
 * @swagger
 * /list/{id}:
 *   delete:
 *     summary: Deletes a item with specified id
 *     tags: [listofitem]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: I007
 *         required: true
 *         description: id that needs to be deleted
 *     responses:
 *       200:
 *         description: Succesfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       422:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Could not delete
 */

app.delete("/list/:id", (req, res) => {
    let id = req.params.id;
    getConnection()
      .then((conn) => {
        conn
          .query("DELETE FROM listofitem WHERE ITEMCODE = ?",id)
          .then((rows) => {
              conn.release();
              return res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/orders", (req, res) => {
    getConnection()
      .then((conn) => {
        conn
          .query("SELECT * from orders")
          .then((rows) => {
          conn.release();
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/orders/:amt", (req, res) => {
    var amt = req.params.amt;
    getConnection()
      .then((conn) => {
        conn
          .query(`SELECT * from orders where ORD_AMOUNT = ?`, amt)
          .then((rows) => {
            conn.release();
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get("/orders", (req, res) => {
    var sorting = req.query.sorting;
    getConnection()
      .then((conn) => {
        conn
          .query(`SELECT * from orders order by ORD_DESCRIPTION ${sorting})`)
          .then((rows) => {
            conn.release();
            res.json(rows);
          })
          .catch((err) => {
            console.log(err);
            conn.end();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));