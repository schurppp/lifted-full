import React, { useState } from 'react';
import nutritionData from '../data/nutrition.json';
import { Recipe } from '../types';

const NutritionPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(nutritionData as any);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ name: '', category: 'lunch', calories: '', protein: '', description: '' });

  const filtered = recipes.filter(r => {
    const matchFilter = filter === 'all' || r.category === filter;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const handleAddRecipe = () => {
    if (!newRecipe.name) return;
    const recipe: Recipe = {
      id: 'custom-' + Date.now(),
      name: newRecipe.name,
      category: newRecipe.category as any,
      prepTimeMinutes: 0,
      calories: parseInt(newRecipe.calories) || 0,
      protein: parseInt(newRecipe.protein) || 0,
      carbs: 0,
      fat: 0,
      tags: ['Eigenes Rezept'],
      goal: ['health'],
      difficulty: 'easy',
      servings: 1,
      ingredients: [],
      instructions: [],
      description: newRecipe.description,
      isCustom: true,
    };
    setRecipes(prev => [recipe, ...prev]);
    setShowAddForm(false);
    setNewRecipe({ name: '', category: 'lunch', calories: '', protein: '', description: '' });
  };

  if (selected) {
    return (
      <div className="nutrition-page">
        <button className="btn-outline" onClick={() => setSelected(null)}>← Zurück</button>
        <div className="recipe-detail">
          <div className="recipe-detail-header">
            {selected.isCustom && <span className="custom-badge">Eigenes Rezept</span>}
            <span className="category-badge">{selected.category}</span>
            <h1>{selected.name}</h1>
            <p className="recipe-desc">{selected.description}</p>
          </div>
          <div className="recipe-macros">
            <div className="macro-card">
              <span className="macro-val">{selected.calories}</span>
              <span className="macro-label">kcal</span>
            </div>
            <div className="macro-card protein">
              <span className="macro-val">{selected.protein}g</span>
              <span className="macro-label">Protein</span>
            </div>
            <div className="macro-card carbs">
              <span className="macro-val">{selected.carbs}g</span>
              <span className="macro-label">Kohlenhydrate</span>
            </div>
            <div className="macro-card fat">
              <span className="macro-val">{selected.fat}g</span>
              <span className="macro-label">Fett</span>
            </div>
          </div>
          <div className="recipe-info">
            <span>⏱ {selected.prepTimeMinutes} Min.</span>
            <span>👤 {selected.servings} Person(en)</span>
            <span>💪 {selected.difficulty}</span>
          </div>
          {selected.ingredients.length > 0 && (
            <div className="recipe-section">
              <h3>Zutaten</h3>
              <ul className="ingredients-list">
                {selected.ingredients.map((ing, i) => (
                  <li key={i}><span className="ing-amount">{ing.amount}</span> {ing.name}</li>
                ))}
              </ul>
            </div>
          )}
          {selected.instructions.length > 0 && (
            <div className="recipe-section">
              <h3>Zubereitung</h3>
              <ol className="instructions-list">
                {selected.instructions.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
          )}
          <div className="recipe-tags">
            {selected.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nutrition-page">
      <div className="page-header">
        <div>
          <h1>Ernährung</h1>
          <p>Gesunde Rezepte für deine Ziele</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>+ Rezept hinzufügen</button>
      </div>

      {showAddForm && (
        <div className="add-recipe-form">
          <h3>Neues Rezept</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input value={newRecipe.name} onChange={e => setNewRecipe(p => ({...p, name: e.target.value}))} placeholder="Rezeptname" />
            </div>
            <div className="form-group">
              <label>Kategorie</label>
              <select value={newRecipe.category} onChange={e => setNewRecipe(p => ({...p, category: e.target.value}))}>
                <option value="breakfast">Frühstück</option>
                <option value="lunch">Mittagessen</option>
                <option value="dinner">Abendessen</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            <div className="form-group">
              <label>Kalorien (kcal)</label>
              <input type="number" value={newRecipe.calories} onChange={e => setNewRecipe(p => ({...p, calories: e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Protein (g)</label>
              <input type="number" value={newRecipe.protein} onChange={e => setNewRecipe(p => ({...p, protein: e.target.value}))} />
            </div>
          </div>
          <div className="form-group">
            <label>Beschreibung</label>
            <textarea value={newRecipe.description} onChange={e => setNewRecipe(p => ({...p, description: e.target.value}))} rows={3} />
          </div>
          <div className="form-buttons">
            <button className="btn-outline" onClick={() => setShowAddForm(false)}>Abbrechen</button>
            <button className="btn-primary" onClick={handleAddRecipe}>Hinzufügen</button>
          </div>
        </div>
      )}

      <div className="search-filter">
        <input className="search-input" type="text" placeholder="Rezepte suchen..." value={search} onChange={e => setSearch(e.target.value)} />
        <div className="filter-tabs">
          {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map(f => (
            <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'Alle' : f === 'breakfast' ? 'Frühstück' : f === 'lunch' ? 'Mittagessen' : f === 'dinner' ? 'Abendessen' : 'Snack'}
            </button>
          ))}
        </div>
      </div>

      <div className="recipes-grid">
        {filtered.map(recipe => (
          <div key={recipe.id} className="recipe-card" onClick={() => setSelected(recipe)}>
            {recipe.isCustom && <span className="custom-badge">Eigenes</span>}
            <div className="recipe-category">{recipe.category}</div>
            <h3>{recipe.name}</h3>
            <p className="recipe-preview">{recipe.description}</p>
            <div className="recipe-quick-macros">
              <span>🔥 {recipe.calories} kcal</span>
              <span>💪 {recipe.protein}g</span>
              <span>⏱ {recipe.prepTimeMinutes} min</span>
            </div>
            <div className="recipe-tags">
              {recipe.tags.slice(0, 3).map(tag => <span key={tag} className="tag small">{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionPage;
