import { petCatalog, type PetId } from '@/types/pet.ts'

export const getRandomMotivation = (petId: PetId) => {
  const pet = petCatalog[petId]
  const pool = pet.affirmations
  if (!pool.length) return 'You are doing amazing!'
  const index = Math.floor(Math.random() * pool.length)
  return pool[index]
}
