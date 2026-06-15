import { create } from 'zustand'
import type { MenuSelection } from '@/typescript/types/menu'

type MenuSelectionStore = MenuSelection & {
  setSelection: (selection: MenuSelection) => void
  resetSelection: () => void
}

const emptySelection: MenuSelection = {
  key: '',
  parentKey: null,
  childKey: null,
}

export const useMenuSelectionStore = create<MenuSelectionStore>((set) => ({
  ...emptySelection,
  setSelection: (selection) => set(selection),
  resetSelection: () => set(emptySelection),
}))
