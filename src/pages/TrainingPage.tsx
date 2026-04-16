import React, { useState, useEffect, useMemo } from 'react';
import trainingData from '../data/training.json';
import learningData from '../data/learning.json';
import { useAuth } from '../context/AuthContext';
import { TrainingPlan, WorkoutDay, Exercise, LearningDeck } from '../types';

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
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [randomCardIdx, setRandomCardIdx] = useState(0);

  const plans: TrainingPlan[] = trainingData as TrainingPlan[];
  const decks: LearningDeck[] = learningData as LearningDeck[];

  // Alle verfügbaren Flashcards aus learning.json sammeln
  const allCards = useMemo(() => {
    return decks.flatMap(deck =>
      (deck.cards || []).map(card => ({ ...card, deckTitle: deck.title }))
    );
  }, [decks]);

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
      setFlashcardFlipped(false);
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
    // Zufällige Karteikarte für die Pause auswählen
    if (allCards.length > 0) {
      setRandomCardIdx(Math.floor(Math.random() * allCards.length));
    }
    setFlashcardFlipped(false);
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
    const flashcard = allCards[randomCardIdx];

    return (
      <div className="training-active">
        <button className="btn-back" onClick={() => setView('plans')}>← Beenden</button>
        <h2>{selectedPlan.name}</h2>
        <div className="active-day-badge">{activeDay.day}</div>
        <div className="exercise-progress">
          {currentExIdx + 1} / {activeDay.exercises.length} Übungen
        </div>

        {isResting ? (
          <div className="rest-screen">
            <div className="rest-timer">
              <span className="timer-value">{restTimer}</span>
              <span className="timer-label"> Sekunden Pause</span>
            </div>
            {showFlashcard && flashcard && (
              <div className="flashcard-widget" onClick={() => setFlashcardFlipped(!flashcardFlipped)}>
                <div className="flashcard-header">🧠 Lernzeit! - {flashcard.deckTitle}</div>
                <div className="flashcard-body">
                  <p className="flashcard-front">{flashcard.front}</p>
                  {flashcard.hint && !flashcardFlipped && (
                    <span className="flashcard-hint">Tipp: {flashcard.hint}</span>
                  )}
                  {flashcardFlipped && (
                    <p className="flashcard-back">{flashcard.back}</p>
                  )}
                </div>
                {!flashcardFlipped ? (
                  <button className="btn-outline" onClick={() => setFlashcardFlipped(true)}>Antwort zeigen</button>
                ) : (
                  <p className="flashcard-tap">✓ Antwort: {flashcard.back}</p>
                )}
              </div>
            )}
            <button
              className="btn-outline skip-rest"
              onClick={() => { setIsResting(false); setRestTimer(null); setShowFlashcard(false); }}
            >
              Pause überspringen
            </button>
          </div>
        ) : (
          <div className="exercise-card">
            <div className="exercise-tags">
              <span className="tag">{exercise.muscleGroup}</span>
              <span className="tag">{exercise.difficulty}</span>
            </div>
            <h3>{exercise.name}</h3>
            <div className="exercise-stats">
              <div><span className="stat-num">{exercise.sets}</span><span className="stat-lbl">Sätze</span></div>
              <div><span className="stat-num">{exercise.reps}</span><span className="stat-lbl">Wdh.</span></div>
              <div><span className="stat-num">{currentSet}/{exercise.sets}</span><span className="stat-lbl">Aktueller Satz</span></div>
            </div>
            <p>{exercise.description}</p>
            {exercise.tips?.map((tip, i) => <p key={i} className="tip">💡 {tip}</p>)}
            <button className="btn-primary complete-set" onClick={() => completeSet(exercise)}>
              Satz abschließen
            </button>
          </div>
        )}

        <div className="exercise-list">
          <h4>Alle Übungen</h4>
          {activeDay.exercises.map((ex, i) => (
            <div key={ex.id} className={`exercise-item ${i === currentExIdx ? 'current' : i < currentExIdx ? 'done' : ''}`}>
              <span>{i + 1}</span>
              <span>{ex.name}</span>
              <span>{ex.sets}x{ex.reps}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="training-page">
      <div className="page-hero">
        <h1>Training</h1>
        <p>Wähle deinen Trainingsplan und leg los</p>
      </div>

      <div className="filter-bar">
        {['all', 'beginner', 'intermediate', 'advanced', 'muscle', 'fat_loss'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'Alle' : f === 'fat_loss' ? 'Fettabbau' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.map(plan => (
        <div key={plan.id} className="plan-card">
          <div className="plan-header">
            <h3>{plan.name}</h3>
            <div className="plan-tags">
              <span className="tag">{plan.level}</span>
              <span className="tag">{plan.goal}</span>
              <span className="tag">{plan.durationWeeks}W</span>
            </div>
          </div>
          <p>{plan.description}</p>
          <div className="plan-meta">
            <span>📅 {plan.daysPerWeek} Tage/Woche</span>
            <span>⏱ {plan.days[0]?.durationMinutes} Min./Einheit</span>
          </div>
          <div className="day-list">
            {plan.days.map((day, i) => (
              <button key={i} className="day-btn" onClick={() => startWorkout(plan, day)}>
                <span>{day.day}</span>
                <span>{day.focus}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainingPage;
