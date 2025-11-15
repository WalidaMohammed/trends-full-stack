const express = require ('express');
const cors = require('cors');
const admin = require("firebase-admin");

const app =express();
app.set('json spaces', 2);
app.use(cors());
app.use(express.json());

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

app.get('/',(req,res)=>{
  res.send('guess what');
});

app.get('/hello', (req, res)=> {
  res.send('i just built the real foundation of how the backend of a web app works. yeey!!');
});

app.get('/about',(req,res)=>{
  res.send('lets get to it, learn and enhance our knowledge');
});

app.post('/api/journal', async (req, res) => {
  try {
    const newPost = req.body;
    const docRef = await db.collection('journal').add(newPost);
    res.json({ id: docRef.id, ...newPost });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding journal entry");
  }
});

app.put('/api/users/:id',(req,res)=>{
  const id=req.params.id;
  const updatedData=req.body;
  res.send(`PUT request:user with id ${id} updated-${JSON.stringify(updatedData)}`);
});

app.delete('/api/users/:id',(req,res)=>{
  const id= req.params.id;
  res.send(`DELETE request: user with id ${id} deleted successfully`);
});

app.get('/api/journal', async (req, res) => {
  try {
    const snapshot = await db.collection('journal').get();
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching journal posts");
  }
});

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server runnng on http://localhost:${PORT}`);
});
