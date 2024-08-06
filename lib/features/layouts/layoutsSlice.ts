import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { defaultLayout } from "@/constants/layouts";
import { v4 } from "uuid";

interface ILayout {
    title: string;
    width: number;
    height: number;
    uid?: string;
}

export interface LayoutSliceState {
    values: ILayout[];
}

const initialState: LayoutSliceState = {
    values: []
};


export const layoutsSlice = createAppSlice({
    name: "layouts",

    initialState,

    reducers: (create) => ({
        setLayout: create.reducer((state, action: PayloadAction<ILayout[]>) => {
            state.values = action.payload;
        }),
        add: create.reducer((state, action: PayloadAction<ILayout>) => {

            const newBox = {
                ...action.payload,
                uid: v4()
            }

            state.values = [...state.values, newBox];

            const jsonValues = JSON.stringify(state.values);
            localStorage.setItem('layout', jsonValues);
        }),
        removeBox: create.reducer((state, action: PayloadAction<string>) => {
            state.values = state.values.filter((box) => box.uid !== action.payload);

            const jsonValues = JSON.stringify(state.values);
            localStorage.setItem('layout', jsonValues);
        }),
    }),

    selectors: {
        selectLayouts: (state) => state.values,
    },
});

export const { add, setLayout, removeBox } = layoutsSlice.actions;

export const { selectLayouts } = layoutsSlice.selectors;

