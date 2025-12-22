export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        padding: "20px",
      }}
    >
      {/* Content container - centered and constrained */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        {/* Title */}
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "600",
            color: "#5d5956",
            textAlign: "center",
          }}
        >
          Stasik & Koshara 🐹🐱
        </h1>

        {/* Image - reduced size, maintains aspect ratio */}
        <img
          src={`${import.meta.env.BASE_URL}stasik.png`}
          alt="Stasik"
          style={{
            width: "200px",
            height: "auto",
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            objectFit: "contain",
          }}
        />

        {/* Text below image - centered */}
        <p
          style={{
            margin: 0,
            fontSize: "16px",
            color: "#7c7875",
            opacity: 0.85,
            textAlign: "center",
            lineHeight: "1.5",
          }}
        >
          Habit completed ✨ Stasik is happy!
        </p>
      </div>
    </div>
  );
}