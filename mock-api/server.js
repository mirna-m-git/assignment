const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4100;

app.use(express.json());
app.use(cookieParser());

const users = [{ id: 1, email: "test@example.com", password: "password123" }];
const JWT_SECRET = "secret123";
const JWT_REFRESH_SECRET = "refresh456";

// Generate tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

// Signup
app.post("/account/signup", (req, res) => {
  const { email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: "User already exists" });
  }

  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);
  const tokens = generateTokens(newUser);

  res.json({ user: newUser, ...tokens });
});

// Login
app.post("/account/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const tokens = generateTokens(user);
  res.json({ user, ...tokens });
});

// Refresh
app.post("/account/refresh", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(400).json({ message: "No refresh token" });

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = users.find((u) => u.id === payload.id);
    if (!user)
      return res.status(401).json({ message: "Invalid refresh token" });

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ accessToken: newAccessToken });
  } catch (e) {
    res.status(401).json({ message: "Token expired or invalid" });
  }
});

app.get("/", (req, res) => {
  res.json({});
});

app.listen(PORT, () => {
  console.log(`🚀 Mock auth API running at http://localhost:${PORT}`);
});
