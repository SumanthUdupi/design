'use client';
import { useState, useRef } from 'react';
import { useAchievements } from './AchievementProvider';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [message, setMessage] = useState('');
  const { unlock } = useAchievements() || {};
  const [hiddenFound, setHiddenFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      setMessage('');
    }, 1500);
  };

  const handleHiddenClick = () => {
      if (!hiddenFound) {
          setHiddenFound(true);
          try {
              // Assuming a generic easter egg achievement for finding hidden things
              unlock && unlock('hidden-friend');
          } catch(e) {}
      }
  }

  return (
    <section id="contact" style={{ padding: '80px 0', position: 'relative' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-fraunces, serif)', fontSize: '36px', marginBottom: '16px', textAlign: 'center' }}>
          Let's Create Something Together
        </h2>
        <p style={{ textAlign: 'center', marginBottom: '48px', fontSize: '18px', color: 'var(--warm-brown)' }}>
          Whether you have a project in mind, a question about my work, or just want to say hello, I'd love to hear from you.
        </p>

        {status === 'success' ? (
          <div style={{
              padding: 40,
              background: 'var(--warm-white)',
              borderRadius: 12,
              textAlign: 'center',
              animation: 'fadeIn 0.5s ease'
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h3 style={{ fontFamily: 'var(--font-fraunces, serif)', fontSize: 24 }}>Message sent!</h3>
            <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
            <button
                onClick={() => setStatus('idle')}
                style={{
                    marginTop: 24,
                    background: 'transparent',
                    border: '2px solid var(--warm-brown)',
                    color: 'var(--warm-brown)',
                    padding: '12px 24px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 500
                }}
            >
                Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <style jsx>{`
              .form-group {
                position: relative;
              }
              label {
                position: absolute;
                left: 16px;
                top: 16px;
                color: var(--warm-brown);
                pointer-events: none;
                transition: 0.2s ease;
                opacity: 0.7;
              }
              input, textarea {
                width: 100%;
                padding: 16px;
                background: var(--warm-white);
                border: 2px solid transparent;
                border-radius: 8px;
                font-family: var(--font-inter, sans-serif);
                font-size: 16px;
                color: var(--deep-charcoal);
                transition: all 0.2s;
              }
              input:focus, textarea:focus {
                outline: none;
                border-color: var(--sage-green);
                box-shadow: 0 0 0 4px rgba(139, 157, 131, 0.1);
              }
              input:focus + label,
              input:not(:placeholder-shown) + label,
              textarea:focus + label,
              textarea:not(:placeholder-shown) + label {
                transform: translate(-4px, -26px) scale(0.85);
                background: transparent; /* Or var(--warm-cream) if needed to mask */
                opacity: 1;
                color: var(--deep-charcoal);
                font-weight: 600;
              }
              button[type="submit"] {
                background: var(--deep-charcoal);
                color: var(--warm-cream);
                padding: 16px;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
              }
              button[type="submit"]:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(58, 54, 50, 0.2);
              }
              button[type="submit"]:disabled {
                opacity: 0.7;
                cursor: not-allowed;
              }
            `}</style>

            <div className="form-group">
              <input type="text" id="name" placeholder=" " required />
              <label htmlFor="name">Your Name</label>
            </div>

            <div className="form-group">
              <input type="email" id="email" placeholder=" " required />
              <label htmlFor="email">Email Address</label>
            </div>

            <div className="form-group">
              <textarea
                id="message"
                placeholder=" "
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{resize: 'vertical', minHeight: 150}}
              />
              <label htmlFor="message">Tell me about your project...</label>
              <div style={{ textAlign: 'right', fontSize: 12, marginTop: 4, opacity: 0.6 }}>
                 {message.length > 50 && "Taking your time - I appreciate thoughtful messages ☺️"}
              </div>
            </div>

            <button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message ✉️'}
            </button>
          </form>
        )}

        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center', gap: 32 }}>
             {/* Social Links */}
             <a href="mailto:hello@example.com" style={{ color: 'var(--warm-brown)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>Email</span>
             </a>
             <a href="#" style={{ color: 'var(--warm-brown)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>LinkedIn</span>
             </a>
             <a href="#" style={{ color: 'var(--warm-brown)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>GitHub</span>
             </a>
        </div>
      </div>

      {/* Contact Easter Egg - Hidden Friend */}
      <div
        onClick={handleHiddenClick}
        style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            width: 24,
            height: 24,
            opacity: 0.05, // Very subtle
            cursor: 'pointer',
            transition: 'opacity 0.3s'
        }}
        className="hidden-friend"
        title="?"
      >
          👾
      </div>

      {hiddenFound && (
          <div style={{
              position: 'absolute',
              bottom: 60,
              right: 20,
              background: 'var(--warm-white)',
              padding: 16,
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              maxWidth: 200,
              animation: 'popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
              <p style={{fontSize: 14, margin: 0}}>You found me! Thanks for paying attention to the details. 👋</p>
          </div>
      )}
    </section>
  );
}
