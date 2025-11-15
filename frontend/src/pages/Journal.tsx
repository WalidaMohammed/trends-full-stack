import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
};

const Journal = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    console.log("Fetching journal entries...");
    fetch("http://localhost:3000/api/journal")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received:", data);
        setPosts(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  async function handleSubmit() {
    if (!newPost.trim()) return;

    await fetch("http://localhost:3000/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New Entry",
        content: newPost,
      }),
    });

    setNewPost("");
    window.location.reload();
  }

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>My Journal</h1>

      {posts.length === 0 ? (
        <p>No posts found...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <hr style={{ width: "300px" }} />
          </div>
        ))
      )}

      {/* INPUT FIELD */}
      <input
        type="text"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Write a new journal entry…"
        style={{ padding: "10px", width: "300px", marginTop: "20px" }}
      />

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleSubmit}
        style={{ padding: "10px", marginLeft: "10px" }}
      >
        Submit
      </button>
    </div>
  );
};

export default Journal;
