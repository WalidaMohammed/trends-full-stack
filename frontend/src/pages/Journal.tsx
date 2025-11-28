
import { useEffect, useState } from "react";
import { BACKEND_BASE_PATH } from "../constants/Navigation";
import { useAuth } from "../useAuth/AuthContext";

type Post = {
  id: string;
  title: string;
  content: string;
};

const Journal = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const user = useAuth();

  // ---------------------------
  // Fetch posts
  // ---------------------------
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`${BACKEND_BASE_PATH}/journal`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    }
    fetchPosts();
  }, []);

  // ---------------------------
  // Submit new post
  // ---------------------------
  async function handleSubmit() {
  if (!newPost.trim()) return;

  try {
    const res = await fetch(`${BACKEND_BASE_PATH}/journal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New Entry",
        content: newPost,
      }),
    });

    if (!res.ok) throw new Error("Failed to create post");

    const createdPost = await res.json();

    setPosts((prev) => [...prev, createdPost]);
    setNewPost("");
  } catch (err) {
    console.error("Error submitting post:", err);
    alert("Something went wrong while submitting your post.");
  }
}

  // ---------------------------
  // Edit post
  // ---------------------------
  async function handleEdit(id: string) {
    const post = posts.find((p) => p.id === id);
    if (!post) return;

    const newContent = window.prompt("Edit your entry:", post.content);
    if (!newContent || !newContent.trim()) return;

    await fetch(`${BACKEND_BASE_PATH}/journal/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newContent }),
    });

    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, content: newContent } : p))
    );
  }

  // ---------------------------
  // Delete post
  // ---------------------------
  async function handleDelete(id: string) {
    await fetch(`${BACKEND_BASE_PATH}/journal/${id}`, {
      method: "DELETE",
    });

    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1 style={{ color: "#c457d4" }}>My Hijabi Journal</h1>

      {/* MESSAGE IF NOT LOGGED IN */}
      {!user && (
        <p style={{ color: "#888", marginBottom: "20px" }}>
          You must be logged in to write or edit journal entries. Go to the
          Login page.
        </p>
      )}

      {/* If no posts */}
      {posts.length === 0 ? (
        <p style={{ color: "#fa46bb", marginTop: "20px" }}>
          No journal entries yet...
        </p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            {/* Only allow editing/deleting when logged in */}
            {user && (
              <>
                <button
                  onClick={() => handleEdit(post.id)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(post.id)}
                  style={{
                    color: "white",
                    backgroundColor: "#ff4b4b",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </>
            )}

            <hr style={{ width: "300px", marginTop: "15px" }} />
          </div>
        ))
      )}

      {/* NEW POST INPUT */}
      <input
        type="text"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Write a new journal entry…"
        disabled={!user}
        style={{ padding: "10px", width: "300px", marginTop: "20px" }}
      />

      <button
        onClick={handleSubmit}
        disabled={!user}
        style={{ padding: "10px", marginLeft: "10px" }}
      >
        Submit
      </button>
    </div>
  );
};

export default Journal;