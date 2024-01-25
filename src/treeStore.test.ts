import {IItem, TreeStore} from "./treeStore";

describe('TreeStore', () => {
    const items: IItem[] = [
        {id: 1, parent: 'root'},
        {id: 2, parent: 1, type: 'test'},
        {id: 3, parent: 1, type: 'test'},
        {id: 4, parent: 2, type: 'test'},
        {id: 5, parent: 2, type: 'test'},
        {id: 6, parent: 2, type: 'test'},
        {id: 7, parent: 4, type: null},
        {id: 8, parent: 4, type: null},
    ];

    it('should return all items', () => {
        const ts = new TreeStore(items);
        expect(ts.getAll()).toEqual(items);
    });

    it('should return correct item by id', () => {
        const ts = new TreeStore(items);
        expect(ts.getItem(7)).toEqual({id: 7, parent: 4, type: null});
    });

    it('should return correct children by id', () => {
        const ts = new TreeStore(items);
        expect(ts.getChildren(4)).toEqual([
            {id: 7, parent: 4, type: null},
            {id: 8, parent: 4, type: null},
        ]);
    });

    it('should return correct all children by id', () => {
        const ts = new TreeStore(items);
        expect(ts.getAllChildren(2)).toEqual([
                {id: 4, parent: 2, type: 'test'},
                {id: 5, parent: 2, type: 'test'},
                {id: 6, parent: 2, type: 'test'},
                {id: 7, parent: 4, type: null},
                {id: 8, parent: 4, type: null}
            ]
        );
    });

    it('should return correct all parents by id', () => {
        const ts = new TreeStore(items);
        expect(ts.getAllParents(7)).toEqual([
                {id: 4, parent: 2, type: 'test'},
                {id: 2, parent: 1, type: 'test'},
                {id: 1, parent: 'root'}
            ]
        );
    });
});
