import React, { useState, useEffect } from 'react';
import Sidenav from '../components/Sidenav';
import axios from 'axios';
import { connect } from 'react-redux';
import InternshipApplication from './InternshipApplication'; // Import InternshipApplication component

const internships = [
  {
    id: 1,
    company: 'TechCorp',
    position: 'Software Developer Intern',
    location: 'San Francisco, CA',
    duration: '3 months',
  },
  {
    id: 2,
    company: 'Web Solutions',
    position: 'Frontend Developer Intern',
    location: 'Remote',
    duration: '2 months',
  },
  {
    id: 3,
    company: 'Data Innovations',
    position: 'Data Analyst Intern',
    location: 'New York, NY',
    duration: '6 months',
  },
  {
    id: 4,
    company: 'Design Hub',
    position: 'UI/UX Intern',
    location: 'Los Angeles, CA',
    duration: '3 months',
  },
  {
    id: 5,
    company: 'CyberSecure',
    position: 'Cybersecurity Intern',
    location: 'Austin, TX',
    duration: '4 months',
  },
  {
    id: 6,
    company: 'FinTech Solutions',
    position: 'Finance Intern',
    location: 'Chicago, IL',
    duration: '2 months',
  },
  {
    id: 7,
    company: 'HealthTech',
    position: 'Healthcare IT Intern',
    location: 'Boston, MA',
    duration: '3 months',
  },
  {
    id: 8,
    company: 'Global Marketing',
    position: 'Marketing Intern',
    location: 'Remote',
    duration: '2 months',
  },
  {
    id: 9,
    company: 'AI Innovations',
    position: 'Machine Learning Intern',
    location: 'Seattle, WA',
    duration: '5 months',
  },
  {
    id: 10,
    company: 'Green Energy Co.',
    position: 'Sustainability Intern',
    location: 'Denver, CO',
    duration: '3 months',
  },
  {
    id: 11,
    company: 'E-Commerce Solutions',
    position: 'Product Management Intern',
    location: 'Remote',
    duration: '4 months',
  },
  {
    id: 12,
    company: 'Media Group',
    position: 'Content Creation Intern',
    location: 'Miami, FL',
    duration: '2 months',
  },
  {
    id: 13,
    company: 'TechPioneers',
    position: 'Research and Development Intern',
    location: 'San Diego, CA',
    duration: '6 months',
  },
  {
    id: 14,
    company: 'Blockchain Solutions',
    position: 'Blockchain Development Intern',
    location: 'Remote',
    duration: '3 months',
  },
  {
    id: 15,
    company: 'ElderCare Services',
    position: 'Social Work Intern',
    location: 'Philadelphia, PA',
    duration: '5 months',
  },
];


const JobApplications = ({ auth }) => {
  const [userEmail, setUserEmail] = useState('');
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    if (auth.user && auth.user.emailId) {
      setUserEmail(auth.user.emailId);
    }
  }, [auth]);

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  };

  const sidenavStyle = {
    width: '20%',
    position: 'fixed',
    height: '100vh',
    overflowY: 'auto',
    backgroundColor: '#f1f1f1',
  };

  const contentStyle = {
    marginLeft: '20%',
    padding: '20px',
    height: '100vh',
    overflowY: 'auto',
  };

  const internshipListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  };

  const internshipCardStyle = {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '300px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px',
  };

  // Handle apply button click
  const handleApply = (internship) => {
    setSelectedInternship(internship); // Store the selected internship
  };

  return (
    <div style={containerStyle}>
      <div style={sidenavStyle}>
        <Sidenav activeComponent="3" />
      </div>

      <div style={contentStyle}>
        <h1>Internship Opportunities</h1>
        {/* <h4>Email: {userEmail || 'Loading...'}</h4> */}
        <div style={internshipListStyle}>
          {internships.map((internship) => (
            <div key={internship.id} style={internshipCardStyle}>
              <h2>{internship.company}</h2>
              <p>Position: {internship.position}</p>
              <p>Location: {internship.location}</p>
              <p>Duration: {internship.duration}</p>
              <button
                style={buttonStyle}
                onClick={() => handleApply(internship)}
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        {/* Render Internship Application form only if an internship is selected */}
        {selectedInternship && (
          <InternshipApplication
            internship={selectedInternship}
            userEmail={userEmail}
          />
        )}
      </div>
    </div>
  );
};

export default connect(
  (store) => ({
    auth: store.auth,
  }),
  null
)(JobApplications);
