import React, { useState } from 'react';
import {
  Sun,
  Droplets,
  Sprout,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const PlantCare = ({ onAskAI }) => {
  const [activeTab, setActiveTab] = useState('tulsi');

  const troubleshootingCases = [
    {
      symptom: 'Leaves turning pale or yellow',
      causes: 'Overwatering, root suffocation, or poor pot drainage holes.',
      cure: 'Pause watering immediately. Let the top 2 inches dry out and ensure the pot drains freely.',
      prompt: 'My plant leaves are turning yellow. How do I save it?'
    },
    {
      symptom: 'Brown, crispy leaf edges or tips',
      causes: 'Low room humidity, dry air from heating/AC, or high chlorine in tap water.',
      cure: 'Mist the foliage lightly, group plants together to raise humidity, or use filtered water.',
      prompt: 'Why are my plant leaf tips turning brown and crispy?'
    },
    {
      symptom: 'Entire plant drooping or wilting',
      causes: 'Either extreme dehydration or root rot from prolonged waterlogging.',
      cure: 'Check soil moisture: if bone dry, give a thorough soak. If soggy, inspect roots for rot.',
      prompt: 'My indoor plant is drooping and wilted. How should I diagnose it?'
    },
    {
      symptom: 'White powdery spots on leaves',
      causes: 'Powdery mildew fungus caused by stagnant air and damp evening leaves.',
      cure: 'Wipe leaves clean, improve airflow, and spray organic neem oil solution.',
      prompt: 'How to treat powdery mildew or white spots on plant leaves?'
    }
  ];

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section className="section section-soft" style={{ padding: '60px 0 40px' }}>
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">Master Gardening Guide</span>
            <h1 className="section-title">Comprehensive Plant Care Manual</h1>
            <p className="section-desc">
              Master the fundamentals of lighting, hydration, organic fertilizers, and seasonal repotting to keep your plants thriving year-round.
            </p>
          </div>
        </div>
      </section>

      {/* Deep-Dive Plant Care Spotlight (Tulsi, Snake Plant, Aloe) */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <button
              className={`filter-pill ${activeTab === 'tulsi' ? 'active' : ''}`}
              onClick={() => setActiveTab('tulsi')}
            >
              🌿 Tulsi (Holy Basil) Guide
            </button>
            <button
              className={`filter-pill ${activeTab === 'snake' ? 'active' : ''}`}
              onClick={() => setActiveTab('snake')}
            >
              🗡️ Snake Plant Guide
            </button>
            <button
              className={`filter-pill ${activeTab === 'aloe' ? 'active' : ''}`}
              onClick={() => setActiveTab('aloe')}
            >
              🪴 Aloe Vera Care
            </button>
          </div>

          {/* Tulsi Guide Details */}
          {activeTab === 'tulsi' && (
            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '40px',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-subtle)',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: '40px',
                alignItems: 'center'
              }}
            >
              <div>
                <span className="section-badge">Featured Sacred Herb</span>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '14px', color: 'var(--primary-forest)' }}>
                  Tulsi (Holy Basil) Care Protocol
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1rem', lineHeight: '1.6' }}>
                  Tulsi is celebrated in traditional Ayurveda for its medicinal aroma, adaptogenic leaves, and spiritual presence. Follow this 4-step regimen for bushy, vibrant growth.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--primary-green)', marginTop: '2px' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-forest)' }}>Sunlight:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        Provide 4 to 6 hours of direct morning or midday sun. Without ample sun, stems turn leggy and sparse.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--primary-green)', marginTop: '2px' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-forest)' }}>Watering:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        Water daily during hot summer months and alternate days in monsoon/winter. Keep soil lightly moist, never muddy.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--primary-green)', marginTop: '2px' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-forest)' }}>Pruning & Pinching:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        Pinch off seed clusters (manjaris) regularly. This redirects all plant energy into creating luscious new leaves.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--primary-green)', marginTop: '2px' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-forest)' }}>Soil & Nourishment:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        Use rich organic loam with vermicompost. Apply organic neem cake fertilizer once a month.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '28px' }}>
                  <button
                    className="btn-primary"
                    onClick={() => onAskAI('How do I revive a dying Tulsi plant with pest issues or yellow leaves?')}
                  >
                    <Sparkles size={16} />
                    <span>Ask AI About Tulsi Emergencies</span>
                  </button>
                </div>
              </div>

              <div>
                <img
                  src="https://images.unsplash.com/photo-1632121055175-5b6f3ce77aee?auto=format&fit=crop&w=800&q=80"
                  alt="Healthy Tulsi Plant"
                  style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}
                />
              </div>
            </div>
          )}

          {/* Snake Plant Guide Details */}
          {activeTab === 'snake' && (
            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '40px',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-subtle)',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: '40px',
                alignItems: 'center'
              }}
            >
              <div>
                <span className="section-badge">NASA Biofilter</span>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '14px', color: 'var(--primary-forest)' }}>
                  Snake Plant (Sansevieria) Care
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1rem', lineHeight: '1.6' }}>
                  Dubbed "Mother-in-law's Tongue", this architectural specimen converts CO2 into fresh oxygen while you sleep.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--primary-green)', marginTop: '2px' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-forest)' }}>Low Light Adaptability:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        Can survive in windowless bathrooms, dark basement bedrooms, or sun-drenched balconies.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--primary-green)', marginTop: '2px' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-forest)' }}>Minimal Hydration:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        Water once every 2 to 3 weeks in summer, and once a month in winter. Never let the crown sit in water.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--primary-green)', marginTop: '2px' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-forest)' }}>Leaf Dusting:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        Wipe the thick upright leaves with a microfiber cloth every month to clear airborne dust.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '28px' }}>
                  <button
                    className="btn-primary"
                    onClick={() => onAskAI('Can I propagate a Snake Plant from leaf cuttings in water?')}
                  >
                    <Sparkles size={16} />
                    <span>Ask AI About Snake Plant Propagation</span>
                  </button>
                </div>
              </div>

              <div>
                <img
                  src="https://images.unsplash.com/photo-1593691509543-c55fb32a36d5?auto=format&fit=crop&w=800&q=80"
                  alt="Snake Plant Interior"
                  style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}
                />
              </div>
            </div>
          )}

          {/* Aloe Vera Guide Details */}
          {activeTab === 'aloe' && (
            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '40px',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-subtle)',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: '40px',
                alignItems: 'center'
              }}
            >
              <div>
                <span className="section-badge">First Aid Plant</span>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '14px', color: 'var(--primary-forest)' }}>
                  Aloe Vera Cultivation & Harvesting
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1rem', lineHeight: '1.6' }}>
                  A soothing desert succulent that produces pure natural gel for sunburns, skin hydration, and minor cuts.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--primary-green)', marginTop: '2px' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-forest)' }}>Light Requirement:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        Prefers bright, indirect light near an east or south-facing window. Excessive direct summer sun turns leaves brown.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--primary-green)', marginTop: '2px' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-forest)' }}>The 'Soak & Dry' Method:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        Drench completely until water drains out the bottom, then wait until the pot is 100% dry before next watering.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ color: 'var(--primary-green)', marginTop: '2px' }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--primary-forest)' }}>Gel Extraction:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        Cut a mature bottom leaf near the base. Let the yellow aloin resin drain for 10 minutes before scooping out clear gel.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '28px' }}>
                  <button
                    className="btn-primary"
                    onClick={() => onAskAI('How do I separate Aloe Vera baby pups from the mother plant?')}
                  >
                    <Sparkles size={16} />
                    <span>Ask AI About Aloe Pups</span>
                  </button>
                </div>
              </div>

              <div>
                <img
                  src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80"
                  alt="Aloe Vera Succulent"
                  style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">Diagnostic Doctor</span>
            <h2 className="section-title">Troubleshoot Common Plant Problems</h2>
            <p className="section-desc">
              Plants show symptoms before they suffer irreversible damage. Match your plant's warning signs below:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {troubleshootingCases.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e03131', marginBottom: '12px' }}>
                    <AlertTriangle size={20} />
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-forest)' }}>{item.symptom}</h3>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Likely Cause:</span>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.causes}</p>
                  </div>

                  <div style={{ marginBottom: '18px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-green)', textTransform: 'uppercase' }}>Recommended Cure:</span>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', marginTop: '2px' }}>{item.cure}</p>
                  </div>
                </div>

                <button
                  style={{
                    fontSize: '0.82rem',
                    padding: '8px 14px',
                    background: 'var(--accent-pale)',
                    color: 'var(--primary-forest)',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onClick={() => onAskAI(item.prompt)}
                >
                  <Sparkles size={14} />
                  <span>Consult PlantMate AI</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
