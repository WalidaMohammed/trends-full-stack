return (
  <div style={styles.wrapper}>
    <div style={styles.card}>
      <h1 style={styles.title}>About My Hijab Blog</h1>
      <p style={styles.text}>
        Welcome to my Hijab Blog — a space where myself and other Muslim sisters share their journey through Modest Fashion, faith, and self-expression. I hope to inspire others to embrace confidence, creativity, and individuality while staying true to their values.
      </p>
    </div>
  </div>
);

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px 20px',
    backgroundColor: '#fff8f2',
    minHeight: '80vh',
  },
  card: {
    maxWidth: '700px',
    background: '#ffffff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  title: {
    color: '#6b4226',
    fontFamily: 'Georgia, serif',
    fontSize: '2em',
    marginBottom: '20px',
  },
  text: {
    color: '#444',
    fontSize: '1.1em',
    lineHeight: '1.6',
  },
};