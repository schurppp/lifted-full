// ===== LiftED TypeScript Interfaces =====

// --- User ---
export type FitnessGoal = 'muscle' | 'fat-loss' | 'endurance' | 'health';
export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  weight: number;        // kg
  height: number;        // cm
  gender: 'male' | 'female' | 'other';
  goal: FitnessGoal;
  bodyType: BodyType;
  experienceLevel: ExperienceLevel;
  trainingDaysPerWeek: number;
  availableMinutesPerDay: number;
  semester: number;
  subjects: string[];
  createdAt: string;
  onboardingComplete: boolean;
}

// --- Training ---
export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: ExperienceLevel;
  sets: number;
  reps: string;          // z.B. '8-12' oder '30s'
  restSeconds: number;
  description: string;
  tips: string[];
  videoPlaceholder?: string;
}

export interface TrainingDay {
  day: string;
  focus: string;
  exercises: Exercise[];
  durationMinutes: number;
}

export interface TrainingPlan {
  id: string;
  name: string;
  goal: FitnessGoal;
  level: ExperienceLevel;
  daysPerWeek: number;
  durationWeeks: number;
  description: string;
  days: TrainingDay[];
  tags: string[];
}

export interface PersonalRecord {
  exerciseId: string;
  exerciseName: string;
  weightKg: number;
  reps: number;
  date: string;
  notes?: string;
}

export interface WorkoutSession {
  planId: string;
  date: string;
  completedExercises: string[];
  durationMinutes: number;
  notes?: string;
}

// --- Nutrition ---
export interface Ingredient {
  name: string;
  amount: string;
  calories: number;
  protein: number;       // g
  carbs: number;         // g
  fat: number;           // g
}

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre-workout' | 'post-workout';
export type DietType = 'normal' | 'vegetarian' | 'vegan' | 'high-protein' | 'low-carb';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: MealCategory;
  diet: DietType[];
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  macrosPerServing: Macros;
  ingredients: Ingredient[];
  steps: string[];
  tags: string[];
  isCustom?: boolean;
  createdAt?: string;
}

export interface MealPlan {
  [day: string]: Recipe[];
}

export interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// --- Learning ---
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type LearningSubject = 'mathematik' | 'bwl' | 'informatik' | 'statistik' | 'englisch' | 'recht' | 'marketing' | 'custom';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: LearningSubject;
  tags: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  subject: LearningSubject;
  description: string;
  content: string;
  readingMinutes: number;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  tags: string[];
  isCustom?: boolean;
  createdAt?: string;
}

export interface StudyProgress {
  moduleId: string;
  completed: boolean;
  quizScore?: number;
  lastStudied?: string;
  timeSpentMinutes: number;
  notes?: string;
}

// --- App State ---
export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export type Theme = 'dark' | 'light';

export type SubscriptionPlan = 'free' | 'pro';

export interface AppUser {
  isLoggedIn: boolean;
  profile: UserProfile | null;
  subscription: SubscriptionPlan;
}
