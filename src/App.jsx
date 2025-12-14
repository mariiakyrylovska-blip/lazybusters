function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1>Stasik & Koshara 🐹🐱</h1>

      <img
        src="/stasik.png"
        alt="Stasik"
        style={{
          width: 200,
          borderRadius: 20,
          marginTop: 20,
        }}
      />

      <p style={{ marginTop: 16 }}>
        Habit completed ✨ Stasik is happy!
      </p>
    </div>
  );
}

export default App;