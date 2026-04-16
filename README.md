# LiftED - Dein smarter Trainingsbegleiter

> DHBW Webdesign Projekt 2025/26

LiftED begleitet dich live beim Training und nutzt deine Pausen, um dich schlauer zu machen. Karteikarten, Videos und Rezepte genau dann, wenn du sie brauchst.

## Features

- **Training**: Live-Workout-Begleitung mit Timer und Pausenfunktion
- **Ernaehrung**: Rezepte und Ernaehrungsplanung passend zum Ziel
- **Lernen**: Karteikarten und Lernvideos fuer Studierende
- **Onboarding**: Personalisiertes Nutzerprofil (Ziel, Level, Koerpertyp)
- **Dashboard**: Uebersicht ueber Stats, Schnellzugriff und Profil

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router DOM (HashRouter)
- **Build**: Vite
- **Tests**: Vitest + @testing-library/react
- **Deployment**: GitHub Pages

## Lokale Entwicklung

```bash
# Abhaengigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Tests ausfuehren
npm run test

# Produktions-Build erstellen
npm run build
```

## Projektstruktur

```
src/
  components/     # Wiederverwendbare UI-Komponenten (Navbar)
  context/        # React Context (AuthContext)
  pages/          # Seitenkomponenten
  types/          # TypeScript Interfaces und Typen
  test/           # Test-Setup und Hilfsfunktionen
```

## Sprint-Uebersicht

| Sprint | Inhalt | Status |
|--------|--------|--------|
| 1 | TypeScript Typen & tsconfig | Abgeschlossen |
| 2 | OnboardingPage & NutritionPage Typsicherheit | Abgeschlossen |
| 3 | Navbar, LandingPage, vite.config Fixes | Abgeschlossen |
| 4 | DashboardPage Verbesserungen | Abgeschlossen |
| 5 | README & Test-Setup | Abgeschlossen |

## Live Demo

[https://schurppp.github.io/lifted-full/](https://schurppp.github.io/lifted-full/)
