import { useState } from "react";

const API_BASE = "http://52.5.69.117:8000";

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

function HomePage({ onGoToSurvey }) {
  return (
    <div className="container">
      <div className="home-card">
        <header className="hero">
          <div className="eyebrow">SWE645 • Assignment 3 • Spring 2026</div>
          <h1>Welcome to Ahmed&apos;s Homepage</h1>
          <p>
            This React frontend is the homepage for the Student Survey
            application. Use the button below to go to the survey form and
            submit your feedback.
          </p>
        </header>

        <main className="content">
          <section className="section">
            <h2>About This Page</h2>
            <p>
              Hi, my name is Ahmed A, and this is my website for SWE645. This
              frontend connects to a FastAPI backend that stores survey data in
              a database and lets it be retrieved later.
            </p>
          </section>

          <section className="section">
            <h2>Quick Highlights</h2>
            <div className="highlight-grid">
              <div className="highlight">
                <div className="highlight-title">Course</div>
                <p>SWE645 - Software Engineering for the World Wide Web</p>
              </div>
              <div className="highlight">
                <div className="highlight-title">Frontend</div>
                <p>React application built from the original static HTML pages</p>
              </div>
              <div className="highlight">
                <div className="highlight-title">Backend</div>
                <p>FastAPI + database persistence already tested with Postman</p>
              </div>
            </div>
          </section>

          <section className="cta-row">
            <div className="cta-copy">
              <h2>Student Survey</h2>
              <p>Continue to the survey page to submit feedback.</p>
            </div>
            <button className="button-link" onClick={onGoToSurvey}>
              Go to Student Survey →
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

function SurveyForm({ onBackHome }) {
  const [formData, setFormData] = useState(initialFormData);
  const [likedMost, setLikedMost] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleCheckboxChange(option) {
    setLikedMost((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  }

  function handleReset() {
    setFormData(initialFormData);
    setLikedMost([]);
    setStatusMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    const payload = {
      ...formData,
      liked_most: likedMost.join(",")
    };

    try {
      const response = await fetch(`${API_BASE}/surveys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to submit survey");
      }

      const savedSurvey = await response.json();
      setStatusMessage(`Survey submitted successfully (ID: ${savedSurvey.id})`);
      setFormData(initialFormData);
      setLikedMost([]);
    } catch (error) {
      setErrorMessage("Error submitting survey. Please check the backend URL/CORS and try again.");
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div className="survey-card">
        <div className="hero">
          <h1>Student Survey</h1>
          <p>Brought to you by Ahmed A, SWE645 Spring &apos;26</p>
        </div>

        <div className="content">
          <div className="toolbar">
            <button className="back-link-btn" onClick={onBackHome}>
              ← Back to home page
            </button>
          </div>

          {statusMessage && <div className="success-box">{statusMessage}</div>}
          {errorMessage && <div className="error-box">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <section className="section">
              <h2>Your Information</h2>
              <div className="grid">
                <div className="field">
                  <label htmlFor="first_name">First name</label>
                  <input id="first_name" name="first_name" type="text" placeholder="Enter your first name" value={formData.first_name} onChange={handleChange} required />
                </div>

                <div className="field">
                  <label htmlFor="last_name">Last name</label>
                  <input id="last_name" name="last_name" type="text" placeholder="Enter your last name" value={formData.last_name} onChange={handleChange} required />
                </div>

                <div className="field full">
                  <label htmlFor="street_address">Street address</label>
                  <input id="street_address" name="street_address" type="text" placeholder="123 Main Street" value={formData.street_address} onChange={handleChange} required />
                </div>

                <div className="field">
                  <label htmlFor="city">City</label>
                  <input id="city" name="city" type="text" placeholder="Enter your city" value={formData.city} onChange={handleChange} required />
                </div>

                <div className="field">
                  <label htmlFor="state">State</label>
                  <input id="state" name="state" type="text" placeholder="Enter your state" value={formData.state} onChange={handleChange} required />
                </div>

                <div className="field">
                  <label htmlFor="zip_code">Zip</label>
                  <input id="zip_code" name="zip_code" type="text" placeholder="Zip code" value={formData.zip_code} onChange={handleChange} required />
                </div>

                <div className="field">
                  <label htmlFor="telephone">Telephone number</label>
                  <input id="telephone" name="telephone" type="tel" placeholder="(555) 555-5555" value={formData.telephone} onChange={handleChange} required />
                </div>

                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" name="email" type="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
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
                      <input
                        type="checkbox"
                        checked={likedMost.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                      />
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
                      <input
                        type="radio"
                        name="interest_source"
                        value={option}
                        checked={formData.interest_source === option}
                        onChange={handleChange}
                        required
                      />
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
                  <input id="raffle_numbers" name="raffle_numbers" type="text" placeholder="e.g., 4, 8, 15, 16, 23, 42, ..." value={formData.raffle_numbers} onChange={handleChange} required />
                  <div className="helper">Use commas to separate each number.</div>
                </div>

                <div className="field full">
                  <label htmlFor="comments">Additional comments</label>
                  <textarea id="comments" name="comments" placeholder="Share anything else about your experience..." value={formData.comments} onChange={handleChange} />
                </div>
              </div>
            </section>

            <div className="actions">
              <button className="secondary-btn" type="button" onClick={handleReset}>Cancel</button>
              <button className="primary-btn" type="submit">Submit</button>
            </div>
          </form>

          <div className="footer-note">Thanks for taking a few moments to complete the survey.</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  return page === "home" ? (
    <HomePage onGoToSurvey={() => setPage("survey")} />
  ) : (
    <SurveyForm onBackHome={() => setPage("home")} />
  );
}
