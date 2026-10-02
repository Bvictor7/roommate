import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockListing = {
  findMany: vi.fn(),
  findUnique: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  count: vi.fn(),
}

vi.mock('@prisma/client', () => {
  function PrismaClient() {}
  PrismaClient.prototype.listing = mockListing
  return { PrismaClient }
})

const listingService = await import('../services/listing.service.js')

const fakeListing = {
  id: 'listing-1', title: 'Chambre test', type: 'chambre',
  city: 'Paris', postalCode: '75011', price: 650,
  status: 'active', userId: 'user-1',
  user: { id: 'user-1', username: 'test', avatar: null }
}

beforeEach(() => {
  vi.clearAllMocks()
  Object.values(mockListing).forEach(fn => fn.mockReset())
})

describe('listing.service — getListings', () => {
  it('retourne une liste paginée', async () => {
    mockListing.findMany.mockResolvedValue([fakeListing])
    mockListing.count.mockResolvedValue(1)

    const result = await listingService.getListings({})

    expect(result).toHaveProperty('data')
    expect(result).toHaveProperty('pagination')
    expect(result.data).toHaveLength(1)
  })

  it('filtre par ville', async () => {
    mockListing.findMany.mockResolvedValue([fakeListing])
    mockListing.count.mockResolvedValue(1)

    await listingService.getListings({ city: 'Paris' })

    expect(mockListing.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          city: expect.objectContaining({ contains: 'Paris' })
        })
      })
    )
  })

  it('filtre par prix min et max', async () => {
    mockListing.findMany.mockResolvedValue([])
    mockListing.count.mockResolvedValue(0)

    await listingService.getListings({ minPrice: 500, maxPrice: 800 })

    expect(mockListing.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          price: expect.objectContaining({ lte: 800 })
        })
      })
    )
  })
})

describe('listing.service — getListingById', () => {
  it('retourne une annonce par id', async () => {
    mockListing.findUnique.mockResolvedValue(fakeListing)

    const result = await listingService.getListingById('listing-1')

    expect(result.id).toBe('listing-1')
  })

  it('retourne null si annonce inexistante', async () => {
    mockListing.findUnique.mockResolvedValue(null)

    await expect(listingService.getListingById('inexistant')).rejects.toThrow('Annonce non trouvée')
  })
})

describe('listing.service — createListing', () => {
  it('crée une annonce avec userId', async () => {
    mockListing.create.mockResolvedValue({ ...fakeListing, id: 'listing-2' })

    const data = {
      title: 'Chambre test', type: 'chambre', city: 'Paris',
      postalCode: '75011', price: 650, description: 'Description longue',
      availableDate: new Date()
    }
    const result = await listingService.createListing(data, 'user-1')

    expect(mockListing.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ userId: 'user-1' })
      })
    )
    expect(result).toHaveProperty('id')
  })
})

describe('listing.service — deleteListing', () => {
  it('supprime si propriétaire', async () => {
    mockListing.findUnique.mockResolvedValue({ ...fakeListing, userId: 'user-1' })
    mockListing.delete.mockResolvedValue(fakeListing)

    await expect(listingService.deleteListing('listing-1', 'user-1')).resolves.not.toThrow()
    expect(mockListing.delete).toHaveBeenCalledWith({ where: { id: 'listing-1' } })
  })

  it('refuse si pas propriétaire', async () => {
    mockListing.findUnique.mockResolvedValue({ ...fakeListing, userId: 'user-1' })

    await expect(listingService.deleteListing('listing-1', 'user-2')).rejects.toThrow()
  })
})