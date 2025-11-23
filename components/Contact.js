'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formState, setFormState] = useState('idle'); // idle, submitting, success, error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [easterEggFound, setEasterEggFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');

    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      // Trigger confetti or similar effect here if desired
    }, 1500);
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 48 }}>Let&apos;s Create Something Together</h2>

        <AnimatePresence mode="wait">
          {formState === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center',
                padding: 60,
                background: 'var(--warm-white)',
                borderRadius: 16,
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 24 }}>🎉</div>
              <h3 style={{ fontSize: 24, marginBottom: 16 }}>Message Sent!</h3>
              <p>Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
              <button
                onClick={() => setFormState('idle')}
                className="btn btn-outline"
                style={{ marginTop: 24 }}
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              style={{
                background: 'var(--warm-white)',
                padding: 40,
                borderRadius: 16,
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(107, 93, 79, 0.05)'
              }}
            >
              <div style={{ marginBottom: 32 }}>
                <label
                  htmlFor="message"
                  style={{ display: 'block', marginBottom: 12, fontWeight: 600, color: 'var(--warm-brown)' }}
                >
                  Tell me about your project, idea, or just say hello...
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="I'm looking to build..."
                  style={{
                    width: '100%',
                    padding: 16,
                    borderRadius: 8,
                    border: '2px solid rgba(107, 93, 79, 0.2)',
                    background: 'var(--warm-cream)',
                    fontFamily: 'inherit',
                    fontSize: 16,
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--sage-green)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(107, 93, 79, 0.2)'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
                <div>
                  <label
                    htmlFor="name"
                    style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}
                  >
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: 12,
                      borderRadius: 8,
                      border: '2px solid rgba(107, 93, 79, 0.2)',
                      background: 'var(--warm-cream)',
                      fontSize: 16
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600 }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: 12,
                      borderRadius: 8,
                      border: '2px solid rgba(107, 93, 79, 0.2)',
                      background: 'var(--warm-cream)',
                      fontSize: 16
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: 14, opacity: 0.7, margin: 0 }}>
                  I respect your privacy. No spam, ever.
                </p>
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="btn btn-primary"
                  style={{ minWidth: 140 }}
                >
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div style={{ marginTop: 64, textAlign: 'center' }}>
          <p style={{ marginBottom: 24 }}>Or connect with me on:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
            {['Email', 'LinkedIn', 'GitHub'].map((social) => (
              <a
                key={social}
                href="#"
                className="social-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: '2px solid var(--warm-brown)',
                  color: 'var(--warm-brown)',
                  transition: 'all 0.2s'
                }}
              >
                {/* Icons would go here */}
                <span style={{ fontSize: 12 }}>{social[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Hidden Easter Egg in Corner */}
      <div
        style={{ position: 'absolute', bottom: 20, right: 20, opacity: 0.3, cursor: 'help' }}
        onClick={() => setEasterEggFound(true)}
        title="?"
      >
        <span style={{ fontSize: 20 }}>🌱</span>
      </div>

      {easterEggFound && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            bottom: 60,
            right: 20,
            background: 'var(--deep-charcoal)',
            color: 'var(--warm-cream)',
            padding: 16,
            borderRadius: 8,
            maxWidth: 240,
            fontSize: 14,
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>You found me!</strong> 👋<br/>
            I hide in corners sometimes. Thanks for paying attention to the details.
          </p>
          <button
            onClick={() => setEasterEggFound(false)}
            style={{
              marginTop: 8,
              background: 'transparent',
              border: '1px solid var(--warm-cream)',
              color: 'inherit',
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: 12,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </motion.div>
      )}
    </section>
  );
}
