Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let katex = require("katex");
katex = __toESM(katex);
//#region src/data.ts
var COMMAND_TO_UNICODE = {
	"\\alpha": "α",
	"\\beta": "β",
	"\\gamma": "γ",
	"\\delta": "δ",
	"\\epsilon": "ε",
	"\\varepsilon": "ε",
	"\\zeta": "ζ",
	"\\eta": "η",
	"\\theta": "θ",
	"\\vartheta": "ϑ",
	"\\iota": "ι",
	"\\kappa": "κ",
	"\\lambda": "λ",
	"\\mu": "μ",
	"\\nu": "ν",
	"\\xi": "ξ",
	"\\omicron": "ο",
	"\\pi": "π",
	"\\varpi": "ϖ",
	"\\rho": "ρ",
	"\\varrho": "ϱ",
	"\\sigma": "σ",
	"\\varsigma": "ς",
	"\\tau": "τ",
	"\\upsilon": "υ",
	"\\phi": "φ",
	"\\varphi": "ϕ",
	"\\chi": "χ",
	"\\psi": "ψ",
	"\\omega": "ω",
	"\\Gamma": "Γ",
	"\\Delta": "Δ",
	"\\Theta": "Θ",
	"\\Lambda": "Λ",
	"\\Xi": "Ξ",
	"\\Pi": "Π",
	"\\Sigma": "Σ",
	"\\Upsilon": "Υ",
	"\\Phi": "Φ",
	"\\Psi": "Ψ",
	"\\Omega": "Ω",
	"\\times": "×",
	"\\div": "÷",
	"\\pm": "±",
	"\\mp": "∓",
	"\\cdot": "·",
	"\\ast": "∗",
	"\\star": "⋆",
	"\\dagger": "†",
	"\\ddagger": "‡",
	"\\amalg": "⨿",
	"\\cap": "∩",
	"\\cup": "∪",
	"\\uplus": "⊎",
	"\\sqcap": "⊓",
	"\\sqcup": "⊔",
	"\\vee": "∨",
	"\\wedge": "∧",
	"\\setminus": "∖",
	"\\wr": "≀",
	"\\circ": "∘",
	"\\bullet": "•",
	"\\oplus": "⊕",
	"\\ominus": "⊖",
	"\\otimes": "⊗",
	"\\oslash": "⊘",
	"\\odot": "⊙",
	"\\bigcirc": "○",
	"\\diamond": "◇",
	"\\bigtriangleup": "△",
	"\\bigtriangledown": "▽",
	"\\triangleleft": "◁",
	"\\triangleright": "▷",
	"\\lhd": "⊲",
	"\\rhd": "⊳",
	"\\unlhd": "⊴",
	"\\unrhd": "⊵",
	"\\leq": "≤",
	"\\geq": "≥",
	"\\neq": "≠",
	"\\equiv": "≡",
	"\\sim": "∼",
	"\\simeq": "≃",
	"\\approx": "≈",
	"\\cong": "≅",
	"\\bowtie": "⋈",
	"\\propto": "∝",
	"\\in": "∈",
	"\\ni": "∋",
	"\\notin": "∉",
	"\\subset": "⊂",
	"\\supset": "⊃",
	"\\subseteq": "⊆",
	"\\supseteq": "⊇",
	"\\sqsubset": "⊏",
	"\\sqsupset": "⊐",
	"\\sqsubseteq": "⊑",
	"\\sqsupseteq": "⊒",
	"\\prec": "≺",
	"\\succ": "≻",
	"\\preceq": "⪯",
	"\\succeq": "⪰",
	"\\parallel": "∥",
	"\\mid": "∣",
	"\\dashv": "⊣",
	"\\vdash": "⊢",
	"\\models": "⊨",
	"\\perp": "⊥",
	"\\asymp": "≍",
	"\\doteq": "≐",
	"\\ll": "≪",
	"\\gg": "≫",
	"\\leftarrow": "←",
	"\\rightarrow": "→",
	"\\Leftarrow": "⇐",
	"\\Rightarrow": "⇒",
	"\\leftrightarrow": "↔",
	"\\Leftrightarrow": "⇔",
	"\\mapsto": "↦",
	"\\hookleftarrow": "↩",
	"\\hookrightarrow": "↪",
	"\\leftharpoonup": "↼",
	"\\leftharpoondown": "↽",
	"\\rightharpoonup": "⇀",
	"\\rightharpoondown": "⇁",
	"\\rightleftharpoons": "⇌",
	"\\longleftarrow": "⟵",
	"\\longrightarrow": "⟶",
	"\\Longleftarrow": "⟸",
	"\\Longrightarrow": "⟹",
	"\\longleftrightarrow": "⟷",
	"\\Longleftrightarrow": "⟺",
	"\\longmapsto": "⟼",
	"\\uparrow": "↑",
	"\\downarrow": "↓",
	"\\Uparrow": "⇑",
	"\\Downarrow": "⇓",
	"\\updownarrow": "↕",
	"\\Updownarrow": "⇕",
	"\\nearrow": "↗",
	"\\searrow": "↘",
	"\\swarrow": "↙",
	"\\nwarrow": "↖",
	"\\forall": "∀",
	"\\exists": "∃",
	"\\nexists": "∄",
	"\\neg": "¬",
	"\\top": "⊤",
	"\\bot": "⊥",
	"\\land": "∧",
	"\\lor": "∨",
	"\\to": "→",
	"\\emptyset": "∅",
	"\\varnothing": "∅",
	"\\aleph": "ℵ",
	"\\imath": "ı",
	"\\jmath": "ȷ",
	"\\ell": "ℓ",
	"\\wp": "℘",
	"\\Re": "ℜ",
	"\\Im": "ℑ",
	"\\partial": "∂",
	"\\infty": "∞",
	"\\nabla": "∇",
	"\\triangle": "△",
	"\\Box": "□",
	"\\Diamond": "◇",
	"\\hbar": "ℏ",
	"\\angle": "∠",
	"\\clubsuit": "♣",
	"\\diamondsuit": "♢",
	"\\heartsuit": "♡",
	"\\spadesuit": "♠",
	"\\int": "∫",
	"\\iint": "∬",
	"\\iiint": "∭",
	"\\oint": "∮",
	"\\oiint": "∯",
	"\\oiiint": "∰",
	"\\sum": "∑",
	"\\prod": "∏",
	"\\coprod": "∐",
	"\\bigcup": "⋃",
	"\\bigcap": "⋂",
	"\\bigvee": "⋁",
	"\\bigwedge": "⋀",
	"\\biguplus": "⨄",
	"\\bigsqcup": "⨆",
	"\\bigodot": "⨀",
	"\\bigotimes": "⨂",
	"\\bigoplus": "⨁",
	"\\langle": "⟨",
	"\\rangle": "⟩",
	"\\lfloor": "⌊",
	"\\rfloor": "⌋",
	"\\lceil": "⌈",
	"\\rceil": "⌉",
	"\\{": "{",
	"\\}": "}",
	"\\|": "‖",
	"\\ldots": "…",
	"\\cdots": "⋯",
	"\\vdots": "⋮",
	"\\ddots": "⋱",
	"\\surd": "√",
	"\\prime": "′",
	"\\sharp": "♯",
	"\\flat": "♭",
	"\\natural": "♮",
	"\\mho": "℧",
	"\\Join": "⋈",
	"\\smile": "⌣",
	"\\frown": "⌢",
	"\\sin": "sin",
	"\\cos": "cos",
	"\\tan": "tan",
	"\\cot": "cot",
	"\\sec": "sec",
	"\\csc": "csc",
	"\\arcsin": "arcsin",
	"\\arccos": "arccos",
	"\\arctan": "arctan",
	"\\sinh": "sinh",
	"\\cosh": "cosh",
	"\\tanh": "tanh",
	"\\log": "log",
	"\\ln": "ln",
	"\\exp": "exp",
	"\\lim": "lim",
	"\\max": "max",
	"\\min": "min",
	"\\sup": "sup",
	"\\inf": "inf",
	"\\det": "det",
	"\\gcd": "gcd",
	"\\Pr": "Pr"
};
var SUPERSCRIPT_MAP = {
	"0": "⁰",
	"1": "¹",
	"2": "²",
	"3": "³",
	"4": "⁴",
	"5": "⁵",
	"6": "⁶",
	"7": "⁷",
	"8": "⁸",
	"9": "⁹",
	"+": "⁺",
	"-": "⁻",
	"=": "⁼",
	"(": "⁽",
	")": "⁾",
	a: "ᵃ",
	b: "ᵇ",
	c: "ᶜ",
	d: "ᵈ",
	e: "ᵉ",
	f: "ᶠ",
	g: "ᵍ",
	h: "ʰ",
	i: "ⁱ",
	j: "ʲ",
	k: "ᵏ",
	l: "ˡ",
	m: "ᵐ",
	n: "ⁿ",
	o: "ᵒ",
	p: "ᵖ",
	r: "ʳ",
	s: "ˢ",
	t: "ᵗ",
	u: "ᵘ",
	v: "ᵛ",
	w: "ʷ",
	x: "ˣ",
	y: "ʸ",
	z: "ᶻ",
	A: "ᴬ",
	B: "ᴮ",
	D: "ᴰ",
	E: "ᴱ",
	G: "ᴳ",
	H: "ᴴ",
	I: "ᴵ",
	J: "ᴶ",
	K: "ᴷ",
	L: "ᴸ",
	M: "ᴹ",
	N: "ᴺ",
	O: "ᴼ",
	P: "ᴾ",
	R: "ᴿ",
	T: "ᵀ",
	U: "ᵁ",
	V: "ⱽ",
	W: "ᵂ",
	α: "ᵅ",
	β: "ᵝ",
	γ: "ᵞ",
	δ: "ᵟ",
	ε: "ᵋ",
	θ: "ᶿ",
	ι: "ᶥ",
	υ: "ᶷ",
	φ: "ᶲ",
	χ: "ᵡ"
};
var SUBSCRIPT_MAP = {
	"0": "₀",
	"1": "₁",
	"2": "₂",
	"3": "₃",
	"4": "₄",
	"5": "₅",
	"6": "₆",
	"7": "₇",
	"8": "₈",
	"9": "₉",
	"+": "₊",
	"-": "₋",
	"=": "₌",
	"(": "₍",
	")": "₎",
	a: "ₐ",
	e: "ₑ",
	h: "ₕ",
	i: "ᵢ",
	j: "ⱼ",
	k: "ₖ",
	l: "ₗ",
	m: "ₘ",
	n: "ₙ",
	o: "ₒ",
	p: "ₚ",
	r: "ᵣ",
	s: "ₛ",
	t: "ₜ",
	u: "ᵤ",
	v: "ᵥ",
	x: "ₓ",
	y: "ᵧ",
	β: "ᵦ",
	γ: "ᵧ",
	ρ: "ᵨ",
	φ: "ᵩ",
	χ: "ᵪ"
};
var ACCENT_COMBINING = {
	"\\hat": "̂",
	"\\tilde": "̃",
	"\\bar": "̄",
	"\\overline": "̅",
	"\\vec": "⃗",
	"\\dot": "̇",
	"\\ddot": "̈",
	"\\acute": "́",
	"\\grave": "̀",
	"\\breve": "̆",
	"\\check": "̌",
	"\\mathring": "̊"
};
var XARROW_MAP = {
	"\\xrightarrow": "→",
	"\\xleftarrow": "←",
	"\\xRightarrow": "⇒",
	"\\xLeftarrow": "⇐",
	"\\xleftrightarrow": "↔",
	"\\xLeftrightarrow": "⇔",
	"\\xhookleftarrow": "↩",
	"\\xhookrightarrow": "↪",
	"\\xtwoheadrightarrow": "↠",
	"\\xtwoheadleftarrow": "↞",
	"\\xmapsto": "↦",
	"\\xlongequal": "═"
};
var unicodeMasClection = class {
	bold;
	italic;
	boldItalic;
	script;
	boldScript;
	fraktur;
	doubleStruck;
	sansSerif;
	sansSerifBold;
	sansSerifItalic;
	sansSerifBoldItalic;
	monospace;
	constructor(clection) {
		[this.bold, this.italic, this.boldItalic, this.script, this.boldScript, this.fraktur, this.doubleStruck, this.sansSerif, this.sansSerifBold, this.sansSerifItalic, this.sansSerifBoldItalic, this.monospace] = clection;
	}
};
var UNICODE_MAS_MAP = {
	A: new unicodeMasClection([
		"𝐀",
		"𝐴",
		"𝑨",
		"𝒜",
		"𝓐",
		"𝕬",
		"𝔸",
		"𝖠",
		"𝗔",
		"𝘈",
		"𝘼",
		"𝙰"
	]),
	B: new unicodeMasClection([
		"𝐁",
		"𝐵",
		"𝑩",
		"ℬ",
		"𝓑",
		"𝕭",
		"𝔹",
		"𝖡",
		"𝗕",
		"𝘉",
		"𝘽",
		"𝙱"
	]),
	C: new unicodeMasClection([
		"𝐂",
		"𝐶",
		"𝑪",
		"𝒞",
		"𝓒",
		"𝕮",
		"ℂ",
		"𝖢",
		"𝗖",
		"𝘊",
		"𝘾",
		"𝙲"
	]),
	D: new unicodeMasClection([
		"𝐃",
		"𝐷",
		"𝑫",
		"𝒟",
		"𝓓",
		"𝕯",
		"𝔻",
		"𝖣",
		"𝗗",
		"𝘋",
		"𝘿",
		"𝙳"
	]),
	E: new unicodeMasClection([
		"𝐄",
		"𝐸",
		"𝑬",
		"ℰ",
		"𝓔",
		"𝕰",
		"𝔼",
		"𝖤",
		"𝗘",
		"𝘌",
		"𝙀",
		"𝙴"
	]),
	F: new unicodeMasClection([
		"𝐅",
		"𝐹",
		"𝑭",
		"ℱ",
		"𝓕",
		"𝕱",
		"𝔽",
		"𝖥",
		"𝗙",
		"𝘍",
		"𝙁",
		"𝙵"
	]),
	G: new unicodeMasClection([
		"𝐆",
		"𝐺",
		"𝑮",
		"𝒢",
		"𝓖",
		"𝕲",
		"𝔾",
		"𝖦",
		"𝗚",
		"𝘎",
		"𝙂",
		"𝙶"
	]),
	H: new unicodeMasClection([
		"𝐇",
		"𝐻",
		"𝑯",
		"ℋ",
		"𝓗",
		"𝕳",
		"ℍ",
		"𝖧",
		"𝗛",
		"𝘏",
		"𝙃",
		"𝙷"
	]),
	I: new unicodeMasClection([
		"𝐈",
		"𝐼",
		"𝑰",
		"ℐ",
		"𝓘",
		"𝕴",
		"𝕀",
		"𝖨",
		"𝗜",
		"𝘐",
		"𝙄",
		"𝙸"
	]),
	J: new unicodeMasClection([
		"𝐉",
		"𝐽",
		"𝑱",
		"𝒥",
		"𝓙",
		"𝕵",
		"𝕁",
		"𝖩",
		"𝗝",
		"𝘑",
		"𝙅",
		"𝙹"
	]),
	K: new unicodeMasClection([
		"𝐊",
		"𝐾",
		"𝑲",
		"𝒦",
		"𝓚",
		"𝕶",
		"𝕂",
		"𝖪",
		"𝗞",
		"𝘒",
		"𝙆",
		"𝙺"
	]),
	L: new unicodeMasClection([
		"𝐋",
		"𝐿",
		"𝑳",
		"ℒ",
		"𝓛",
		"𝕷",
		"𝕃",
		"𝖫",
		"𝗟",
		"𝘓",
		"𝙇",
		"𝙻"
	]),
	M: new unicodeMasClection([
		"𝐌",
		"𝑀",
		"𝑴",
		"ℳ",
		"𝓜",
		"𝕸",
		"𝕄",
		"𝖬",
		"𝗠",
		"𝘔",
		"𝙈",
		"𝙼"
	]),
	N: new unicodeMasClection([
		"𝐍",
		"𝑁",
		"𝑵",
		"𝒩",
		"𝓝",
		"𝕹",
		"ℕ",
		"𝖭",
		"𝗡",
		"𝘕",
		"𝙉",
		"𝙽"
	]),
	O: new unicodeMasClection([
		"𝐎",
		"𝑂",
		"𝑶",
		"𝒪",
		"𝓞",
		"𝕺",
		"𝕆",
		"𝖮",
		"𝗢",
		"𝘖",
		"𝙊",
		"𝙾"
	]),
	P: new unicodeMasClection([
		"𝐏",
		"𝑃",
		"𝑷",
		"𝒫",
		"𝓟",
		"𝕻",
		"ℙ",
		"𝖯",
		"𝗣",
		"𝘗",
		"𝙋",
		"𝙿"
	]),
	Q: new unicodeMasClection([
		"𝐐",
		"𝑄",
		"𝑸",
		"𝒬",
		"𝓠",
		"𝕼",
		"ℚ",
		"𝖰",
		"𝗤",
		"𝘘",
		"𝙌",
		"𝚀"
	]),
	R: new unicodeMasClection([
		"𝐑",
		"𝑅",
		"𝑹",
		"ℛ",
		"𝓡",
		"𝕽",
		"ℝ",
		"𝖱",
		"𝗥",
		"𝘙",
		"𝙍",
		"𝚁"
	]),
	S: new unicodeMasClection([
		"𝐒",
		"𝑆",
		"𝑺",
		"𝒮",
		"𝓢",
		"𝕾",
		"𝕊",
		"𝖲",
		"𝗦",
		"𝘚",
		"𝙎",
		"𝚂"
	]),
	T: new unicodeMasClection([
		"𝐓",
		"𝑇",
		"𝑻",
		"𝒯",
		"𝓣",
		"𝕿",
		"𝕋",
		"𝖳",
		"𝗧",
		"𝘛",
		"𝙏",
		"𝚃"
	]),
	U: new unicodeMasClection([
		"𝐔",
		"𝑈",
		"𝑼",
		"𝒰",
		"𝓤",
		"𝖀",
		"𝕌",
		"𝖴",
		"𝗨",
		"𝘜",
		"𝙐",
		"𝚄"
	]),
	V: new unicodeMasClection([
		"𝐕",
		"𝑉",
		"𝑽",
		"𝒱",
		"𝓥",
		"𝖁",
		"𝕍",
		"𝖵",
		"𝗩",
		"𝘝",
		"𝙑",
		"𝚅"
	]),
	W: new unicodeMasClection([
		"𝐖",
		"𝑊",
		"𝑾",
		"𝒲",
		"𝓦",
		"𝖂",
		"𝕎",
		"𝖶",
		"𝗪",
		"𝘞",
		"𝙒",
		"𝚆"
	]),
	X: new unicodeMasClection([
		"𝐗",
		"𝑋",
		"𝑿",
		"𝒳",
		"𝓧",
		"𝖃",
		"𝕏",
		"𝖷",
		"𝗫",
		"𝘟",
		"𝙓",
		"𝚇"
	]),
	Y: new unicodeMasClection([
		"𝐘",
		"𝑌",
		"𝒀",
		"𝒴",
		"𝓨",
		"𝖄",
		"𝕐",
		"𝖸",
		"𝗬",
		"𝘠",
		"𝙔",
		"𝚈"
	]),
	Z: new unicodeMasClection([
		"𝐙",
		"𝑍",
		"𝒁",
		"𝒵",
		"𝓩",
		"𝖅",
		"ℤ",
		"𝖹",
		"𝗭",
		"𝘡",
		"𝙕",
		"𝚉"
	]),
	a: new unicodeMasClection([
		"𝐚",
		"𝑎",
		"𝒂",
		"𝒶",
		"𝓪",
		"𝖆",
		"𝕒",
		"𝖺",
		"𝗮",
		"𝘢",
		"𝙖",
		"𝚊"
	]),
	b: new unicodeMasClection([
		"𝐛",
		"𝑏",
		"𝒃",
		"𝒷",
		"𝓫",
		"𝖇",
		"𝕓",
		"𝖻",
		"𝗯",
		"𝘣",
		"𝙗",
		"𝚋"
	]),
	c: new unicodeMasClection([
		"𝐜",
		"𝑐",
		"𝒄",
		"𝒸",
		"𝓬",
		"𝖈",
		"𝕔",
		"𝖼",
		"𝗰",
		"𝘤",
		"𝙘",
		"𝚌"
	]),
	d: new unicodeMasClection([
		"𝐝",
		"𝑑",
		"𝒅",
		"𝒹",
		"𝓭",
		"𝖉",
		"𝕕",
		"𝖽",
		"𝗱",
		"𝘥",
		"𝙙",
		"𝚍"
	]),
	e: new unicodeMasClection([
		"𝐞",
		"𝑒",
		"𝒆",
		"ℯ",
		"𝓮",
		"𝖊",
		"𝕖",
		"𝖾",
		"𝗲",
		"𝘦",
		"𝙚",
		"𝚎"
	]),
	f: new unicodeMasClection([
		"𝐟",
		"𝑓",
		"𝒇",
		"𝒻",
		"𝓯",
		"𝖋",
		"𝕗",
		"𝖿",
		"𝗳",
		"𝘧",
		"𝙛",
		"𝚏"
	]),
	g: new unicodeMasClection([
		"𝐠",
		"𝑔",
		"𝒈",
		"ℊ",
		"𝓰",
		"𝖌",
		"𝕘",
		"𝗀",
		"𝗴",
		"𝘨",
		"𝙜",
		"𝚐"
	]),
	h: new unicodeMasClection([
		"𝐡",
		"ℎ",
		"𝒉",
		"𝒽",
		"𝓱",
		"𝖍",
		"𝕙",
		"𝗁",
		"𝗵",
		"𝘩",
		"𝙝",
		"𝚑"
	]),
	i: new unicodeMasClection([
		"𝐢",
		"𝑖",
		"𝒊",
		"𝒾",
		"𝓲",
		"𝖎",
		"𝕚",
		"𝗂",
		"𝗶",
		"𝘪",
		"𝙞",
		"𝚒"
	]),
	j: new unicodeMasClection([
		"𝐣",
		"𝑗",
		"𝒋",
		"𝒿",
		"𝓳",
		"𝖏",
		"𝕛",
		"𝗃",
		"𝗷",
		"𝘫",
		"𝙟",
		"𝚓"
	]),
	k: new unicodeMasClection([
		"𝐤",
		"𝑘",
		"𝒌",
		"𝓀",
		"𝓴",
		"𝖐",
		"𝕜",
		"𝗄",
		"𝗸",
		"𝘬",
		"𝙠",
		"𝚔"
	]),
	l: new unicodeMasClection([
		"𝐥",
		"𝑙",
		"𝒍",
		"𝓁",
		"𝓵",
		"𝖑",
		"𝕝",
		"𝗅",
		"𝗹",
		"𝘭",
		"𝙡",
		"𝚕"
	]),
	m: new unicodeMasClection([
		"𝐦",
		"𝑚",
		"𝒎",
		"𝓂",
		"𝓶",
		"𝖒",
		"𝕞",
		"𝗆",
		"𝗺",
		"𝘮",
		"𝙢",
		"𝚖"
	]),
	n: new unicodeMasClection([
		"𝐧",
		"𝑛",
		"𝒏",
		"𝓃",
		"𝓷",
		"𝖓",
		"𝕟",
		"𝗇",
		"𝗻",
		"𝘯",
		"𝙣",
		"𝚗"
	]),
	o: new unicodeMasClection([
		"𝐨",
		"𝑜",
		"𝒐",
		"ℴ",
		"𝓸",
		"𝖔",
		"𝕠",
		"𝗈",
		"𝗼",
		"𝘰",
		"𝙤",
		"𝚘"
	]),
	p: new unicodeMasClection([
		"𝐩",
		"𝑝",
		"𝒑",
		"𝓅",
		"𝓹",
		"𝖕",
		"𝕡",
		"𝗉",
		"𝗽",
		"𝘱",
		"𝙥",
		"𝚙"
	]),
	q: new unicodeMasClection([
		"𝐪",
		"𝑞",
		"𝒒",
		"𝓆",
		"𝓺",
		"𝖖",
		"𝕢",
		"𝗊",
		"𝗾",
		"𝘲",
		"𝙦",
		"𝚚"
	]),
	r: new unicodeMasClection([
		"𝐫",
		"𝑟",
		"𝒓",
		"𝓇",
		"𝓻",
		"𝖗",
		"𝕣",
		"𝗋",
		"𝗿",
		"𝘳",
		"𝙧",
		"𝚛"
	]),
	s: new unicodeMasClection([
		"𝐬",
		"𝑠",
		"𝒔",
		"𝓈",
		"𝓼",
		"𝖘",
		"𝕤",
		"𝗌",
		"𝘀",
		"𝘴",
		"𝙨",
		"𝚜"
	]),
	t: new unicodeMasClection([
		"𝐭",
		"𝑡",
		"𝒕",
		"𝓉",
		"𝓽",
		"𝖙",
		"𝕥",
		"𝗍",
		"𝘁",
		"𝘵",
		"𝙩",
		"𝚝"
	]),
	u: new unicodeMasClection([
		"𝐮",
		"𝑢",
		"𝒖",
		"𝓊",
		"𝓾",
		"𝖚",
		"𝕦",
		"𝗎",
		"𝘂",
		"𝘶",
		"𝙪",
		"𝚞"
	]),
	v: new unicodeMasClection([
		"𝐯",
		"𝑣",
		"𝒗",
		"𝓋",
		"𝓿",
		"𝖛",
		"𝕧",
		"𝗏",
		"𝘃",
		"𝘷",
		"𝙫",
		"𝚟"
	]),
	w: new unicodeMasClection([
		"𝐰",
		"𝑤",
		"𝒘",
		"𝓌",
		"𝔀",
		"𝖜",
		"𝕨",
		"𝗐",
		"𝘄",
		"𝘸",
		"𝙬",
		"𝚠"
	]),
	x: new unicodeMasClection([
		"𝐱",
		"𝑥",
		"𝒙",
		"𝓍",
		"𝔁",
		"𝖝",
		"𝕩",
		"𝗑",
		"𝘅",
		"𝘹",
		"𝙭",
		"𝚡"
	]),
	y: new unicodeMasClection([
		"𝐲",
		"𝑦",
		"𝒚",
		"𝓎",
		"𝔂",
		"𝖞",
		"𝕪",
		"𝗒",
		"𝘆",
		"𝘺",
		"𝙮",
		"𝚢"
	]),
	z: new unicodeMasClection([
		"𝐳",
		"𝑧",
		"𝒛",
		"𝓏",
		"𝔃",
		"𝖟",
		"𝕫",
		"𝗓",
		"𝘇",
		"𝘻",
		"𝙯",
		"𝚣"
	])
};
//#endregion
//#region src/utils.ts
function parse(latex, options) {
	return katex.default.__parse(latex, options);
}
function commandToUnicode(cmd) {
	if (cmd in COMMAND_TO_UNICODE) return COMMAND_TO_UNICODE[cmd];
	if (cmd.startsWith("\\")) return cmd.slice(1);
	return cmd;
}
/** 将文本转换为上标 Unicode */
function toSuperscript(text) {
	return text.split("").map((c) => SUPERSCRIPT_MAP[c] || c).join("");
}
/** 将文本转换为下标 Unicode */
function toSubscript(text) {
	return text.split("").map((c) => SUBSCRIPT_MAP[c] || c).join("");
}
/** 判断文本是否可完全转换为上标/下标 */
function canConvertToSuperscript(text) {
	return text.split("").every((c) => c in SUPERSCRIPT_MAP);
}
function canConvertToSubscript(text) {
	return text.split("").every((c) => c in SUBSCRIPT_MAP);
}
function toUnicodeMAS(text, font) {
	const MAS_MAP = {
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
		mathscr: "script"
	};
	return text.split("").map((c) => MAS_MAP[font] && c in UNICODE_MAS_MAP ? UNICODE_MAS_MAP[c][MAS_MAP[font]] : c).join("");
}
//#endregion
//#region src/index.ts
function astToText(node) {
	if (!node) return "";
	switch (node.type) {
		case "atom":
		case "mathord":
		case "textord": return commandToUnicode(node.text || "");
		case "spacing": {
			const text = node.text || "";
			return {
				"\\quad": "  ",
				"\\qquad": "    ",
				"\\,": "",
				"\\:": " ",
				"\\;": "  ",
				"\\!": "",
				" ": " ",
				"~": " ",
				"\\space": " ",
				"\\nobreakspace": " "
			}[text] || " ";
		}
		case "ordgroup": return (node.body || []).map((n) => astToText(n)).join("");
		case "supsub": {
			const { base, sup, sub } = node;
			let result = astToText(base);
			if (sub) {
				const subText = astToText(sub);
				if (canConvertToSubscript(subText)) result += toSubscript(subText);
				else result += "_(" + subText + ")";
			}
			if (sup) {
				const supText = astToText(sup);
				if (canConvertToSuperscript(supText)) result += toSuperscript(supText);
				else result += "^(" + supText + ")";
			}
			return result;
		}
		case "genfrac": {
			const { numer, denom, hasBarLine, leftDelim, rightDelim } = node;
			const numText = astToText(numer);
			const denText = astToText(denom);
			let result = "";
			if (leftDelim && leftDelim !== ".") result += commandToUnicode(leftDelim);
			if (hasBarLine) result += numText + "⁄" + denText;
			else result += "(" + numText + " " + denText + ")";
			if (rightDelim && rightDelim !== ".") result += commandToUnicode(rightDelim);
			return result;
		}
		case "sqrt": {
			const { body, index } = node;
			const bodyText = astToText(body);
			if (!index) return "√" + (bodyText.length > 1 ? "(" + bodyText + ")" : bodyText);
			else {
				const indexText = astToText(index);
				if (indexText === "3") return "∛" + bodyText;
				if (indexText === "4") return "∜" + bodyText;
				return toSuperscript(indexText) + "√" + bodyText;
			}
		}
		case "leftright": {
			const { body, left, right } = node;
			const content = body.map((n) => astToText(n)).join("");
			const leftDelim = left === "." ? "" : commandToUnicode(left);
			const rightDelim = right === "." ? "" : commandToUnicode(right);
			return leftDelim + content + rightDelim;
		}
		case "delimsizing": {
			const { delim } = node;
			return commandToUnicode(delim);
		}
		case "middle": {
			const { delim } = node;
			return commandToUnicode(delim);
		}
		case "op": {
			const { symbol, name, body } = node;
			if (symbol) return commandToUnicode(name);
			else return (name ? commandToUnicode(name) : "") + (body ? body.map((n) => astToText(n)).join("") : "");
		}
		case "operatorname": {
			const { body } = node;
			return body.map((n) => astToText(n)).join("");
		}
		case "accent": {
			const { label, base, isStretchy } = node;
			const baseText = astToText(base);
			const combining = ACCENT_COMBINING[label];
			if (combining && baseText.length === 1 && !isStretchy) return baseText + combining;
			const accentName = label.replace("\\", "");
			if (accentName === "vec") return "→" + baseText;
			return accentName + "(" + baseText + ")";
		}
		case "accentUnder": {
			const { base } = node;
			return astToText(base) + "̲";
		}
		case "overline": {
			const { body } = node;
			const text = astToText(body);
			if (text.length === 1) return text + "̅";
			return "overline(" + text + ")";
		}
		case "underline": {
			const { body } = node;
			const text = astToText(body);
			if (text.length === 1) return text + "̲";
			return "underline(" + text + ")";
		}
		case "horizBrace": {
			const { isOver, base } = node;
			return astToText(base) + (isOver ? "⏞" : "⏟");
		}
		case "xArrow": {
			const { label, body, below } = node;
			const arrow = XARROW_MAP[label] || "→";
			const aboveText = astToText(body);
			const belowText = below ? astToText(below) : "";
			if (belowText && aboveText) return belowText + " " + arrow + " " + aboveText;
			else if (aboveText) return arrow + " " + aboveText;
			else if (belowText) return belowText + " " + arrow;
			return arrow;
		}
		case "array": {
			const { body, isCD } = node;
			if (isCD) return "[CD: " + body.map((row) => row.map((cell) => astToText(cell)).join(" → ")).join(", ") + "]";
			return "(" + body.map((row) => row.map((cell) => astToText(cell)).join(" ")).join("; ") + ")";
		}
		case "text": {
			const { body } = node;
			return body.map((n) => astToText(n)).join("");
		}
		case "font": {
			const { body, font } = node;
			return toUnicodeMAS(astToText(body), font);
		}
		case "styling": {
			const { body } = node;
			return body.map((n) => astToText(n)).join("");
		}
		case "sizing": {
			const { body } = node;
			return body.map((n) => astToText(n)).join("");
		}
		case "color": {
			const { body } = node;
			return body.map((n) => astToText(n)).join("");
		}
		case "color-token": return "";
		case "enclose": {
			const { label, body } = node;
			const content = astToText(body);
			if (label === "\\boxed") return "[" + content + "]";
			if (label === "\\fbox") return "[" + content + "]";
			return content;
		}
		case "phantom": {
			const { body } = node;
			return body.map((n) => astToText(n)).join("");
		}
		case "vphantom": {
			const { body } = node;
			return astToText(body);
		}
		case "kern": {
			const {} = node;
			return " ";
		}
		case "lap": {
			const { body } = node;
			return astToText(body);
		}
		case "cr": {
			const { newLine } = node;
			return newLine ? "\n" : "";
		}
		case "tag": {
			const { body, tag } = node;
			const content = body.map((n) => astToText(n)).join("");
			const tagText = tag.map((n) => astToText(n)).join("");
			return content + " (" + tagText + ")";
		}
		case "raw": return node.string || "";
		case "size": return "";
		case "rule": {
			const { width } = node;
			return "─".repeat(Math.min(10, Math.ceil(width?.number || 3)));
		}
		case "raisebox": {
			const { body } = node;
			return astToText(body);
		}
		case "smash": {
			const { body } = node;
			return astToText(body);
		}
		case "vcenter": {
			const { body } = node;
			return astToText(body);
		}
		case "mathchoice": {
			const { display } = node;
			return display.map((n) => astToText(n)).join("");
		}
		case "mclass": {
			const { body } = node;
			return body.map((n) => astToText(n)).join("");
		}
		case "pmb": {
			const { body } = node;
			return body.map((n) => astToText(n)).join("");
		}
		case "href": {
			const { body, href } = node;
			return body.map((n) => astToText(n)).join("") + " (" + href + ")";
		}
		case "url": return node.url || "";
		case "html": {
			const { body } = node;
			return body.map((n) => astToText(n)).join("");
		}
		case "htmlmathml": {
			const { html } = node;
			return html.map((n) => astToText(n)).join("");
		}
		case "includegraphics": {
			const { alt, src } = node;
			return alt || "[img:" + (src?.split("/").pop() || "") + "]";
		}
		case "verb": {
			const { body } = node;
			return body || "";
		}
		case "environment": {
			const { nameGroup } = node;
			return astToText(nameGroup);
		}
		case "cdlabel": {
			const { label } = node;
			return astToText(label);
		}
		case "cdlabelparent": {
			const { fragment } = node;
			return astToText(fragment);
		}
		case "infix": {
			const { replaceWith } = node;
			return commandToUnicode(replaceWith);
		}
		case "internal": return "";
		case "accent-token":
		case "op-token": {
			const { text } = node;
			return commandToUnicode(text);
		}
		case "hbox": {
			const { body } = node;
			return body.map((n) => astToText(n)).join("");
		}
		default: {
			const anyNode = node;
			if ("body" in anyNode) if (Array.isArray(anyNode.body)) return anyNode.body.map((n) => astToText(n)).join("");
			else return astToText(anyNode.body);
			if ("text" in anyNode) return commandToUnicode(anyNode.text);
			return "";
		}
	}
}
/**
* 批量转换多个 AST 节点
*/
function nodesToText(nodes) {
	return nodes.map((n) => astToText(n)).join("");
}
/**
* 将 LaTeX 数学表达式转换为 Unicode 纯文本
* @param latex LaTeX 字符串（数学模式内，不需要 $$）
* @returns Unicode 纯文本表示
* @throws 如果 KaTeX 解析失败则抛出错误
*/
function tex2unicode(latex, options) {
	if (typeof latex !== "string") throw new TypeError("tex2unicode: expected a string");
	try {
		const parseTree = parse(latex, options?.katexOptions);
		console.log("KaTeX AST:", JSON.stringify(parseTree, null, 2));
		if (!parseTree) return "";
		return nodesToText(parseTree);
	} catch (err) {
		throw new Error(`Failed to parse LaTeX: ${err.message}`);
	}
}
//#endregion
exports.tex2unicode = tex2unicode;

//# sourceMappingURL=index.cjs.map