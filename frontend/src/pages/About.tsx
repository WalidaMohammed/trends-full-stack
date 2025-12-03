const About = () => {
  return (
    <div style={styles.container}> 
        <div style={styles.heroBox}>
            <h1 style={styles.heading}>About My Hijab Blog</h1>
            <p style={styles.subtext}>
                Welcome to my Hijab Blog — a space where myself and other Muslim sisters share their journey with 
                Modest Fashion, faith and self expression. I hope to inspire others to embrace confidence, 
                creativity and individuality while staying true to their values.
            </p>
        </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '80px',
    padding: '20px',
  },
  heroBox: {
    backgroundColor: 'white',
    padding: '40px',
    maxWidth: '700px',
    borderRadius: '12px',
    boxShadow: '0 0 12px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '32px',
    color: '#e90be9ff',
    fontFamily: 'Georgia, serif',
    marginBottom: '20px',
  },
subtext: {
    color: '#444',
    fontSize: '18px',
    lineHeight: '1.7',
  },
};

export default About;