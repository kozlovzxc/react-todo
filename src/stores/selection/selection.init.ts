import * as Selection from '@simonwep/selection-js';
import { setSelection } from './selection.events';
import { resetFocus } from '~src/stores/focused';
import { $selectedStore, setSelected } from '~src/stores/selected';

const isFlatArraysEqual = <T>(arr1: readonly T[], arr2: readonly T[]) =>
    arr1.length === arr2.length && arr1.every((v1, i) => v1 === arr2[i]);

export const initSelection = () => {
    const selection = Selection.create({
        class: 'selection',
        selectables: ['.page-page .block-selectable'],
        boundaries: ['.page-page'],
    })
        .on('beforestart', (event) => {
            const target = event.oe.target as Element;
            return target?.tagName !== 'INPUT';
        })
        .on('start', () => {
            resetFocus();
        })
        .on('move', (event) => {
            const selected = $selectedStore.getState();
            if (!isFlatArraysEqual(selected, event.selected)) {
                setSelected({ targets: event.selected });
            }
        });
    setSelection({ target: selection });
};
