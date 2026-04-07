import katex from "katex";

import type { ParseNode, AnyParseNode, NodeType } from "./parseNode.ts";

import {
    LATEX_TO_UNICODE,
    SUPERSCRIPT_MAP,
    SUBSCRIPT_MAP,
    ACCENT_COMBINING,
    XARROW_MAP,
} from "./data";

// 辅助函数
/** 将文本转换为上标 Unicode */
function toSuperscript(text: string): string {
    return text
        .split("")
        .map(c => SUPERSCRIPT_MAP[c] || c)
        .join("");
}

/** 将文本转换为下标 Unicode */
function toSubscript(text: string): string {
    return text
        .split("")
        .map(c => SUBSCRIPT_MAP[c] || c)
        .join("");
}

/** 判断文本是否可完全转换为上标/下标 */
function canConvertToSuperscript(text: string): boolean {
    return text.split("").every(c => c in SUPERSCRIPT_MAP);
}

function canConvertToSubscript(text: string): boolean {
    return text.split("").every(c => c in SUBSCRIPT_MAP);
}

/** 转义正则表达式特殊字符 */
// function escapeRegExp(string: string): string {
//     return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// }

// 主转换函数

/**
 * 将 KaTeX AST 节点转换为 Unicode 数学公式字符串
 */
