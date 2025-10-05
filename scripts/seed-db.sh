#!/bin/bash
# Simple script to seed the Postgres database using Prisma migrations and seed files.
npx prisma migrate deploy
node prisma/seed.js
