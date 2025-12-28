import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Enter email and password");
      return;
    }

    localStorage.setItem("is_authenticated", "true");
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#faf9f7",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "360px",
          padding: "40px 32px",
          borderRadius: "20px",
          background: "#ffffff",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            margin: "0 0 32px 0",
            fontSize: "28px",
            fontWeight: "600",
            color: "#2d2d2d",
            textAlign: "center",
          }}
        >
          Lazy Busters
        </h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: "14px",
            border: "1px solid #e0ddd9",
            borderRadius: "10px",
            fontSize: "14px",
            backgroundColor: "#fafaf9",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#d4a574";
            e.currentTarget.style.backgroundColor = "#ffffff";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e0ddd9";
            e.currentTarget.style.backgroundColor = "#fafaf9";
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: "14px",
            border: "1px solid #e0ddd9",
            borderRadius: "10px",
            fontSize: "14px",
            backgroundColor: "#fafaf9",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#d4a574";
            e.currentTarget.style.backgroundColor = "#ffffff";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#e0ddd9";
            e.currentTarget.style.backgroundColor = "#fafaf9";
          }}
        />

        {error && (
          <div
            style={{
              color: "#d32f2f",
              fontSize: "13px",
              marginBottom: "16px",
              padding: "8px 12px",
              backgroundColor: "#ffebee",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px 16px",
            marginTop: "8px",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            fontWeight: "600",
            color: "#ffffff",
            backgroundColor: "#d4a574",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#c89560";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#d4a574";
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}