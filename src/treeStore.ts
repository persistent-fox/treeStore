type TItemId = number | string;
type TItemParent = 'root' | number;
type TTypeItem = 'test' | null;

export interface IItem {
    id: TItemId,
    parent: TItemParent,
    type?: TTypeItem
}

export class TreeStore {
    private tree: Record<TItemId, IItem> = {};

    constructor(items: IItem[]) {
        items.forEach(item => {
            this.tree[item.id] = item
        })
    }

    getAll() {
        return Object.values(this.tree);
    }

    getItem(id: TItemId) {
        return this.tree[id]
    }

    getChildren(id: TItemId) {
        return Object.values(this.tree).filter(item => item.parent === id)
    }

    getAllChildren(id: TItemParent) {
        const arr = this.getChildren(id)
        return arr.reduce((acc, curr) => {
            return [...acc, ...this.getChildren(curr.id)]
        }, arr)
    }

    getAllParents(id: TItemId) {
        const arr: IItem[] = []
        let currentItem = this.getItem(id);
        while (currentItem && currentItem!.parent !== "root") {
            const parent = this.getItem(currentItem.parent);
            if (!parent) break;
            arr.push(parent);
            currentItem = parent;
        }
        return arr;
    }
}

