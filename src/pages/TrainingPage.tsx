import React, { useState, useEffect } from 'react';
import trainingData from '../data/training.json';
import { useAuth } from '../context/AuthContext';
import { TrainingPlan, WorkoutDay, Exercise } from '../types';

type ViewMode = 'plans' | 'active';

const TrainingPage: React.FC = () => {
  const { profile } = useAuth();
  const [view, setView] = useState<ViewMode>('plans');
  const [filter, setFilter] = useState<string>('all');
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null);
  const [activeDay, setActiveDay] = useState<WorkoutDay | null>(null);
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTimer, setRestTimer] = useState<number | null>(null);
  const [isResting, setIsResting] = useState(false);
  const [showFlashcard, setShowFlashcard] = useState(false);

  const plans: TrainingPlan[] = trainingData as any;

  const filtered = filter === 'all' ? plans : plans.filter(p => p.goal === filter || p.level === filter);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isResting && restTimer !== null && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (restTimer === 0) {
      setIsResting(false);
      setShowFlashcard(false);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const startWorkout = (plan: TrainingPlan, day: WorkoutDay) => {
    setSelectedPlan(plan);
    setActiveDay(day);
    setCurrentExIdx(0);
    setCurrentSet(1);
    setView('active');
  };

  const completeSet = (exercise: Exercise) => {
    setIsResting(true);
    setRestTimer(exercise.restSeconds);
    setShowFlashcard(true);
    if (currentSet < exercise.sets) {
      setCurrentSet(prev => prev + 1);
    } else {
      if (activeDay && currentExIdx < activeDay.exercises.length - 1) {
        setCurrentExIdx(prev => prev + 1);
        setCurrentSet(1);
      }
    }
  };

  if (view === 'active' && activeDay && selectedPlan) {
    const exercise = activeDay.exercises[currentExIdx];
    return (
      <div className="active-workout">
        <div className="workout-header">
          <button className="btn-outline small" onClick={() => setView('plans')}>← Beenden</button>
          <h2>{selectedPlan.name}</h2>
          <span className="day-label">{activeDay.day}</span>
        </div>

        <div className="workout-progress">
          <span>{currentExIdx + 1} / {activeDay.exercises.length} Übungen</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${((currentExIdx) / activeDay.exercises.length) * 100}%`}}></div>
          </div>
        </div>

        {isResting ? (
          <div className="rest-screen">
            <div className="rest-timer">
              <div className="timer-circle">
                <span className="timer-number">{restTimer}</span>
                <span className="timer-label">Sekunden Pause</span>
              </div>
            </div>
            {showFlashcard && (
              <div className="pause-learning">
                <div className="flashcard-mini">
                  <p className="fc-subject">🧠 Lernzeit!</p>
                  <p className="fc-question">Was ist die Ableitung von sin(x)?</p>
                  <button className="btn-outline small" onClick={() => setShowFlashcard(false)}>Antwort zeigen</button>
                </div>
              </div>
            )}
            <button className="btn-outline" onClick={() => { setIsResting(false); setRestTimer(null); }}>Pause überspringen</button>
          </div>
        ) : (
          <div className="exercise-card">
            <div className="exercise-header">
              <span className="muscle-tag">{exercise.muscleGroup}</span>
              <span className="difficulty-tag">{exercise.difficulty}</span>
            </div>
            <h3 className="exercise-name">{exercise.name}</h3>
            <div className="exercise-stats">
              <div className="ex-stat"><span className="ex-stat-val">{exercise.sets}</span><span className="ex-stat-label">Sätze</span></div>
              <div className="ex-stat"><span className="ex-stat-val">{exercise.reps}</span><span className="ex-stat-label">Wdh.</span></div>
              <div className="ex-stat"><span className="ex-stat-val">{currentSet}/{exercise.sets}</span><span className="ex-stat-label">Aktueller Satz</span></div>
            </div>
            <p className="exercise-desc">{exercise.description}</p>
            <div className="exercise-tips">
              {exercise.tips?.map((tip, i) => <span key={i} className="tip-chip">{tip}</span>)}
            </div>
            <button className="btn-primary large full-width" onClick={() => completeSet(exercise)}>
              Satz abschließen
            </button>
          </div>
        )}

        <div className="exercise-list">
          <h4>Alle Übungen</h4>
          {activeDay.exercises.map((ex, i) => (
            <div key={ex.id} className={`exercise-list-item ${i === currentExIdx ? 'current' : ''} ${i < currentExIdx ? 'done' : ''}`}>
              <span className="ex-num">{i + 1}</span>
              <span className="ex-name">{ex.name}</span>
              <span className="ex-info">{ex.sets}x{ex.reps}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="training-page">
      <div className="page-header">
        <h1>Training</h1>
        <p>Wähle deinen Trainingsplan und leg los</p>
      </div>

      <div className="filter-tabs">
        {['all', 'beginner', 'intermediate', 'advanced', 'muscle', 'fat_loss'].map(f => (
          <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'Alle' : f === 'fat_loss' ? 'Fettabbau' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="plans-grid">
        {filtered.map(plan => (
          <div key={plan.id} className="plan-card">
            <div className="plan-header">
              <div>
                <h3>{plan.name}</h3>
                <div className="plan-tags">
                  <span className="tag level-tag">{plan.level}</span>
                  <span className="tag goal-tag">{plan.goal}</span>
                </div>
              </div>
              <div className="plan-duration">{plan.durationWeeks}W</div>
            </div>
            <p className="plan-desc">{plan.description}</p>
            <div className="plan-stats">
              <span>📅 {plan.daysPerWeek} Tage/Woche</span>
              <span>⏱ {plan.days[0]?.durationMinutes} Min./Einheit</span>
            </div>
            <div className="plan-days">
              {plan.days.map((day, i) => (
                <button key={i} className="day-btn" onClick={() => startWorkout(plan, day)}>
                  <span className="day-name">{day.day}</span>
                  <span className="day-focus">{day.focus}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingPage;
