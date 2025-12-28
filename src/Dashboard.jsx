export default function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("is_authenticated");
    window.location.href = "/lazybusters/";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#faf9f7",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Header with logout */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "32px",
          maxWidth: "600px",
          width: "100%",
          margin: "0 auto 32px auto",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "500",
            color: "#7c7875",
            backgroundColor: "transparent",
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#d4a574";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#7c7875";
          }}
        >
          Logout
        </button>
      </div>

      {/* Content container - centered and constrained */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          maxWidth: "500px",
          width: "100%",
          margin: "0 auto",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {/* Title */}
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: "600",
            color: "#2d2d2d",
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
            width: "220px",
            height: "auto",
            borderRadius: "18px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            objectFit: "contain",
          }}
        />

        {/* Text below image - centered */}
        <p
          style={{
            margin: 0,
            fontSize: "16px",
            color: "#7c7875",
            textAlign: "center",
            lineHeight: "1.6",
          }}
        >
          Habit completed ✨ Stasik is happy!
        </p>
      </div>
    </div>
  );
}