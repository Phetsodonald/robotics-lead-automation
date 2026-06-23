import { useState } from "react";

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Lead sent successfully ");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("Something went wrong");
      }

    } catch (err) {
      setStatus("Server error");
    }

    setLoading(false);
  };

  return (
  <div className="page">
    <div className="card">
      <h2>Ster Robotics</h2>
      <p className="subtitle">Send a message and get an instant AI response</p>

      <form onSubmit={handleSubmit} className="form">

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Tell us what you need..."
          value={form.message}
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
          {loading ? "Generating response..." : "Send Message"}
        </button>

        {status && <p className="status">{status}</p>}
      </form>
    </div>
  </div>
);
}