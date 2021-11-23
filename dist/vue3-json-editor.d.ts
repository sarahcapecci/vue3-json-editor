import './assets/jsoneditor.css';
import './style.css';
export declare const Vue3JsonEditor: import("vue").DefineComponent<{
    modelValue: (StringConstructor | BooleanConstructor | ObjectConstructor | ArrayConstructor)[];
    showBtns: BooleanConstructor[];
    expandedOnStart: {
        type: BooleanConstructor;
        default: boolean;
    };
    mode: {
        type: StringConstructor;
        default: string;
    };
    modes: {
        type: ArrayConstructor;
        default: () => string[];
    };
    lang: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    expandedOnStart: boolean;
    mode: string;
    modes: unknown[];
    lang: string;
} & {
    modelValue?: unknown;
    showBtns?: boolean | undefined;
}>, {
    expandedOnStart: boolean;
    mode: string;
    modes: unknown[];
    lang: string;
}>;
