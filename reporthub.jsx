import React from 'react';
import './reporthub.css';
import { Navbar, Footer } from './App';
function ReportHub() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="report-box">
          <h1>Report an Issue</h1>
          <p>Help us take action by reporting cyberbullying, fake news, or privacy violations.</p>
          <form>
            <div className="form-group">
              <label>Category</label>
              <select>
                <option>Cyberbullying</option>
                <option>Fake News</option>
                <option>Privacy Violation</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea rows="4" placeholder="Describe the issue..."></textarea>
            </div>

            <div className="form-group">
              <label>Your Email (Optional)</label>
              <input type="email" placeholder="your.email@example.com" />
            </div>

            <button type="submit" className="btn">Submit Report</button>
          </form>
        </div>
      </div>
    <Footer />
    </>
  );
}

export default ReportHub;
