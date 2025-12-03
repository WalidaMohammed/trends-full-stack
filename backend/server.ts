import express, { Express, Request, Response } from "express";
import cors from "cors";
import admin from "firebase-admin";
const app: Express = express();
const hostname = "0.0.0.0";
const port = 8080;

app.use(cors());
app.use(express.json());

// Firebase Admin setup
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();


// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("Hijabi Blog API is running ✨");
});

// GET all journal posts
app.get("/api/journal", async (_req: Request, res: Response) => {
  try {
    // no orderBy for now to avoid index issues
    const snapshot = await db.collection("journal").get();

    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(posts); // always return an array
  } catch (error) {
    console.error("Error fetching journal:", error);
    res.status(500).json({ error: "Error fetching journal posts" });
  }
});
// POST create new journal entry
app.post("/api/journal", async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const newPost = {
      title: title || "New Entry",
      content: content || "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("journal").add(newPost);
    const created = await docRef.get();

    res.status(201).json({ id: docRef.id, ...created.data() });
  } catch (error) {
    console.error("Error creating journal entry:", error);
    res.status(500).json({ error: "Error adding journal entry" });
  }
});

// Start server
app.listen(port, hostname, () => {
  console.log(`Hijabi Blog API listening on http://${hostname}:${port}`);
});