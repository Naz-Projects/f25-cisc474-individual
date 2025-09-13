'use client'
import Navbar from './components/Navbar'
import Link from 'next/link'
import './landing.css'

const Page = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Master Programming with
              <span className="hero-subtitle">AI-Powered Learning</span>
            </h1>
            
            <p className="hero-description">
              Revolutionary Learning Management System that transforms how you learn programming with intelligent feedback, automated testing, and personalized guidance.
            </p>

            <div className="hero-buttons">
              <Link href="/signup" className="btn-primary">
                Get Started Free
              </Link>
              <Link href="#features" className="btn-secondary">
                Explore Features
              </Link>
            </div>

            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Students Learning</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Programming Challenges</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose <span className="gradient-text">Codify Learning</span>?</h2>
            <p className="section-description">
              Experience the future of programming education with our cutting-edge features designed for modern learners.
            </p>
          </div>

          <div className="features-grid">
            {/* AI Assistant Feature */}
            <div className="feature-card">
              <div className="feature-icon ai">🤖</div>
              <h3>AI Assistant</h3>
              <p>
                Get intelligent help with deadline reminders, grade priority alerts, and personalized learning suggestions powered by advanced AI.
              </p>
              <ul className="feature-list">
                <li>Smart deadline tracking</li>
                <li>Grade improvement tips</li>
                <li>Personalized reminders</li>
              </ul>
            </div>

            {/* Automated Testing */}
            <div className="feature-card">
              <div className="feature-icon testing">✅</div>
              <h3>Automated Testing</h3>
              <p>
                Instant feedback with comprehensive test cases that evaluate your code's correctness, efficiency, and edge case handling.
              </p>
              <ul className="feature-list">
                <li>Instant code evaluation</li>
                <li>Hidden test cases</li>
                <li>Performance metrics</li>
              </ul>
            </div>

            {/* Intelligent Feedback */}
            <div className="feature-card">
              <div className="feature-icon feedback">💬</div>
              <h3>Smart Feedback</h3>
              <p>
                Receive detailed, constructive feedback from instructors and AI to help you understand concepts and improve your coding skills.
              </p>
              <ul className="feature-list">
                <li>Detailed code analysis</li>
                <li>Improvement suggestions</li>
                <li>Best practice guidance</li>
              </ul>
            </div>

            {/* Course Management */}
            <div className="feature-card">
              <div className="feature-icon course">📚</div>
              <h3>Course Management</h3>
              <p>
                Organized course structure with assignments, materials, deadlines, and progress tracking all in one place.
              </p>
              <ul className="feature-list">
                <li>Structured curriculum</li>
                <li>Progress tracking</li>
                <li>Resource management</li>
              </ul>
            </div>

            {/* Code Submission */}
            <div className="feature-card">
              <div className="feature-icon submission">💻</div>
              <h3>Smart Submission</h3>
              <p>
                Submit code with AI verification that ensures you've followed all requirements before final submission.
              </p>
              <ul className="feature-list">
                <li>Requirement checking</li>
                <li>Syntax validation</li>
                <li>Multiple attempts</li>
              </ul>
            </div>

            {/* Analytics */}
            <div className="feature-card">
              <div className="feature-icon analytics">📊</div>
              <h3>Progress Analytics</h3>
              <p>
                Track your learning journey with detailed analytics, performance metrics, and personalized insights.
              </p>
              <ul className="feature-list">
                <li>Learning analytics</li>
                <li>Performance insights</li>
                <li>Goal tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Transform Your Programming Journey?</h2>
          <p>
            Join thousands of students who are already mastering programming with our AI-powered platform.
          </p>
          <div className="cta-buttons">
            <Link href="/signup" className="btn-primary">
              Start Learning Today
            </Link>
            <Link href="/demo" className="btn-secondary">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem'}}>
                <div className="logo-icon">C</div>
                <span style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Codify</span>
              </div>
              <p style={{color: '#ccc'}}>
                Empowering the next generation of programmers with AI-powered learning experiences.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="/demo">Demo</Link></li>
                <li><Link href="/api">API</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><Link href="/help">Help Center</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
                <li><Link href="/community">Community</Link></li>
                <li><Link href="/status">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 Codify Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Page