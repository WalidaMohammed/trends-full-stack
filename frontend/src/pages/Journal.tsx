
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
  const [likes, setLikes] = useState<{ [key: string]: number }>({});

  const handleLike = (postId: string) => {
    setLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
  };
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
    <div style={styles.page}>
      <h1 style={styles.heading}>My Hijabi Journal</h1>

      {!user && (
        <p style={styles.msg}>
          You must be logged in to write or edit journal entries.
        </p>
      )}

      {posts.length === 0 ? (
        <p style={styles.noPosts}>No journal entries yet...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={styles.postCard}>
            <h3 style={styles.postTitle}>{post.title}</h3>
            <p style={styles.postContent}>{post.content}</p>
            <div style={styles.actions}>
              <button onClick={() => handleLike(post.id)} style={styles.button}>
                ❤️ Like ({likes[post.id] || 0})
              </button>
            </div>


            {user && (
              <div style={styles.actions}>
                <button onClick={() => handleEdit(post.id)} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(post.id)} style={styles.button}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}

      <input
        type="text"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Write a new journal entry..."
        disabled={!user}
        style={styles.formInput}
      />

      <button
        onClick={handleSubmit}
        disabled={!user}
        style={styles.submitBtn}
      >
        Submit
      </button>
    </div>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '80px',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    color: '#e90be9ff',
    marginBottom: '40px',
    fontSize: '2rem',
  },
  msg: {
    color: '#888',
    marginBottom: '20px',
    textAlign: 'center',
  },
  noPosts: {
    color: '#fa46bb',
    marginTop: '20px',
    textAlign: 'center',
  },
  postCard: {
    backgroundColor: '#fffefc',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 8px rgba(0,0,0,0.05)',
    marginBottom: '20px',
  },
  postTitle: {
    margin: '0 0 10px',
    fontSize: '1.2rem',
    color: '#e90be9ff',
  },
  postContent: {
    color: '#444',
    lineHeight: '1.6',
  },
  actions: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  button: {
    backgroundColor: '#ffd4d4',
    color: '#e50ebdff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  formInput: {
    padding: '10px',
    width: '100%',
    maxWidth: '500px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    margin: '20px auto',
    display: 'block',
    fontSize: '16px',
  },
  submitBtn: {
    padding: '10px 20px',
    marginLeft: '10px',
    borderRadius: '6px',
    backgroundColor: '#b3676b',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },

};

export default Journal; 