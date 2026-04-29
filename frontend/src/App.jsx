import { useEffect, useState } from "react";

const API_BASE = "http://52.5.69.117:30080";

const initialFormData = {
  first_name: "",
  last_name: "",
  street_address: "",
  city: "",
  state: "",
  zip_code: "",
  telephone: "",
  email: "",
  survey_date: "",
  interest_source: "",
  recommendation: "Very likely",
  raffle_numbers: "",
  comments: ""
};

const campusOptions = [
  "Students",
  "Location",
  "Campus",
  "Atmosphere",
  "Dorm rooms",
  "Sports"
];

function HomePage({ onGoToSurvey, onViewSurveys }) {
  return (
    <div className="container">
      <div className="home-card">
        <header className="hero">
          <div className="eyebrow">SWE645 • Assignment 3 • Spring 2026</div>
          <h1>Welcome to Ahmed&apos;s Homepage</h1>
          <p>
            Make sure you leave us a survey!
          </p>
        </header>

        <main className="content">
          <section className="section">
            <h2>About This Page</h2>
            <p>
              Submit a new survey or view all saved survey records from the database.
            </p>
          </section>

          <section className="cta-row">
            <div className="cta-copy">
              <h2>Student Survey</h2>
              <p>Use the buttons to submit a new survey or view saved surveys.</p>
            </div>
            <div className="cta-actions">
              <button className="button-link" onClick={onGoToSurvey}>New Survey</button>
              <button className="secondary-btn" onClick={onViewSurveys}>View Surveys</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SurveyForm({ onBackHome, editingSurvey, onSaved }) {
  const [formData, setFormData] = useState(initialFormData);
  const [likedMost, setLikedMost] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (editingSurvey) {
      setFormData({
        first_name: editingSurvey.first_name || "",
        last_name: editingSurvey.last_name || "",
        street_address: editingSurvey.street_address || "",
        city: editingSurvey.city || "",
        state: editingSurvey.state || "",
        zip_code: editingSurvey.zip_code || "",
        telephone: editingSurvey.telephone || "",
        email: editingSurvey.email || "",
        survey_date: editingSurvey.survey_date || "",
        interest_source: editingSurvey.interest_source || "",
        recommendation: editingSurvey.recommendation || "Very likely",
        raffle_numbers: editingSurvey.raffle_numbers || "",
        comments: editingSurvey.comments || ""
      });
      setLikedMost(
        editingSurvey.liked_most
          ? editingSurvey.liked_most.split(",").map((item) => item.trim()).filter(Boolean)
          : []
      );
    } else {
      setFormData(initialFormData);
      setLikedMost([]);
    }
    setStatusMessage("");
    setErrorMessage("");
  }, [editingSurvey]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckboxChange(option) {
    setLikedMost((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  }

  function handleReset() {
    if (editingSurvey) {
      setFormData({
        first_name: editingSurvey.first_name || "",
        last_name: editingSurvey.last_name || "",
        street_address: editingSurvey.street_address || "",
        city: editingSurvey.city || "",
        state: editingSurvey.state || "",
        zip_code: editingSurvey.zip_code || "",
        telephone: editingSurvey.telephone || "",
        email: editingSurvey.email || "",
        survey_date: editingSurvey.survey_date || "",
        interest_source: editingSurvey.interest_source || "",
        recommendation: editingSurvey.recommendation || "Very likely",
        raffle_numbers: editingSurvey.raffle_numbers || "",
        comments: editingSurvey.comments || ""
      });
      setLikedMost(
        editingSurvey.liked_most
          ? editingSurvey.liked_most.split(",").map((item) => item.trim()).filter(Boolean)
          : []
      );
    } else {
      setFormData(initialFormData);
      setLikedMost([]);
    }
    setStatusMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    const payload = { ...formData, liked_most: likedMost.join(",") };
    const url = editingSurvey ? `${API_BASE}/surveys/${editingSurvey.id}` : `${API_BASE}/surveys`;
    const method = editingSurvey ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to save survey");
      }

      const savedSurvey = await response.json();
      setStatusMessage(editingSurvey ? "Survey updated successfully" : `Survey submitted successfully (ID: ${savedSurvey.id})`);
      if (!editingSurvey) {
        setFormData(initialFormData);
        setLikedMost([]);
      }
      onSaved();
    } catch (error) {
      setErrorMessage("Error saving survey. Check backend URL/CORS and try again.");
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div className="survey-card">
        <div className="hero">
          <h1>{editingSurvey ? "Edit Survey" : "Student Survey"}</h1>
          <p>Brought to you by Ahmed A, SWE645 Spring &apos;26</p>
        </div>

        <div className="content">
          <div className="toolbar toolbar-row">
            <button className="back-link-btn" onClick={onBackHome}>← Back to home page</button>
          </div>

          {statusMessage && <div className="success-box">{statusMessage}</div>}
          {errorMessage && <div className="error-box">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <section className="section">
              <h2>Your Information</h2>
              <div className="grid">
                <div className="field">
                  <label htmlFor="first_name">First name</label>
                  <input id="first_name" name="first_name" type="text" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="last_name">Last name</label>
                  <input id="last_name" name="last_name" type="text" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div className="field full">
                  <label htmlFor="street_address">Street address</label>
                  <input id="street_address" name="street_address" type="text" value={formData.street_address} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="city">City</label>
                  <input id="city" name="city" type="text" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="state">State</label>
                  <input id="state" name="state" type="text" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="zip_code">Zip</label>
                  <input id="zip_code" name="zip_code" type="text" value={formData.zip_code} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="telephone">Telephone number</label>
                  <input id="telephone" name="telephone" type="tel" value={formData.telephone} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="survey_date">Date of survey</label>
                  <input id="survey_date" name="survey_date" type="date" value={formData.survey_date} onChange={handleChange} required />
                </div>
              </div>
            </section>

            <section className="section">
              <h2>Campus Experience</h2>
              <div className="field full">
                <div className="legend">What did you like most about the campus?</div>
                <div className="options">
                  {campusOptions.map((option) => (
                    <label className="option" key={option}>
                      <input type="checkbox" checked={likedMost.includes(option)} onChange={() => handleCheckboxChange(option)} />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </section>

            <section className="section">
              <h2>How You Heard About Us</h2>
              <div className="field full">
                <div className="legend">How did you become interested in the university?</div>
                <div className="options">
                  {["Friends", "Television", "Internet", "Other"].map((option) => (
                    <label className="option" key={option}>
                      <input type="radio" name="interest_source" value={option} checked={formData.interest_source === option} onChange={handleChange} required />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </section>

            <section className="section">
              <h2>Recommendation</h2>
              <div className="field full">
                <label htmlFor="recommendation">How likely are you to recommend this university to prospective students?</label>
                <select id="recommendation" name="recommendation" value={formData.recommendation} onChange={handleChange}>
                  <option>Very likely</option>
                  <option>Likely</option>
                  <option>Unlikely</option>
                </select>
              </div>
            </section>

            <section className="section">
              <h2>Raffle & Comments</h2>
              <div className="grid">
                <div className="field full">
                  <label htmlFor="raffle_numbers">Raffle! Enter at least 10 comma-separated numbers ranging from 1 through 100</label>
                  <input id="raffle_numbers" name="raffle_numbers" type="text" value={formData.raffle_numbers} onChange={handleChange} required />
                  <div className="helper">Use commas to separate each number.</div>
                </div>
                <div className="field full">
                  <label htmlFor="comments">Additional comments</label>
                  <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} />
                </div>
              </div>
            </section>

            <div className="actions">
              <button className="secondary-btn" type="button" onClick={handleReset}>Cancel</button>
              <button className="primary-btn" type="submit">{editingSurvey ? "Update Survey" : "Submit"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function SurveyList({ onBackHome, onEdit }) {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadSurveys() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE}/surveys`);
      if (!response.ok) {
        throw new Error("Failed to load surveys");
      }
      const data = await response.json();
      setSurveys(data);
    } catch (err) {
      setError("Error loading surveys.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSurveys();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(`Delete survey ${id}?`);
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE}/surveys/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete survey");
      }
      setMessage(`Survey ${id} deleted successfully.`);
      setSurveys((prev) => prev.filter((survey) => survey.id !== id));
    } catch (err) {
      setError("Error deleting survey.");
      console.error(err);
    }
  }

  return (
    <div className="container">
      <div className="home-card">
        <header className="hero">
          <div className="eyebrow">Saved Surveys</div>
          <h1>View All Surveys</h1>
          <p>Review, edit, or delete survey records from the database.</p>
        </header>

        <main className="content">
          <div className="toolbar toolbar-row">
            <button className="back-link-btn" onClick={onBackHome}>← Back to home page</button>
            <button className="secondary-btn" onClick={loadSurveys}>Refresh</button>
          </div>

          {message && <div className="success-box">{message}</div>}
          {error && <div className="error-box">{error}</div>}

          <section className="section">
            <h2>Survey Records</h2>
            {loading ? (
              <p>Loading surveys...</p>
            ) : surveys.length === 0 ? (
              <p>No surveys recorded yet.</p>
            ) : (
              <div className="survey-list">
                {surveys.map((survey) => (
                  <div className="survey-item" key={survey.id}>
                    <div>
                      <div className="survey-item-title">
                        #{survey.id} — {survey.first_name} {survey.last_name}
                      </div>
                      <div className="survey-item-meta">
                        {survey.email} • {survey.city}, {survey.state} • {survey.recommendation}
                      </div>
                    </div>
                    <div className="item-actions">
                      <button className="secondary-btn small-btn" onClick={() => onEdit(survey)}>Edit</button>
                      <button className="danger-btn small-btn" onClick={() => handleDelete(survey.id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [editingSurvey, setEditingSurvey] = useState(null);

  function goHome() {
    setEditingSurvey(null);
    setPage("home");
  }

  function goNewSurvey() {
    setEditingSurvey(null);
    setPage("survey");
  }

  function goViewSurveys() {
    setEditingSurvey(null);
    setPage("list");
  }

  function handleEditSurvey(survey) {
    setEditingSurvey(survey);
    setPage("survey");
  }

  if (page === "survey") {
    return <SurveyForm onBackHome={goHome} editingSurvey={editingSurvey} onSaved={goViewSurveys} />;
  }

  if (page === "list") {
    return <SurveyList onBackHome={goHome} onEdit={handleEditSurvey} />;
  }

  return <HomePage onGoToSurvey={goNewSurvey} onViewSurveys={goViewSurveys} />;
}
