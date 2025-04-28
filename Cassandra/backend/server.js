const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cassandra = require("cassandra-driver");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Cassandra setup
const client = new cassandra.Client({
  cloud: {
    secureConnectBundle: path.resolve(__dirname, process.env.ASTRA_DB_BUNDLE_PATH),
  },
  credentials: {
    username: process.env.ASTRA_DB_CLIENT_ID,
    password: process.env.ASTRA_DB_SECRET,
  },
  keyspace: process.env.ASTRA_DB_KEYSPACE,
});

// Connect to Astra DB
client.connect()
  .then(() => console.log("✅ Connected to Astra DB (Cassandra)"))
  .catch((err) => console.error("❌ Connection error:", err));

// ---------------- ERP Form Submission ----------------
app.post("/api/erp/create", async (req, res) => {
  const { name, prn } = req.body;

  if (!name || !prn) {
    return res.status(400).json({ error: "Both name and PRN are required." });
  }

  if (!/^[0-9]{10}$/.test(prn)) {
    return res.status(400).json({ error: "PRN must be a 10-digit number." });
  }

  try {
    const query = "INSERT INTO erp_students (prn, name) VALUES (?, ?)";
    await client.execute(query, [prn, name], { prepare: true });

    res.status(200).json({ message: "✅ ERP student data submitted successfully" });
  } catch (err) {
    console.error("❌ Error inserting ERP data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
