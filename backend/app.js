// backend/app.js

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Firebase Admin setup
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
// Basic test routes
app.get("/api/journal", async (req, res) => {
  try {
    const snapshot = await db.collection("journal").get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (err) {
    console.error("GET /api/journal ERROR:", err);
    res.status(500).json({ error: "Error fetching journal posts" });
  }
});

app.post("/api/journal", async (req, res) => {
  try {
    const newPost = req.body;
    const docRef = await db.collection("journal").add(newPost);
    res.json({ id: docRef.id, ...newPost });
  } catch (err) {
    console.error("POST /api/journal ERROR:", err);
    res.status(500).json({ error: "Error adding journal entry" });
  }
});


// GET all journal entries
app.get("/api/journal", async (req, res) => {
  try {
    const snapshot = await db.collection("journal").get();

    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(posts); // always an array
  } catch (error) {
    console.error("Error fetching journal posts:", error);
    res.status(500).json({ error: "Error fetching journal posts" });
  }
});

// POST create a new journal entry
app.post("/api/journal", async (req, res) => {
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
    console.error("Error adding journal entry:", error);
    res.status(500).json({ error: "Error adding journal entry" });
  }
});

// EXTRA SAMPLE ROUTES (not used by frontend)
app.put("/api/journal/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body; // e.g. { content: "new text" }

    await db.collection("journal").doc(id).update({
      ...updates,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const updatedDoc = await db.collection("journal").doc(id).get();
    res.json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (err) {
    console.error("PUT /api/journal ERROR:", err);
    res.status(500).json({ error: "Error updating journal entry" });
  }
});

// Delete a journal entry
app.delete("/api/journal/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection("journal").doc(id).delete();
    res.json({ success: true, id });
  } catch (err) {
    console.error("DELETE /api/journal ERROR:", err);
    res.status(500).json({ error: "Error deleting journal entry" });
  }
});

// Start server
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
