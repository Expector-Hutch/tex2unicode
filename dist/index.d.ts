declare type AlignSpec = {
    type: "separator";
    separator: string;
} | {
    type: "align";
    align: string;
    pregap?: number;
    postgap?: number;
};

declare type AnyParseNode = ParseNodeTypes[keyof ParseNodeTypes];

declare type AnyTrustContext = object;

declare type Atom = keyof typeof ATOMS;

declare const ATOMS: {
    bin: number;
    close: number;
    inner: number;
    open: number;
    punct: number;
    rel: number;
};

declare type ColSeparationType = "align" | "alignat" | "gather" | "small" | "CD";

declare type MacroDefinition = string | MacroExpansion | ((arg0: object) => string | MacroExpansion);

declare type MacroExpansion = {
    tokens: Token[];
    numArgs: number;
    delimiters?: string[][];
    unexpandable?: boolean;
};

declare type MacroMap = Record<string, MacroDefinition>;

declare type Measurement = {
    number: number;
    unit: string;
};

declare type Mode = "math" | "text";

/**
 * 带选项的转换函数
 */
export declare interface Options {
    katexOptions?: Settings;
}

declare type ParseNodeTypes = {
    array: {
        type: "array";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        colSeparationType?: ColSeparationType;
        hskipBeforeAndAfter?: boolean;
        addJot?: boolean;
        cols?: AlignSpec[];
        arraystretch: number;
        body: AnyParseNode[][];
        rowGaps: (Measurement | null | undefined)[];
        hLinesBeforeRow: Array<boolean[]>;
        tags?: (boolean | AnyParseNode[])[];
        leqno?: boolean;
        isCD?: boolean;
    };
    cdlabel: {
        type: "cdlabel";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        side: string;
        label: AnyParseNode;
    };
    cdlabelparent: {
        type: "cdlabelparent";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        fragment: AnyParseNode;
    };
    color: {
        type: "color";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        color: string;
        body: AnyParseNode[];
    };
    "color-token": {
        type: "color-token";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        color: string;
    };
    op: {
        type: "op";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        limits: boolean;
        alwaysHandleSupSub?: boolean;
        suppressBaseShift?: boolean;
        parentIsSupSub: boolean;
        symbol: boolean;
        name: string;
        body?: void;
    } | {
        type: "op";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        limits: boolean;
        alwaysHandleSupSub?: boolean;
        suppressBaseShift?: boolean;
        parentIsSupSub: boolean;
        symbol: false;
        name?: void;
        body: AnyParseNode[];
    };
    ordgroup: {
        type: "ordgroup";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode[];
        semisimple?: boolean;
    };
    raw: {
        type: "raw";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        string: string;
    };
    size: {
        type: "size";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        value: Measurement;
        isBlank: boolean;
    };
    styling: {
        type: "styling";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        style: StyleStr;
        body: AnyParseNode[];
    };
    supsub: {
        type: "supsub";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        base: AnyParseNode | null | undefined;
        sup?: AnyParseNode | null | undefined;
        sub?: AnyParseNode | null | undefined;
    };
    tag: {
        type: "tag";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode[];
        tag: AnyParseNode[];
    };
    text: {
        type: "text";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode[];
        font?: string;
    };
    url: {
        type: "url";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        url: string;
    };
    verb: {
        type: "verb";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: string;
        star: boolean;
    };
    atom: {
        type: "atom";
        family: Atom;
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        text: string;
    };
    mathord: {
        type: "mathord";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        text: string;
    };
    spacing: {
        type: "spacing";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        text: string;
    };
    textord: {
        type: "textord";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        text: string;
    };
    "accent-token": {
        type: "accent-token";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        text: string;
    };
    "op-token": {
        type: "op-token";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        text: string;
    };
    accent: {
        type: "accent";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        label: string;
        isStretchy?: boolean;
        isShifty?: boolean;
        base: AnyParseNode;
    };
    accentUnder: {
        type: "accentUnder";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        label: string;
        isStretchy?: boolean;
        isShifty?: boolean;
        base: AnyParseNode;
    };
    cr: {
        type: "cr";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        newLine: boolean;
        size: Measurement | null | undefined;
    };
    delimsizing: {
        type: "delimsizing";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        size: 1 | 2 | 3 | 4;
        mclass: "mopen" | "mclose" | "mrel" | "mord";
        delim: string;
    };
    enclose: {
        type: "enclose";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        label: string;
        backgroundColor?: string;
        borderColor?: string;
        body: AnyParseNode;
    };
    environment: {
        type: "environment";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        name: string;
        nameGroup: AnyParseNode;
    };
    font: {
        type: "font";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        font: string;
        body: AnyParseNode;
    };
    genfrac: {
        type: "genfrac";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        continued: boolean;
        numer: AnyParseNode;
        denom: AnyParseNode;
        hasBarLine: boolean;
        leftDelim: string | null | undefined;
        rightDelim: string | null | undefined;
        barSize: Measurement | null;
    };
    hbox: {
        type: "hbox";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode[];
    };
    horizBrace: {
        type: "horizBrace";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        label: string;
        isOver: boolean;
        base: AnyParseNode;
    };
    href: {
        type: "href";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        href: string;
        body: AnyParseNode[];
    };
    html: {
        type: "html";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        attributes: Record<string, string>;
        body: AnyParseNode[];
    };
    htmlmathml: {
        type: "htmlmathml";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        html: AnyParseNode[];
        mathml: AnyParseNode[];
    };
    includegraphics: {
        type: "includegraphics";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        alt: string;
        width: Measurement;
        height: Measurement;
        totalheight: Measurement;
        src: string;
    };
    infix: {
        type: "infix";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        replaceWith: string;
        size?: Measurement;
        token: Token | null | undefined;
    };
    internal: {
        type: "internal";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
    };
    kern: {
        type: "kern";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        dimension: Measurement;
    };
    lap: {
        type: "lap";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        alignment: string;
        body: AnyParseNode;
    };
    leftright: {
        type: "leftright";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode[];
        left: string;
        right: string;
        rightColor: string | null | undefined;
    };
    "leftright-right": {
        type: "leftright-right";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        delim: string;
        color: string | null | undefined;
    };
    mathchoice: {
        type: "mathchoice";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        display: AnyParseNode[];
        text: AnyParseNode[];
        script: AnyParseNode[];
        scriptscript: AnyParseNode[];
    };
    middle: {
        type: "middle";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        delim: string;
    };
    mclass: {
        type: "mclass";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        mclass: string;
        body: AnyParseNode[];
        isCharacterBox: boolean;
    };
    operatorname: {
        type: "operatorname";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode[];
        alwaysHandleSupSub: boolean;
        limits: boolean;
        parentIsSupSub: boolean;
    };
    overline: {
        type: "overline";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode;
    };
    phantom: {
        type: "phantom";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode[];
    };
    vphantom: {
        type: "vphantom";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode;
    };
    pmb: {
        type: "pmb";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        mclass: string;
        body: AnyParseNode[];
    };
    raisebox: {
        type: "raisebox";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        dy: Measurement;
        body: AnyParseNode;
    };
    rule: {
        type: "rule";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        shift: Measurement | null | undefined;
        width: Measurement;
        height: Measurement;
    };
    sizing: {
        type: "sizing";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        size: number;
        body: AnyParseNode[];
    };
    smash: {
        type: "smash";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode;
        smashHeight: boolean;
        smashDepth: boolean;
    };
    sqrt: {
        type: "sqrt";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode;
        index: AnyParseNode | null | undefined;
    };
    underline: {
        type: "underline";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode;
    };
    vcenter: {
        type: "vcenter";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        body: AnyParseNode;
    };
    xArrow: {
        type: "xArrow";
        mode: Mode;
        loc?: SourceLocation | null | undefined;
        label: string;
        body: AnyParseNode;
        below: AnyParseNode | null | undefined;
    };
};

declare class Settings {
    displayMode?: boolean;
    output?: "html" | "mathml" | "htmlAndMathml";
    leqno?: boolean;
    fleqn?: boolean;
    throwOnError?: boolean;
    errorColor?: string;
    macros?: MacroMap;
    minRuleThickness?: number;
    colorIsTextColor?: boolean;
    strict?: boolean | "ignore" | "warn" | "error" | StrictFunction;
    trust?: boolean | TrustFunction;
    maxSize?: number;
    maxExpand?: number;
    globalGroup?: boolean;
}

declare type SourceLocation = any;

declare type StrictFunction = (errorCode: string, errorMsg: string, token?: Token | AnyParseNode) => (boolean | string) | null | undefined;

declare type StyleStr = "text" | "display" | "script" | "scriptscript";

/**
 * 将 LaTeX 数学表达式转换为 Unicode 纯文本
 * @param latex LaTeX 字符串（数学模式内，不需要 $$）
 * @returns Unicode 纯文本表示
 * @throws 如果 KaTeX 解析失败则抛出错误
 */
export declare function tex2unicode(latex: string, options?: Options): string;

declare type Token = any;

declare type TrustFunction = (context: AnyTrustContext) => boolean | null | undefined;

export { }
