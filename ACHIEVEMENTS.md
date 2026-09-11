# Achievements

Achievements are free-form awards attached to exactly one existing team or player UUID. Each has its own UUID, a required label (1–200 characters), and an optional HTTP(S) image URL. Labels can include season names or any other context; there is no fixed award catalog.

Admin team and player detail pages include an **Achievements** tab to add, edit, or remove awards. Clear the image field to remove the image. The website displays awards in **Erfolge & Auszeichnungen** on both detail pages.

## API

- Public list: `GET /webClient/achievements/{team|player}/{ownerId}`
- Admin list/create: `GET|POST /admin/achievements/{team|player}/{ownerId}`
- Admin update/delete: `PUT|DELETE /admin/achievements/{team|player}/{ownerId}/{achievementId}`

Create and update accept `{ "label": "Saisonmeister 2025/26", "imageUrl": null }`. PUT replaces the label and image. Reads return arrays; creates/updates return the saved achievement. Deletes return HTTP 204. All admin routes use the existing token authentication and admin-only middleware. Owner UUIDs and award ownership are checked before mutations.

## Rollout

Deploy the backend with `AchievementMigration` before deploying either frontend. The existing backend startup calls `autoMigrate`, which creates the `achievements` collection. The older `MatchAchivement` model is unrelated and remains untouched. No live data or deployment was changed during implementation.

The backend uses MongoDB; owner existence is validated by the API rather than a database foreign key. Awards remain attached to their original UUID when a player transfers; copying a player does not copy awards. Deleted-owner awards are no longer returned because reads require an existing owner.
