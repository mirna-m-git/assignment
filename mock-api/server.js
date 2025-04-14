const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 4100;

app.use(express.json());
app.use(cookieParser());

const users = [
  {
    id: 1,
    email: "test@example.com",
    password: "StrongPassword.",
    username: "testuser",
  },
];
const JWT_SECRET = "secret123";
const JWT_REFRESH_SECRET = "refresh456";

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Token generator
const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};
const authenticateToken = (req, res, next) => {
  const token = req.cookies.access;

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // Attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Cookie sender
const sendAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("access", accessToken, {
    httpOnly: true,
    secure: false, // Set to true in production
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 15 min
  });

  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    secure: false, // Set to true in production
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// Signup
app.post("/account/signup", (req, res) => {
  const { email, password, username, subscribe_to_updates } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ message: "Username already taken" });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    username,
    subscribe_to_updates,
  };
  users.push(newUser);

  const { accessToken, refreshToken } = generateTokens(newUser);
  sendAuthCookies(res, accessToken, refreshToken);
  res.json(newUser);
});

// Login
app.post("/account/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const { accessToken, refreshToken } = generateTokens(user);
  sendAuthCookies(res, accessToken, refreshToken);
  res.json(user);
});

// Refresh
app.post("/account/refresh", (req, res) => {
  const refreshToken = req.cookies.refresh;

  if (!refreshToken) {
    return res.status(400).json({ message: "No refresh token" });
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const user = users.find((u) => u.id === payload.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
    const newRefreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
    sendAuthCookies(res, newAccessToken, newRefreshToken);

    res.json({ message: "Access token refreshed" });
  } catch (e) {
    res.status(401).json({ message: "Token expired or invalid" });
  }
});

// Optional logout route
app.post("/account/logout", (req, res) => {
  res.clearCookie("access");
  res.clearCookie("refresh");
  res.json({ message: "Logged out" });
});

app.get("/me", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Exclude password from the response
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.listen(PORT, () => {
  console.log(`🚀 Mock auth API running at http://localhost:${PORT}`);
});
