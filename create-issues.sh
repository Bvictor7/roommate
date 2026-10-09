#!/bin/bash
# Script à exécuter dans ton terminal dans le dossier roommate
# Pré-requis : gh auth login

echo "Création des labels..."
gh label create "bug" --color "d73a4a" --description "Something isn't working" 2>/dev/null || true
gh label create "enhancement" --color "a2eeef" --description "New feature or request" 2>/dev/null || true
gh label create "documentation" --color "0075ca" --description "Improvements or additions to documentation" 2>/dev/null || true
gh label create "security" --color "e4e669" --description "Security related" 2>/dev/null || true
gh label create "devops" --color "f9d0c4" --description "CI/CD, Docker, infra" 2>/dev/null || true
gh label create "testing" --color "bfd4f2" --description "Tests, QA" 2>/dev/null || true
gh label create "frontend" --color "c5def5" --description "Frontend React" 2>/dev/null || true
gh label create "backend" --color "fef2c0" --description "Backend Express/API" 2>/dev/null || true
gh label create "good first issue" --color "7057ff" --description "Good for newcomers" 2>/dev/null || true
gh label create "wontfix" --color "ffffff" --description "This will not be worked on" 2>/dev/null || true

echo "Création des milestones..."
gh api repos/Bvictor7/roommate/milestones \
  --method POST \
  --field title="v1.0 - Certification CDA" \
  --field description="Livrables nécessaires pour la certification CDA" \
  --field due_on="2026-12-01T00:00:00Z" 2>/dev/null || true

gh api repos/Bvictor7/roommate/milestones \
  --method POST \
  --field title="v1.1 - Post-certification" \
  --field description="Améliorations post-certification" \
  --field due_on="2027-03-01T00:00:00Z" 2>/dev/null || true

echo "Création des issues..."

# Issue 1 - Upload photos
gh issue create \
  --title "feat: upload de photos pour les annonces (Multer/Sharp)" \
  --body "## Description
Permettre aux utilisateurs d'uploader des photos pour leurs annonces.

## Contexte
Multer et Sharp sont déjà installés dans les dépendances backend.

## Tâches
- [ ] Route POST /api/listings/:id/photos (Multer)
- [ ] Compression Sharp (max 800px, qualité 80%)
- [ ] Stockage sur Render Disk ou migration vers Cloudinary
- [ ] Affichage photos dans les cards annonces
- [ ] Tests Vitest pour la route upload

## Critères d'acceptation
- Upload multiple (max 5 photos par annonce)
- Compression automatique < 500KB
- Preview avant envoi côté frontend" \
  --label "enhancement,frontend,backend" \
  --milestone "v1.1 - Post-certification"

# Issue 2 - UAT
gh issue create \
  --title "test: UAT — faire tester par des utilisateurs réels" \
  --body "## Description
Organiser et documenter une session de tests utilisateur (UAT).

## Participants cibles
- 2-3 personnes extérieures au projet
- Profil : 18-35 ans, cherche ou a cherché une colocation

## Scénarios à tester
- [ ] Inscription et connexion
- [ ] Création d'une annonce
- [ ] Recherche d'annonce avec filtres
- [ ] Intégration dans un foyer
- [ ] Dashboard colocation (tâches, dépenses, courses)

## Livrable
Rapport UAT avec retours et actions correctives" \
  --label "testing,documentation" \
  --milestone "v1.0 - Certification CDA"

# Issue 3 - README
gh issue create \
  --title "docs: README à jour avec badges et documentation complète" \
  --body "## Description
Mettre à jour le README avec toute la documentation du projet.

## Fait ✅
- Badges CI/CD, coverage, Docker
- Stack technique complète
- Guide démarrage rapide Docker + local
- Pipeline CI/CD documenté
- Section sécurité et qualité
- Variables d'environnement" \
  --label "documentation" \
  --milestone "v1.0 - Certification CDA"

# Issue 4 - Notifications temps réel
gh issue create \
  --title "feat: notifications temps réel (WebSocket / Socket.io)" \
  --body "## Description
Ajouter des notifications temps réel pour les événements du foyer.

## Cas d'usage
- Nouvelle tâche assignée
- Dépense ajoutée
- Nouveau colocataire rejoint

## Stack envisagée
Socket.io (backend) + useEffect hook (frontend)

## Note
Challenge niveau 3 du cahier des charges." \
  --label "enhancement,frontend,backend" \
  --milestone "v1.1 - Post-certification"

# Issue 5 - Trivy CRITICAL
gh issue create \
  --title "security: corriger les 2 vulnérabilités CRITICAL Trivy (proxy-addr, tar)" \
  --body "## Description
Trivy signale 2 vulnérabilités CRITICAL dans l'image distroless.

## Packages concernés
- \`proxy-addr\` (dépendance transitive Express)
- \`tar\` (dépendance transitive npm)

## Analyse
Ces vulnérabilités ne sont pas exploitables dans notre contexte (pas d'extraction tar côté utilisateur, proxy-addr est interne).

## Actions
- [ ] Attendre mise à jour Express 5 stable
- [ ] Surveiller les CVE associées
- [ ] Re-scanner après chaque mise à jour Dependabot" \
  --label "security,devops" \
  --milestone "v1.1 - Post-certification"

# Issue 6 - Tests charge prod
gh issue create \
  --title "test: stress test en conditions de production (Render)" \
  --body "## Description
Les stress tests k6 ont été réalisés en local. Les reproduire sur l'environnement Render pour valider les limites réelles.

## Scénarios
- 10 VUs pendant 30s (baseline)
- 50 VUs pendant 60s (charge normale)
- 100 VUs pendant 30s (pic)

## Métriques à capturer
- p95 response time
- Error rate
- Render CPU/RAM metrics" \
  --label "testing,devops" \
  --milestone "v1.1 - Post-certification"

# Issue 7 - Contributor visible
gh issue create \
  --title "chore: vérifier apparition Claude dans les contributors GitHub" \
  --body "## Description
Après le rebase/force-push pour réattribuer les commits, vérifier que le compte Claude apparaît dans la liste des contributeurs.

## Note
Le cache GitHub peut prendre 24-48h à se mettre à jour.

## Statut
En attente — cache GitHub." \
  --label "documentation" \
  --milestone "v1.0 - Certification CDA"

echo "✅ Issues et labels créés avec succès !"
echo ""
echo "Voir les issues : https://github.com/Bvictor7/roommate/issues"