function astToText(node: AnyParseNode | null | undefined): string {
    if (!node) return "";

    const type = node.type as NodeType;

    switch (type) {
        // 基础符号类型
        case "atom":
        case "mathord":
        case "textord": {
            const text = (node as ParseNode<"atom" | "mathord" | "textord">).text || "";
            // 检查是否是 LaTeX 命令（以反斜杠开头）
            if (text.startsWith("\\")) {
                return LATEX_TO_UNICODE[text] || text.slice(1); // 去掉反斜杠作为回退
            }
            return text;
        }

        case "spacing": {
            const text = (node as ParseNode<"spacing">).text || "";
            // 间距映射到空格或空字符串
            const spacingMap: Record<string, string> = {
                "\\quad": "  ",
                "\\qquad": "    ",
                "\\,": "",
                "\\:": " ",
                "\\;": "  ",
                "\\!": "",
                " ": " ",
                "~": " ",
                "\\space": " ",
                "\\nobreakspace": " ",
            };
            return spacingMap[text] || " ";
        }

        // 分组结构
        case "ordgroup": {
            const body = (node as ParseNode<"ordgroup">).body || [];
            return body.map((n: AnyParseNode) => astToText(n)).join("");
        }

        // 上下标（关键结构）
        case "supsub": {
            const { base, sup, sub } = node as ParseNode<"supsub">;
            let result = astToText(base);

            // 处理下标
            if (sub) {
                const subText = astToText(sub);
                if (canConvertToSubscript(subText)) {
                    result += toSubscript(subText);
                } else {
                    // 复杂下标使用线性表示法
                    result += "_(" + subText + ")";
                }
            }

            // 处理上标
            if (sup) {
                const supText = astToText(sup);
                if (canConvertToSuperscript(supText)) {
                    result += toSuperscript(supText);
                } else {
                    // 复杂上标使用线性表示法
                    result += "^(" + supText + ")";
                }
            }

            return result;
        }

        // 分式
        case "genfrac": {
            const { numer, denom, hasBarLine, leftDelim, rightDelim } =
                node as ParseNode<"genfrac">;
            const numText = astToText(numer);
            const denText = astToText(denom);

            let result = "";
            // 添加左侧定界符
            if (leftDelim && leftDelim !== ".") {
                result += LATEX_TO_UNICODE[leftDelim] || leftDelim;
            }

            if (hasBarLine) {
                // 使用分数线 ⁄ (U+2044)
                result += numText + "⁄" + denText;
            } else {
                // 无分数线（如二项式系数）
                result += "(" + numText + " " + denText + ")";
            }

            // 添加右侧定界符
            if (rightDelim && rightDelim !== ".") {
                result += LATEX_TO_UNICODE[rightDelim] || rightDelim;
            }

            return result;
        }

        // 根式
        case "sqrt": {
            const { body, index } = node as ParseNode<"sqrt">;
            const bodyText = astToText(body);

            if (!index) {
                // 平方根
                return "√" + (bodyText.length > 1 ? "(" + bodyText + ")" : bodyText);
            } else {
                const indexText = astToText(index);
                // 特殊根指数
                if (indexText === "3") return "∛" + bodyText;
                if (indexText === "4") return "∜" + bodyText;
                // 通用 n 次根
                return toSuperscript(indexText) + "√" + bodyText;
            }
        }

        // 定界符组
        case "leftright": {
            const { body, left, right } = node as ParseNode<"leftright">;
            const content = body.map((n: AnyParseNode) => astToText(n)).join("");
            const leftDelim = left === "." ? "" : LATEX_TO_UNICODE[left] || left;
            const rightDelim = right === "." ? "" : LATEX_TO_UNICODE[right] || right;
            return leftDelim + content + rightDelim;
        }

        case "delimsizing": {
            const { delim } = node as ParseNode<"delimsizing">;
            return LATEX_TO_UNICODE[delim] || delim;
        }

        case "middle": {
            const { delim } = node as ParseNode<"middle">;
            return LATEX_TO_UNICODE[delim] || delim;
        }

        // 运算符
        case "op": {
            const { symbol, name, body } = node as ParseNode<"op">;
            if (symbol) {
                // 符号型运算符（如 ∑, ∏, ∫）
                return LATEX_TO_UNICODE[name] || name;
            } else {
                // 非符号型运算符（如 \lim, \sin）
                return body ? body.map((n: AnyParseNode) => astToText(n)).join("") : "";
            }
        }

        case "operatorname": {
            const { body } = node as ParseNode<"operatorname">;
            return body.map((n: AnyParseNode) => astToText(n)).join("");
        }

        // 重音/修饰符号
        case "accent": {
            const { label, base, isStretchy } = node as ParseNode<"accent">;
            const baseText = astToText(base);
            const combining = ACCENT_COMBINING[label];

            // 如果支持组合字符且基础是单字符
            if (combining && baseText.length === 1 && !isStretchy) {
                return baseText + combining;
            }

            // 复杂情况回退到函数表示法
            const accentName = label.replace("\\", "");
            if (accentName === "vec") {
                return "→" + baseText; // 向量箭头前置
            }
            return accentName + "(" + baseText + ")";
        }

        case "accentUnder": {
            const { base } = node as ParseNode<"accentUnder">;
            const baseText = astToText(base);
            // 下重音通常较少见，使用下划线表示
            return baseText + "\u0332"; // 组合下划线
        }

        case "overline": {
            const { body } = node as ParseNode<"overline">;
            const text = astToText(body);
            if (text.length === 1) return text + "\u0305"; // 组合上划线
            return "overline(" + text + ")";
        }

        case "underline": {
            const { body } = node as ParseNode<"underline">;
            const text = astToText(body);
            if (text.length === 1) return text + "\u0332"; // 组合下划线
            return "underline(" + text + ")";
        }

        // 水平大括号
        case "horizBrace": {
            const { isOver, base } = node as ParseNode<"horizBrace">;
            const baseText = astToText(base);
            const braceChar = isOver ? "⏞" : "⏟";
            return baseText + braceChar;
        }

        // 可扩展箭头
        case "xArrow": {
            const { label, body, below } = node as ParseNode<"xArrow">;
            const arrow = XARROW_MAP[label] || "→";
            const aboveText = astToText(body);
            const belowText = below ? astToText(below) : "";

            if (belowText && aboveText) {
                return belowText + " " + arrow + " " + aboveText;
            } else if (aboveText) {
                return arrow + " " + aboveText;
            } else if (belowText) {
                return belowText + " " + arrow;
            }
            return arrow;
        }

        // 数组/矩阵
        case "array": {
            const { body, isCD } = node as ParseNode<"array">;

            if (isCD) {
                // 交换图特殊处理
                return (
                    "[CD: " +
                    body
                        .map((row: AnyParseNode[]) =>
                            row.map((cell: AnyParseNode) => astToText(cell)).join(" → ")
                        )
                        .join(", ") +
                    "]"
                );
            }

            // 普通矩阵/数组
            const rows = body.map((row: AnyParseNode[]) =>
                row.map((cell: AnyParseNode) => astToText(cell)).join(" ")
            );

            // 检测矩阵类型并添加适当括号
            return "(" + rows.join("; ") + ")";
        }

        // 文本模式
        case "text": {
            const { body } = node as ParseNode<"text">;
            return body.map((n: AnyParseNode) => astToText(n)).join("");
        }

        // 字体和样式
        case "font": {
            const { body } = node as ParseNode<"font">;
            // 暂时忽略字体信息，只返回内容
            // 如需保留字体信息，可添加标记如 [bf ...] 或 [cal ...]
            return astToText(body);
        }

        case "styling": {
            const { body } = node as ParseNode<"styling">;
            // 样式通常影响渲染大小，在纯文本中可忽略
            return body.map((n: AnyParseNode) => astToText(n)).join("");
        }

        case "sizing": {
            const { body } = node as ParseNode<"sizing">;
            // 字号在纯文本中忽略
            return body.map((n: AnyParseNode) => astToText(n)).join("");
        }

        // 颜色
        case "color": {
            const { body } = node as ParseNode<"color">;
            // 颜色在纯文本中忽略，或可用标记如 [red:...]
            return body.map((n: AnyParseNode) => astToText(n)).join("");
        }

        case "color-token": {
            return ""; // 颜色标记本身不产生文本
        }

        // 封闭框
        case "enclose": {
            const { label, body } = node as ParseNode<"enclose">;
            const content = astToText(body);
            if (label === "\\boxed") return "[" + content + "]";
            if (label === "\\fbox") return "[" + content + "]";
            return content;
        }

        // 幻影（占位）
        case "phantom": {
            const { body } = node as ParseNode<"phantom">;
            // 幻影在纯文本中通常可以忽略
            return body.map((n: AnyParseNode) => astToText(n)).join("");
        }

        case "vphantom": {
            const { body } = node as ParseNode<"vphantom">;
            return astToText(body);
        }

        // 间距和空白
        case "kern": {
            const {} = node as ParseNode<"kern">;
            // 根据尺寸决定空格数量
            return " ";
        }

        case "lap": {
            const { body } = node as ParseNode<"lap">;
            // 重叠排版在纯文本中难以表示，直接返回内容
            return astToText(body);
        }

        // 换行
        case "cr": {
            const { newLine } = node as ParseNode<"cr">;
            return newLine ? "\n" : "";
        }

        // 标签
        case "tag": {
            const { body, tag } = node as ParseNode<"tag">;
            const content = body.map((n: AnyParseNode) => astToText(n)).join("");
            const tagText = tag.map((n: AnyParseNode) => astToText(n)).join("");
            return content + " (" + tagText + ")";
        }

        // 原始字符串
        case "raw": {
            return (node as ParseNode<"raw">).string || "";
        }

        // 尺寸值
        case "size": {
            return ""; // 尺寸值本身不产生可见文本
        }

        // 规则（横线）
        case "rule": {
            const { width } = node as ParseNode<"rule">;
            // 根据宽度生成横线
            return "─".repeat(Math.min(10, Math.ceil(width?.number || 3)));
        }

        // 位置调整
        case "raisebox": {
            const { body } = node as ParseNode<"raisebox">;
            return astToText(body);
        }

        case "smash": {
            const { body } = node as ParseNode<"smash">;
            return astToText(body);
        }

        case "vcenter": {
            const { body } = node as ParseNode<"vcenter">;
            return astToText(body);
        }

        // 数学模式选择
        case "mathchoice": {
            const { display } = node as ParseNode<"mathchoice">;
            // 默认使用 display 模式
            return display.map((n: AnyParseNode) => astToText(n)).join("");
        }

        // 二元运算符类
        case "mclass": {
            const { body } = node as ParseNode<"mclass">;
            return body.map((n: AnyParseNode) => astToText(n)).join("");
        }

        // 假粗体
        case "pmb": {
            const { body } = node as ParseNode<"pmb">;
            // 假粗体在纯文本中无法表示，直接返回内容
            return body.map((n: AnyParseNode) => astToText(n)).join("");
        }

        // 超链接
        case "href": {
            const { body, href } = node as ParseNode<"href">;
            const text = body.map((n: AnyParseNode) => astToText(n)).join("");
            return text + " (" + href + ")"; // 保留链接
        }

        case "url": {
            return (node as ParseNode<"url">).url || "";
        }

        // HTML 嵌入
        case "html": {
            const { body } = node as ParseNode<"html">;
            return body.map((n: AnyParseNode) => astToText(n)).join("");
        }

        case "htmlmathml": {
            const { html } = node as ParseNode<"htmlmathml">;
            return html.map((n: AnyParseNode) => astToText(n)).join("");
        }

        // 图片
        case "includegraphics": {
            const { alt, src } = node as ParseNode<"includegraphics">;
            return alt || "[img:" + (src?.split("/").pop() || "") + "]";
        }

        // 逐字文本
        case "verb": {
            const { body } = node as ParseNode<"verb">;
            return body || "";
        }

        // 环境
        case "environment": {
            const { nameGroup } = node as ParseNode<"environment">;
            // 返回环境名称或内容
            return astToText(nameGroup);
        }

        // 交换图
        case "cdlabel": {
            const { label } = node as ParseNode<"cdlabel">;
            return astToText(label);
        }

        case "cdlabelparent": {
            const { fragment } = node as ParseNode<"cdlabelparent">;
            return astToText(fragment);
        }

        // 中缀操作符
        case "infix": {
            const { replaceWith } = node as ParseNode<"infix">;
            return LATEX_TO_UNICODE[replaceWith] || replaceWith;
        }

        // 内部节点
        case "internal": {
            return ""; // 内部节点不产生可见输出
        }

        // Token 类型
        case "accent-token":
        case "op-token": {
            const { text } = node as ParseNode<"accent-token" | "op-token">;
            return LATEX_TO_UNICODE[text] || text;
        }

        // 水平盒子
        case "hbox": {
            const { body } = node as ParseNode<"hbox">;
            return body.map((n: AnyParseNode) => astToText(n)).join("");
        }

        // 未知/默认处理
        default: {
            // 尝试处理任何有 body 的节点
            const anyNode = node as AnyParseNode;
            if ("body" in anyNode) {
                if (Array.isArray(anyNode.body)) {
                    return (anyNode.body as AnyParseNode[])
                        .map((n: AnyParseNode) => astToText(n))
                        .join("");
                } else {
                    return astToText(anyNode.body as AnyParseNode);
                }
            }
            // 如果有 text 字段，返回它
            if ("text" in anyNode) {
                return LATEX_TO_UNICODE[anyNode.text as string] || (anyNode.text as string);
            }
            return "";
        }
    }
}

