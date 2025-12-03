const HomePage = () => {
  const images = ['-1.jpg','-2.jpg','-3.jpg','-4.jpg','-5.jpg','-6.jpg', '-7.jpg', '-8.jpg','-9.jpg','-10.jpg','-11.jpg','-12.jpg','-13.jpg','-14.jpg','-15.jpg'];
  return (
  <div style={styles.container}>
    <div style={styles.box}>
      <h1 style={styles.heading}>Welcome to My Hijab Blog</h1>
      <p style={styles.subtext}>Documenting Modest Fashion, empowering stories...</p>
    </div>

    {/* 🖼️ Add this collage block right here */}
    <div style={styles.collage}>
      {images.map((img, index) => (
        <img
          key={index}
          src={`/hijabi-hero/${img}`} 
          alt={`Hijab style ${index + 1}`}
          style={styles.image}
        />
      ))}
    </div>
  </div>
);
};
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '80px',
    padding: '20px',
  },
  box: {
    textAlign: 'center',
    padding: '60px 30px',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
    maxWidth: '800px',
  },
  heading: {
    fontSize: '36px',
    fontFamily: 'Georgia, serif',
    color: '#e90be9ff',
    marginBottom: '20px',
  },
  subtext: {
    fontSize: '18px',
    color: '#140d14ff',
    lineHeight: '1.6',
  },
  collage: {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'center',
  marginTop: '40px',
},
image: {
  width: '200px',
  height: 'auto',
  margin: '10px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}
};

export default HomePage;