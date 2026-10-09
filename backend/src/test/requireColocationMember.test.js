import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockPrisma = {
  colocationMember: { findFirst: vi.fn() },
  task: { findUnique: vi.fn() },
}

vi.mock('@prisma/client', () => {
  function PrismaClient() {
    Object.assign(this, mockPrisma)
  }
  return { PrismaClient }
})

const { default: requireColocationMember } = await import('../middleware/requireColocationMember.js')

const mockRes = () => {
  const res = {}
  res.status = vi.fn().mockReturnValue(res)
  res.json = vi.fn().mockReturnValue(res)
  return res
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('requireColocationMember — colocation dans l\'URL', () => {
  it('laisse passer un membre et expose req.colocationId', async () => {
    mockPrisma.colocationMember.findFirst.mockResolvedValue({ id: 'm-1' })
    const req = { params: { colocationId: 'coloc-1' }, user: { userId: 'user-1' } }
    const res = mockRes()
    const next = vi.fn()

    await requireColocationMember()(req, res, next)

    expect(mockPrisma.colocationMember.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: 'user-1', colocationId: 'coloc-1' } })
    )
    expect(next).toHaveBeenCalledWith()
    expect(req.colocationId).toBe('coloc-1')
  })

  it('refuse un non-membre avec 403', async () => {
    mockPrisma.colocationMember.findFirst.mockResolvedValue(null)
    const req = { params: { colocationId: 'coloc-1' }, user: { userId: 'intrus' } }
    const res = mockRes()
    const next = vi.fn()

    await requireColocationMember()(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(next).not.toHaveBeenCalled()
  })
})

describe('requireColocationMember — colocation déduite de la ressource', () => {
  const middleware = requireColocationMember({ model: 'task', param: 'taskId' })

  it('vérifie l\'appartenance à la colocation de la tâche', async () => {
    mockPrisma.task.findUnique.mockResolvedValue({ colocationId: 'coloc-2' })
    mockPrisma.colocationMember.findFirst.mockResolvedValue({ id: 'm-1' })
    const req = { params: { taskId: 'task-1' }, user: { userId: 'user-1' } }
    const next = vi.fn()

    await middleware(req, mockRes(), next)

    expect(mockPrisma.task.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'task-1' } })
    )
    expect(mockPrisma.colocationMember.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: 'user-1', colocationId: 'coloc-2' } })
    )
    expect(req.colocationId).toBe('coloc-2')
    expect(next).toHaveBeenCalledWith()
  })

  it('renvoie 404 si la ressource n\'existe pas', async () => {
    mockPrisma.task.findUnique.mockResolvedValue(null)
    const req = { params: { taskId: 'inexistante' }, user: { userId: 'user-1' } }
    const res = mockRes()
    const next = vi.fn()

    await middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(mockPrisma.colocationMember.findFirst).not.toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })

  it('refuse avec 403 la tâche d\'une autre colocation', async () => {
    mockPrisma.task.findUnique.mockResolvedValue({ colocationId: 'coloc-autre' })
    mockPrisma.colocationMember.findFirst.mockResolvedValue(null)
    const req = { params: { taskId: 'task-1' }, user: { userId: 'user-1' } }
    const res = mockRes()
    const next = vi.fn()

    await middleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(next).not.toHaveBeenCalled()
  })

  it('transmet les erreurs Prisma à errorHandler', async () => {
    const dbError = new Error('DB down')
    mockPrisma.task.findUnique.mockRejectedValue(dbError)
    const next = vi.fn()

    await middleware({ params: { taskId: 't' }, user: { userId: 'u' } }, mockRes(), next)

    expect(next).toHaveBeenCalledWith(dbError)
  })
})