/**
 * 批量转换多个 AST 节点
 */
function nodesToText(nodes: AnyParseNode[]): string {
    return nodes.map(n => astToText(n)).join("");
}

/**
 * 带选项的转换函数
 */
export interface AstToTextOptions {
    /** 是否保留上下标为 ^ 和 _ 格式而非 Unicode */
    preserveSubSupFormat?: boolean;
    /** 是否保留分数的 / 格式而非 ⁄ */
    preserveFracFormat?: boolean;
    /** 是否添加函数名标记（如 sin、log） */
    markFunctions?: boolean;
    /** 自定义映射表扩展 */
    customMappings?: Record<string, string>;
}

// function astToTextWithOptions(
//     node: AnyParseNode | null | undefined,
//     options: AstToTextOptions = {}
// ): string {
//     // 这里可以实现带选项的转换逻辑
//     // 暂时直接调用主函数
//     return astToText(node);
// }

/**
 * 将 LaTeX 数学表达式转换为 Unicode 纯文本
 * @param latex LaTeX 字符串（数学模式内，不需要 $$）
 * @returns Unicode 纯文本表示
 * @throws 如果 KaTeX 解析失败则抛出错误
 */
export function tex2unicode(latex: string): string {
    if (typeof latex !== "string") {
        throw new TypeError("tex2unicode: expected a string");
    }
    try {
        // 使用 KaTeX 的内部解析器获得 AST
        // 注意：__parse 是内部 API，但多年来稳定可用
        const parseTree = (katex as any).__parse(latex);
        console.log("KaTeX AST:", JSON.stringify(parseTree, null, 2)); // 调试输出 AST
        if (!parseTree) {
            return "";
        }
        return nodesToText(parseTree);
    } catch (err) {
        throw new Error(`Failed to parse LaTeX: ${(err as Error).message}`);
    }
}
