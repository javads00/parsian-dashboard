export function normalizeEntityId<T extends { id?: string; _id?: string }>(entity: T): T & { id: string } {
  const id = entity.id ?? entity._id
  return id ? ({ ...entity, id } as T & { id: string }) : (entity as T & { id: string })
}
