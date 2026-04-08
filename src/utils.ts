import katex from "katex";

import type { AnyParseNode, Settings } from "./katexStruct";

export function parse(latex: string, options?: Settings): AnyParseNode[] {
    return (katex as any).__parse(latex, options);
}

import { COMMAND_TO_UNICODE, SUPERSCRIPT_MAP, SUBSCRIPT_MAP, UNICODE_MAS_MAP } from "./data";
import type { MASType } from "./data";

export function commandToUnicode(cmd: string) {
    if (cmd in COMMAND_TO_UNICODE) {
        return COMMAND_TO_UNICODE[cmd];
    }
    if (cmd.startsWith("\\")) {
        return cmd.slice(1); // 去掉反斜杠作为回退
    }
    return cmd; // 其他情况直接返回原字符串
}

/** 将文本转换为上标 Unicode */
export function toSuperscript(text: string): string {
    return text
        .split("")
        .map(c => SUPERSCRIPT_MAP[c] || c)
        .join("");
}

/** 将文本转换为下标 Unicode */
export function toSubscript(text: string): string {
    return text
        .split("")
        .map(c => SUBSCRIPT_MAP[c] || c)
        .join("");
}

/** 判断文本是否可完全转换为上标/下标 */
export function canConvertToSuperscript(text: string): boolean {
    return text.split("").every(c => c in SUPERSCRIPT_MAP);
}

export function canConvertToSubscript(text: string): boolean {
    return text.split("").every(c => c in SUBSCRIPT_MAP);
}

/** 将字母按字体转化为对应的 Unicode 字符 */
export type FontType =
    | "mathrm"
    | "mathbf"
    | "mathsf"
    | "mathnormal"
    | "mathsfit"
    | "mathbb"
    | "mathit"
    | "mathtt"
    | "mathfrak"
    | "mathcal"
    | "mathscr";
export function toUnicodeMAS(text: string, font: FontType): string {
    const MAS_MAP: Record<FontType, MASType | null> = {
        mathrm: null,
        mathbf: "bold",
        mathsf: "sansSerif",
        mathnormal: "italic",
        mathsfit: "sansSerifItalic",
        mathbb: "doubleStruck",
        mathit: "italic",
        mathtt: "monospace",
        mathfrak: "fraktur",
        mathcal: "script",
        mathscr: "script",
    };
    return text
        .split("")
        .map(c => (MAS_MAP[font] && c in UNICODE_MAS_MAP ? UNICODE_MAS_MAP[c][MAS_MAP[font]] : c))
        .join("");
}
