import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FitnessGoal, ExperienceLevel, LearningStyle } from '../types';

const STEPS = [
  'Persönliche Daten',
  'Fitnessziele',
  'Trainingspräferenzen',
  'Lerninteressen',
];

interface OnboardingData {
  age: string;
  weight: string;
  height: string;
  gender: string;
  goal: string;
  fitnessLevel: string;
  daysPerWeek: string;
  equipment: string;
  subjects: string[];
  learningStyle: string;
}

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    age: '',
    weight: '',
    height: '',
    gender: '',
    goal: '',
    fitnessLevel: '',
    daysPerWeek: '',
    equipment: '',
    subjects: [],
    learningStyle: '',
  });
  const { updateProfile, setHasCompletedOnboarding } = useAuth();
  const navigate = useNavigate();

  const update = (key: keyof OnboardingData, value: string) =>
    setData(prev => ({ ...prev, [key]: value }));

  const toggleSubject = (subj: string) => {
    setData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subj)
        ? prev.subjects.filter(s => s !== subj)
        : [...prev.subjects, subj],
    }));
  };

  const handleFinish = () => {
    updateProfile({
      age: parseInt(data.age),
      weight: parseFloat(data.weight),
      height: parseFloat(data.height),
      gender: data.gender as 'male' | 'female' | 'other',
      goal: data.goal as FitnessGoal,
      experienceLevel: data.fitnessLevel as ExperienceLevel,
      fitnessLevel: data.fitnessLevel as ExperienceLevel,
      trainingDaysPerWeek: parseInt(data.daysPerWeek),
      daysPerWeek: parseInt(data.daysPerWeek),
      equipment: [data.equipment],
      subjects: data.subjects,
      learningStyle: data.learningStyle as LearningStyle,
    });
    setHasCompletedOnboarding(true);
    navigate('/dashboard');
  };

  return (
    <div className="onboarding-page">
      {/* Progress bar */}
      <div className="onboarding-progress">
        {STEPS.map((s, i) => (
          <div key={s} className={`progress-step ${i <= step ? 'active' : ''}`}>
            <div className="step-number">{i < step ? '✓' : i + 1}</div>
            <span className="step-label">{s}</span>
          </div>
        ))}
      </div>

      <div className="onboarding-card">
        {step === 0 && (
          <div className="onboarding-step">
            <h2>Persönliche Daten</h2>
            <p>Damit wir Lifted perfekt auf dich anpassen können.</p>
            <div className="form-group">
              <label>Alter</label>
              <input type="number" value={data.age} onChange={e => update('age', e.target.value)} placeholder="z.B. 22" />
            </div>
            <div className="form-group">
              <label>Gewicht (kg)</label>
              <input type="number" value={data.weight} onChange={e => update('weight', e.target.value)} placeholder="z.B. 75" />
            </div>
            <div className="form-group">
              <label>Größe (cm)</label>
              <input type="number" value={data.height} onChange={e => update('height', e.target.value)} placeholder="z.B. 178" />
            </div>
            <div className="form-group">
              <label>Geschlecht</label>
              <select value={data.gender} onChange={e => update('gender', e.target.value)}>
                <option value="">Wählen...</option>
                <option value="male">Männlich</option>
                <option value="female">Weiblich</option>
                <option value="other">Divers</option>
              </select>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="onboarding-step">
            <h2>Fitnessziele</h2>
            <p>Was möchtest du erreichen?</p>
            <div className="goal-grid">
              {([
                { val: 'muscle', label: 'Muskelaufbau', icon: '💪' },
                { val: 'fat-loss', label: 'Fettabbau', icon: '🔥' },
                { val: 'endurance', label: 'Ausdauer', icon: '🏃' },
                { val: 'health', label: 'Gesundheit', icon: '❤️' },
              ] as { val: FitnessGoal; label: string; icon: string }[]).map(g => (
                <div
                  key={g.val}
                  className={`goal-card ${data.goal === g.val ? 'selected' : ''}`}
                  onClick={() => update('goal', g.val)}
                >
                  <span className="goal-icon">{g.icon}</span>
                  <span className="goal-label">{g.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <h2>Trainingspräferenzen</h2>
            <div className="form-group">
              <label>Fitness-Level</label>
              <select value={data.fitnessLevel} onChange={e => update('fitnessLevel', e.target.value)}>
                <option value="">Wählen...</option>
                <option value="beginner">Anfänger</option>
                <option value="intermediate">Fortgeschritten</option>
                <option value="advanced">Profi</option>
              </select>
            </div>
            <div className="form-group">
              <label>Trainingstage pro Woche</label>
              <select value={data.daysPerWeek} onChange={e => update('daysPerWeek', e.target.value)}>
                <option value="">Wählen...</option>
                {[2, 3, 4, 5, 6].map(d => (
                  <option key={d} value={d}>{d} Tage</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Ausrüstung</label>
              <select value={data.equipment} onChange={e => update('equipment', e.target.value)}>
                <option value="">Wählen...</option>
                <option value="gym">Fitnessstudio</option>
                <option value="home">Zuhause (Grundausstattung)</option>
                <option value="bodyweight">Nur Körpergewicht</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-step">
            <h2>Lerninteressen</h2>
            <p>Welche Fächer möchtest du in den Trainingspausen lernen?</p>
            <div className="subject-grid">
              {['Mathematik', 'Programmierung', 'BWL', 'Englisch', 'Physik', 'Statistik', 'Datenbanken', 'Netzwerke'].map(subj => (
                <button
                  key={subj}
                  className={`subject-btn ${data.subjects.includes(subj) ? 'selected' : ''}`}
                  onClick={() => toggleSubject(subj)}
                >
                  {subj}
                </button>
              ))}
            </div>
            <div className="form-group">
              <label>Lernstil</label>
              <select value={data.learningStyle} onChange={e => update('learningStyle', e.target.value)}>
                <option value="">Wählen...</option>
                <option value="visual">Visuell (Videos, Bilder)</option>
                <option value="reading">Lesen (Texte, Karten)</option>
                <option value="mixed">Gemischt</option>
              </select>
            </div>
          </div>
        )}

        <div className="onboarding-buttons">
          {step > 0 && (
            <button className="btn-outline" onClick={() => setStep(step - 1)}>Zurück</button>
          )}
          {step < STEPS.length - 1 ? (
            <button className="btn-primary" onClick={() => setStep(step + 1)}>Weiter</button>
          ) : (
            <button className="btn-primary" onClick={handleFinish}>Los geht's!</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
