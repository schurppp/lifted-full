import React, { useState } from 'react';
import learningData from '../data/learning.json';
import { LearningDeck } from '../types';

type ViewMode = 'list' | 'flashcards' | 'video';

const LearningPage: React.FC = () => {
  const [decks, setDecks] = useState<LearningDeck[]>(learningData as any);
  const [view, setView] = useState<ViewMode>('list');
  const [activeDeck, setActiveDeck] = useState<LearningDeck | null>(null);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDeck, setNewDeck] = useState({ title: '', subject: '', front: '', back: '' });

  const filtered = filter === 'all' ? decks : decks.filter(d => d.subject === filter || d.type === filter);
  const subjects = Array.from(new Set(decks.map(d => d.subject)));

  const startFlashcards = (deck: LearningDeck) => {
    setActiveDeck(deck);
    setCardIdx(0);
    setFlipped(false);
    setView('flashcards');
  };

  const startVideo = (deck: LearningDeck) => {
    setActiveDeck(deck);
    setView('video');
  };

  const nextCard = () => {
    if (activeDeck && cardIdx < activeDeck.cards!.length - 1) {
      setCardIdx(prev => prev + 1);
      setFlipped(false);
    } else {
      setView('list');
      setActiveDeck(null);
      setCardIdx(0);
    }
  };

  const prevCard = () => {
    if (cardIdx > 0) {
      setCardIdx(prev => prev - 1);
      setFlipped(false);
    }
  };

  const handleAddDeck = () => {
    if (!newDeck.title || !newDeck.front) return;
    const deck: LearningDeck = {
      id: 'custom-' + Date.now(),
      title: newDeck.title,
      subject: newDeck.subject || 'Sonstiges',
      type: 'flashcards',
      difficulty: 'easy',
      tags: ['Eigener Inhalt'],
      description: 'Selbst erstellter Kartenstapel',
      isCustom: true,
      cards: [{ id: 'c1', front: newDeck.front, back: newDeck.back, hint: '' }],
    };
    setDecks(prev => [deck, ...prev]);
    setShowAddForm(false);
    setNewDeck({ title: '', subject: '', front: '', back: '' });
  };

  if (view === 'flashcards' && activeDeck && activeDeck.cards) {
    const card = activeDeck.cards[cardIdx];
    return (
      <div className="flashcard-view">
        <div className="flashcard-header">
          <button className="btn-outline small" onClick={() => setView('list')}>← Beenden</button>
          <h2>{activeDeck.title}</h2>
          <span className="card-progress">{cardIdx + 1} / {activeDeck.cards.length}</span>
        </div>
        <div className="card-progress-bar">
          <div className="card-progress-fill" style={{width: `${((cardIdx + 1) / activeDeck.cards.length) * 100}%`}}></div>
        </div>
        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
          <div className="flashcard-inner">
            <div className="flashcard-front">
              {card.hint && <span className="card-hint">{card.hint}</span>}
              <p className="card-text">{card.front}</p>
              <span className="flip-hint">Tippen zum Umdrehen</span>
            </div>
            <div className="flashcard-back">
              <p className="card-text answer">{card.back}</p>
            </div>
          </div>
        </div>
        <div className="flashcard-controls">
          <button className="btn-outline" onClick={prevCard} disabled={cardIdx === 0}>Zurück</button>
          <button className="btn-primary" onClick={nextCard}>
            {cardIdx < activeDeck.cards.length - 1 ? 'Nächste' : 'Fertig!'}
          </button>
        </div>
      </div>
    );
  }

  if (view === 'video' && activeDeck) {
    return (
      <div className="video-view">
        <button className="btn-outline" onClick={() => setView('list')}>← Zurück</button>
        <h2>{activeDeck.title}</h2>
        <p>{activeDeck.description}</p>
        {activeDeck.videoUrl && (
          <div className="video-container">
            <iframe src={activeDeck.videoUrl} title={activeDeck.title} allowFullScreen />
          </div>
        )}
        {activeDeck.chapters && (
          <div className="chapters">
            <h4>Kapitel</h4>
            {activeDeck.chapters.map((ch, i) => (
              <div key={i} className="chapter-item">
                <span className="chapter-time">{ch.startMinute}:00</span>
                <span>{ch.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="learning-page">
      <div className="page-header">
        <div>
          <h1>Lernen</h1>
          <p>Karteikarten und Videos für dein Studium</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>+ Inhalt hinzufügen</button>
      </div>

      {showAddForm && (
        <div className="add-deck-form">
          <h3>Neuer Kartenstapel</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Titel</label>
              <input value={newDeck.title} onChange={e => setNewDeck(p => ({...p, title: e.target.value}))} placeholder="Stapel-Titel" />
            </div>
            <div className="form-group">
              <label>Fach</label>
              <input value={newDeck.subject} onChange={e => setNewDeck(p => ({...p, subject: e.target.value}))} placeholder="z.B. Mathematik" />
            </div>
            <div className="form-group">
              <label>Erste Karte (Frage)</label>
              <input value={newDeck.front} onChange={e => setNewDeck(p => ({...p, front: e.target.value}))} placeholder="Frage..." />
            </div>
            <div className="form-group">
              <label>Antwort</label>
              <input value={newDeck.back} onChange={e => setNewDeck(p => ({...p, back: e.target.value}))} placeholder="Antwort..." />
            </div>
          </div>
          <div className="form-buttons">
            <button className="btn-outline" onClick={() => setShowAddForm(false)}>Abbrechen</button>
            <button className="btn-primary" onClick={handleAddDeck}>Erstellen</button>
          </div>
        </div>
      )}

      <div className="filter-tabs">
        <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Alle</button>
        <button className={`filter-tab ${filter === 'flashcards' ? 'active' : ''}`} onClick={() => setFilter('flashcards')}>Karteikarten</button>
        <button className={`filter-tab ${filter === 'video' ? 'active' : ''}`} onClick={() => setFilter('video')}>Videos</button>
        {subjects.map(s => (
          <button key={s} className={`filter-tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      <div className="decks-grid">
        {filtered.map(deck => (
          <div key={deck.id} className="deck-card">
            {deck.isCustom && <span className="custom-badge">Eigener Inhalt</span>}
            <div className="deck-type-badge">{deck.type === 'flashcards' ? '🃏 Karteikarten' : '🎥 Video'}</div>
            <h3>{deck.title}</h3>
            <p className="deck-subject">{deck.subject}</p>
            <p className="deck-desc">{deck.description}</p>
            <div className="deck-info">
              {deck.cards && <span>{deck.cards.length} Karten</span>}
              {deck.durationMinutes && <span>{deck.durationMinutes} Min.</span>}
              <span className={`difficulty-badge ${deck.difficulty}`}>{deck.difficulty}</span>
            </div>
            <div className="deck-tags">
              {deck.tags.slice(0, 3).map(t => <span key={t} className="tag small">{t}</span>)}
            </div>
            <button
              className="btn-primary full-width"
              onClick={() => deck.type === 'flashcards' ? startFlashcards(deck) : startVideo(deck)}
            >
              {deck.type === 'flashcards' ? 'Lernen starten' : 'Video ansehen'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;
