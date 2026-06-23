import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as ChevronDown, r as ArrowUpRight, t as Download } from "../_libs/lucide-react.mjs";
import { n as Root2, r as Trigger, t as Content2 } from "../_libs/@radix-ui/react-hover-card+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B19pwtTQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		id: "about",
		label: "about"
	},
	{
		id: "journey",
		label: "journey"
	},
	{
		id: "interests",
		label: "interests"
	},
	{
		id: "reading",
		label: "reading"
	},
	{
		id: "contact",
		label: "contact"
	}
];
function FloatingNav() {
	const [active, setActive] = (0, import_react.useState)("about");
	(0, import_react.useEffect)(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) setActive(entry.target.id);
			});
		}, {
			rootMargin: "-20% 0px -20% 0px",
			threshold: 0
		});
		SECTIONS.forEach((section) => {
			const element = document.getElementById(section.id);
			if (element) observer.observe(element);
		});
		return () => observer.disconnect();
	}, []);
	const scrollToSection = (id) => {
		setActive(id);
		const element = document.getElementById(id);
		if (element) {
			const extraOffset = id === "contact" ? window.innerHeight * .15 : id === "reading" ? window.innerHeight * .01 : id === "journey" ? -window.innerHeight * .8 : id === "interests" ? -window.innerHeight * -.035 : 0;
			const top = element.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + element.getBoundingClientRect().height / 2 + extraOffset;
			window.scrollTo({
				top,
				behavior: "smooth"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 md:block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-5",
			children: SECTIONS.map((section) => {
				const isActive = active === section.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => scrollToSection(section.id),
					className: "group flex w-full items-center justify-end gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whitespace-nowrap text-right text-[0.6rem] lowercase",
						style: {
							fontFamily: "var(--font-mono)",
							letterSpacing: "0.12em",
							color: isActive ? "var(--ink)" : "var(--muted-foreground)",
							transition: "color 200ms ease"
						},
						children: section.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block rounded-full",
						style: {
							width: isActive ? 18 : 5,
							height: 5,
							backgroundColor: isActive ? "var(--accent)" : "var(--rail)",
							transition: "width 300ms ease, background-color 300ms ease"
						}
					})]
				}) }, section.id);
			})
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var HoverCard = Root2;
var HoverCardTrigger = Trigger;
var HoverCardContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-hover-card-content-transform-origin)", className),
	...props
}));
HoverCardContent.displayName = Content2.displayName;
var CONNECTIONS = {
	"j-early-design": ["i-design"],
	"j-eonforge": ["i-design"],
	"j-whomr": ["i-startups", "i-design"],
	"j-interninvy": ["i-startups"],
	"j-pushnote": ["i-design", "i-startups"],
	"j-wemus": ["i-design", "i-startups"],
	"j-afc": ["i-design", "i-startups"],
	"j-reading-turn": [
		"i-semi",
		"i-hardware",
		"i-robotics",
		"i-ai"
	],
	"i-hardware": [
		"i-semi",
		"i-robotics",
		"i-ai",
		"b-1"
	],
	"i-semi": [
		"i-hardware",
		"i-ai",
		"b-1",
		"n-3",
		"n-4",
		"a-semi"
	],
	"i-robotics": [
		"i-hardware",
		"i-ai",
		"a-robotics"
	],
	"i-ai": [
		"i-semi",
		"i-robotics",
		"i-hardware",
		"a-ai"
	],
	"i-design": ["i-startups"],
	"i-startups": [
		"i-design",
		"n-1",
		"b-2",
		"a-leverage"
	],
	"i-now": [
		"i-hardware",
		"i-semi",
		"i-robotics",
		"i-ai",
		"i-design",
		"i-startups"
	],
	"n-1": [
		"j-whomr",
		"i-startups",
		"b-2"
	],
	"n-2": [
		"j-afc",
		"i-design",
		"i-startups"
	],
	"n-3": [
		"i-semi",
		"i-hardware",
		"b-1"
	],
	"n-4": [
		"i-semi",
		"i-ai",
		"b-1"
	],
	"b-1": [
		"i-semi",
		"i-hardware",
		"j-reading-turn",
		"n-3",
		"n-4"
	],
	"b-2": [
		"i-startups",
		"j-whomr",
		"j-afc",
		"j-reading-turn",
		"n-1"
	],
	"b-3": [
		"i-design",
		"j-eonforge",
		"j-wemus"
	],
	"a-manipal": [],
	"a-semi": ["i-semi", "b-1"],
	"a-robotics": ["i-robotics"],
	"a-ai": ["i-ai"],
	"a-leverage": [
		"i-startups",
		"i-ai",
		"i-design"
	]
};
var LABELS = {
	"j-early-design": "Early design",
	"j-eonforge": "EonForge",
	"j-wemus": "Wemus",
	"j-whomr": "Whomr",
	"j-interninvy": "InternInvy",
	"j-pushnote": "PushNote",
	"j-afc": "AFC",
	"j-reading-turn": "The reading turn",
	"j-mit-pathway": "MIT pathway",
	"j-electronics": "Electronics turn",
	"i-hardware": "Hardware",
	"i-semi": "Semiconductors",
	"i-robotics": "Robotics",
	"i-ai": "AI Infrastructure",
	"i-design": "Design",
	"i-startups": "Startups",
	"i-now": "Now",
	"n-1": "Distribution beats development",
	"n-2": "Communities behave like products",
	"n-3": "Manufacturing creates leverage",
	"n-4": "The layer below is the real layer",
	"b-1": "Chip War",
	"b-2": "Poor Charlie's Almanack",
	"b-3": "The Design of Everyday Things",
	"a-manipal": "Manipal",
	"a-semi": "Semiconductors",
	"a-robotics": "Robotics",
	"a-ai": "AI Infrastructure",
	"a-leverage": "Leverage"
};
var ConnectionCtx = (0, import_react.createContext)(null);
function ConnectionProvider({ children }) {
	const [hovered, setHovered] = (0, import_react.useState)(null);
	const value = (0, import_react.useMemo)(() => ({
		hovered,
		setHovered
	}), [hovered]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionCtx.Provider, {
		value,
		children
	});
}
function useConnections() {
	const ctx = (0, import_react.useContext)(ConnectionCtx);
	if (!ctx) throw new Error("useConnections must be used inside ConnectionProvider");
	return ctx;
}
function Connectable({ id, children, className, as = "div" }) {
	const { setHovered } = useConnections();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(as, {
		"data-conn-id": id,
		onMouseEnter: (0, import_react.useCallback)(() => setHovered(id), [id, setHovered]),
		onMouseLeave: (0, import_react.useCallback)(() => setHovered(null), [setHovered]),
		className,
		children
	});
}
function Annotation({ children, label, meta, body, memory, project, connId }) {
	const { setHovered } = useConnections();
	const refs = connId ? CONNECTIONS[connId] ?? [] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HoverCard, {
		openDelay: 120,
		closeDelay: 80,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverCardTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "annotated annotated-trigger",
				"data-conn-id": connId,
				onMouseEnter: () => connId && setHovered(connId),
				onMouseLeave: () => connId && setHovered(null),
				children
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HoverCardContent, {
			side: "top",
			align: "center",
			className: "w-72 border-border bg-card p-4 shadow-[0_8px_30px_-12px_rgba(60,40,20,0.18)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mono-label mb-2",
					children: meta ?? "Annotation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-serif text-lg leading-snug text-foreground",
					children: label
				}),
				body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: body
				}),
				(memory || project) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 space-y-2 border-t pt-3 text-xs leading-relaxed",
					style: { borderColor: "var(--border)" },
					children: [memory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mono-label text-[0.55rem]",
						style: { color: "var(--accent)" },
						children: ["Memory ·", " "]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground/75",
						children: memory
					})] }), project && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mono-label text-[0.55rem]",
						style: { color: "var(--accent)" },
						children: ["Now ·", " "]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground/75",
						children: project
					})] })]
				}),
				refs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mono-label mt-3 flex flex-wrap gap-1 text-[0.55rem]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "var(--accent)" },
						children: "↳"
					}), refs.slice(0, 4).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-sm border px-1.5 py-0.5",
						style: {
							borderColor: "var(--rail)",
							color: "var(--muted-foreground)"
						},
						children: LABELS[r] ?? r
					}, r))]
				})
			]
		})]
	});
}
/**
* STRICTLY CHRONOLOGICAL. Each node is a shift in thinking,
* not just a project — including reading and pathway decisions.
*/
var NODES = [
	{
		id: "early-design",
		connId: "j-early-design",
		title: "Early design period",
		year: "2022",
		subtitle: "The first serious craft",
		summary: "Long before the startups and electronics, the first real obsession was visual and interaction design; copying, redrawing and deconstructing interfaces to understand why they worked.",
		logo: "DSGN",
		tags: [
			"Design",
			"Craft",
			"Self-taught"
		]
	},
	{
		id: "eonforge",
		connId: "j-eonforge",
		title: "EonForge",
		year: "Aug 2023 — Nov 2023",
		subtitle: "UI/UX Design Intern",
		summary: "First professional experience; ERP software for schools. Real users, real constraints, real opinions.",
		logo: "EF",
		tags: [
			"Design",
			"UX",
			"Interfaces"
		]
	},
	{
		id: "whomr",
		connId: "j-whomr",
		title: "Whomr",
		year: "Dec 2023 — Present",
		subtitle: "Founder",
		summary: "Identified a roommate-discovery problem and built a startup around it. MVPs, surveys, user conversations, pitch, angel funding.",
		logo: "WHM",
		tags: [
			"Startup",
			"Validation",
			"Customer Discovery"
		]
	},
	{
		id: "wemus",
		connId: "j-wemus",
		title: "Wemus",
		year: "Oct 2024 — Apr 2025",
		subtitle: "Founder's Office & Operations Intern",
		summary: "Worked on 0 → 1; product research, onboarding, UX decisions, GTM conversations, the operational glue.",
		logo: "WMS",
		tags: [
			"Product",
			"Users",
			"Execution"
		]
	},
	{
		id: "afc",
		connId: "j-afc",
		title: "AFC",
		year: "2025 — Present",
		subtitle: "Aspiring Filmmakers Collective",
		summary: "Started a filmmaking community from scratch and grew it organically to 150+ members. Hosting sessions, challenges, conversations.",
		logo: "AFC",
		tags: [
			"Community",
			"Retention",
			"Behavior"
		]
	},
	{
		id: "reading-turn",
		connId: "j-reading-turn",
		title: "Reading — Understanding — Engineering",
		year: "2026",
		subtitle: "From inputs to direction to commitment",
		summary: "Single handedly the most confusing periods of my life, but amidst the AI boom, when everyone focused on the applications, I was decided to think about what made it happen, the compute, the hardware. and my curiosity led me to EEE at MIT M.",
		logo: "LIFE",
		tags: [
			"Books",
			"Hardware",
			"Semiconductors",
			"Robotics",
			"AI Infra"
		]
	}
];
function JourneyRail() {
	const [activeIdx, setActiveIdx] = (0, import_react.useState)(0);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const containerRef = (0, import_react.useRef)(null);
	const nodeRefs = (0, import_react.useRef)([]);
	const dotRefs = (0, import_react.useRef)([]);
	const [geom, setGeom] = (0, import_react.useState)(null);
	const pathMeasureRef = (0, import_react.useRef)(null);
	const recomputeGeometry = () => {
		const c = containerRef.current;
		if (!c) return;
		const cRect = c.getBoundingClientRect();
		const w = cRect.width;
		const isMd = window.matchMedia("(min-width: 768px)").matches;
		const railCx = isMd ? w / 2 : 24;
		const anchors = dotRefs.current.map((el) => {
			if (!el) return {
				y: 0,
				cx: railCx
			};
			const r = el.getBoundingClientRect();
			return {
				y: r.top - cRect.top + r.height / 2,
				cx: railCx
			};
		});
		if (anchors.length === 0) {
			setGeom(null);
			return;
		}
		const last = anchors[anchors.length - 1].y + 80;
		const h = Math.max(last, cRect.height);
		const sway = isMd ? Math.min(120, w * .12) : 22;
		let d = `M ${railCx},${anchors[0].y}`;
		for (let i = 1; i < anchors.length; i++) {
			const prev = anchors[i - 1];
			const cur = anchors[i];
			const dy = cur.y - prev.y;
			const dir = i % 2 === 1 ? 1 : -1;
			const c1x = railCx + dir * sway;
			const c1y = prev.y + dy * .45;
			const c2x = railCx - dir * sway;
			const c2y = cur.y - dy * .45;
			d += ` C ${c1x},${c1y} ${c2x},${c2y} ${railCx},${cur.y}`;
		}
		let length = 0;
		if (pathMeasureRef.current) {
			pathMeasureRef.current.setAttribute("d", d);
			try {
				length = pathMeasureRef.current.getTotalLength();
			} catch {
				length = h;
			}
		}
		setGeom({
			w,
			h,
			anchors,
			path: d,
			length,
			isMd
		});
	};
	(0, import_react.useLayoutEffect)(() => {
		recomputeGeometry();
		const timer = setTimeout(recomputeGeometry, 600);
		const onResize = () => recomputeGeometry();
		window.addEventListener("resize", onResize);
		return () => {
			clearTimeout(timer);
			window.removeEventListener("resize", onResize);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			const container = containerRef.current;
			if (!container) return;
			const rect = container.getBoundingClientRect();
			const viewportMid = window.innerHeight * .5;
			const railTop = rect.top;
			const railHeight = rect.height;
			const traveled = Math.min(Math.max(viewportMid - railTop, 0), railHeight);
			setProgress(railHeight > 0 ? traveled / railHeight : 0);
			let nextActive = 0;
			nodeRefs.current.forEach((el, i) => {
				if (!el) return;
				if (el.getBoundingClientRect().top - 80 < viewportMid) nextActive = i;
			});
			setActiveIdx(nextActive);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: "relative mx-auto max-w-5xl px-4 sm:px-6",
		children: [
			geom && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				"aria-hidden": true,
				className: "pointer-events-none absolute left-0 top-0",
				width: geom.w,
				height: geom.h,
				style: {
					zIndex: 0,
					overflow: "visible"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: geom.path,
						fill: "none",
						stroke: "var(--rail)",
						strokeWidth: 1.2,
						strokeLinecap: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: geom.path,
						fill: "none",
						stroke: "var(--accent)",
						strokeWidth: 1.6,
						strokeLinecap: "round",
						strokeDasharray: geom.length,
						strokeDashoffset: (1 - progress) * geom.length,
						style: {
							transition: "stroke-dashoffset 120ms linear",
							filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--accent) 35%, transparent))"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: geom.anchors[0]?.cx ?? 0,
						cy: (geom.anchors[0]?.y ?? 0) - 8,
						r: 2.5,
						fill: "var(--rail)"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				"aria-hidden": true,
				width: "0",
				height: "0",
				style: {
					position: "absolute",
					visibility: "hidden"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { ref: pathMeasureRef })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "relative space-y-20 md:space-y-28",
				style: { zIndex: 1 },
				children: NODES.map((node, i) => {
					const isLeft = i % 2 === 0;
					const isActive = i === activeIdx;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						ref: (el) => {
							nodeRefs.current[i] = el;
						},
						className: "relative md:grid md:grid-cols-2 md:gap-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RailDot, {
							ref: (el) => {
								dotRefs.current[i] = el;
							},
							active: isActive,
							reached: i <= activeIdx
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `pl-12 md:pl-0 ${isLeft ? "md:col-start-1 md:pr-10 md:text-right" : "md:col-start-2 md:pl-10"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneyCard, {
								node,
								isActive,
								align: isLeft ? "right" : "left"
							})
						})]
					}, node.id);
				})
			})
		]
	});
}
var RailDot = (0, import_react.forwardRef)(({ active, reached }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref,
		"aria-hidden": true,
		className: "absolute left-6 top-6 z-10 -translate-x-1/2 md:left-1/2",
		style: {
			width: active ? 14 : 11,
			height: active ? 14 : 11,
			borderRadius: 999,
			backgroundColor: reached ? "var(--accent)" : "var(--background)",
			border: `1.5px solid ${reached ? "var(--accent)" : "var(--rail)"}`,
			boxShadow: active ? "0 0 0 4px var(--background), 0 0 14px 2px color-mix(in oklab, var(--accent) 60%, transparent)" : "0 0 0 4px var(--background)",
			transition: "all 300ms ease"
		}
	});
});
RailDot.displayName = "RailDot";
function JourneyCard({ node, isActive, align }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "group relative block rounded-lg border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				borderRadius: 8,
				opacity: isActive ? 1 : .96,
				transition: "opacity 300ms ease"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: `flex items-start gap-4 ${align === "right" ? "md:flex-row-reverse md:text-right" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoSlot, {
						label: node.logo ?? node.title.slice(0, 3),
						active: isActive
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-baseline gap-3 ${align === "right" ? "md:justify-end" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-2xl leading-none text-foreground",
								children: node.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono-label",
								children: node.year
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: node.subtitle
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[15px] leading-relaxed text-foreground/85",
					children: node.summary
				}),
				node.tags && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: `mt-4 flex flex-wrap gap-2 ${align === "right" ? "md:justify-end" : ""}`,
					children: node.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "mono-label rounded-full border px-2.5 py-1 text-[0.62rem]",
						style: { borderColor: "var(--border)" },
						children: t
					}, t))
				})
			]
		})
	});
}
function LogoSlot({ label, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "font-mono flex h-11 w-11 shrink-0 items-center justify-center rounded-md border text-[0.6rem] tracking-widest",
		style: {
			borderColor: active ? "var(--accent)" : "var(--border)",
			color: active ? "var(--accent)" : "var(--muted-foreground)",
			backgroundColor: "color-mix(in oklab, var(--accent) 4%, var(--background))",
			transition: "all 300ms ease"
		},
		children: label
	});
}
var POS = {
	now: {
		x: 50,
		y: 50
	},
	hardware: {
		x: 50,
		y: 18
	},
	semi: {
		x: 78,
		y: 32
	},
	ai: {
		x: 82,
		y: 66
	},
	robotics: {
		x: 55,
		y: 82
	},
	startups: {
		x: 22,
		y: 68
	},
	design: {
		x: 22,
		y: 36
	}
};
var LABEL = {
	now: "NOW",
	hardware: "Hardware",
	semi: "Semiconductors",
	ai: "AI Infrastructure",
	robotics: "Robotics",
	design: "Design",
	startups: "Startups"
};
var CONN_ID = {
	now: "i-now",
	hardware: "i-hardware",
	semi: "i-semi",
	ai: "i-ai",
	robotics: "i-robotics",
	design: "i-design",
	startups: "i-startups"
};
var RELATION_EDGES = [
	["hardware", "now"],
	["semi", "now"],
	["ai", "now"],
	["robotics", "now"],
	["startups", "now"],
	["design", "now"]
];
var PRIMARY_EDGES = [
	["hardware", "semi"],
	["semi", "ai"],
	["hardware", "robotics"],
	["ai", "startups"],
	["startups", "design"],
	["robotics", "startups"],
	["ai", "hardware"]
];
function InterestMap() {
	const [hover, setHover] = (0, import_react.useState)(null);
	const { setHovered, hovered: globalHover } = useConnections();
	const externalActive = (id) => {
		if (!globalHover) return false;
		return globalHover === CONN_ID[id];
	};
	const isNodeActive = (id) => {
		if (hover) {
			if (id === hover) return true;
			return [...PRIMARY_EDGES, ...RELATION_EDGES].some(([a, b]) => a === hover && b === id || b === hover && a === id);
		}
		return externalActive(id) || id === "now";
	};
	const isNodeFaded = (id) => {
		if (!hover) return false;
		return !isNodeActive(id);
	};
	const handleEnter = (id) => {
		setHover(id);
		setHovered(CONN_ID[id]);
	};
	const handleLeave = () => {
		setHover(null);
		setHovered(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto aspect-square w-full max-w-2xl rounded-lg border overflow-hidden",
		style: {
			borderColor: "var(--border)",
			backgroundImage: "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--rail) 70%, transparent) 1px, transparent 0)",
			backgroundSize: "22px 22px"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			className: "absolute inset-0 h-full w-full",
			preserveAspectRatio: "none",
			children: [PRIMARY_EDGES.map(([a, b], i) => {
				const active = hover && (hover === a || hover === b);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: POS[a].x,
					y1: POS[a].y,
					x2: POS[b].x,
					y2: POS[b].y,
					stroke: active ? "var(--accent)" : "var(--rail)",
					strokeWidth: active ? .45 : .15,
					vectorEffect: "non-scaling-stroke",
					style: {
						opacity: hover ? active ? 1 : .08 : .35,
						transition: "all 250ms ease"
					}
				}, `primary-${i}`);
			}), RELATION_EDGES.map(([a, b], i) => {
				const active = hover && (hover === a || hover === b);
				const x1 = POS[a].x;
				const y1 = POS[a].y;
				const x2 = POS[b].x;
				const y2 = POS[b].y;
				const mx = (x1 + x2) / 2;
				const my = (y1 + y2) / 2;
				const dx = x2 - x1;
				const dy = y2 - y1;
				const len = Math.max(Math.sqrt(dx * dx + dy * dy), .001);
				const curve = 10;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M ${x1} ${y1} Q ${mx - dy / len * curve} ${my + dx / len * curve} ${x2} ${y2}`,
					fill: "none",
					stroke: active ? "var(--accent)" : "var(--rail)",
					strokeWidth: active ? .4 : .15,
					strokeDasharray: "4 5",
					vectorEffect: "non-scaling-stroke",
					style: {
						opacity: hover ? active ? .8 : .04 : .18,
						transition: "all 250ms ease"
					},
					children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
						attributeName: "stroke-dashoffset",
						from: "0",
						to: "-60",
						dur: "2s",
						repeatCount: "indefinite"
					})
				}, `relation-${i}`);
			})]
		}), Object.keys(POS).map((id) => {
			const isCenter = id === "now";
			const active = isNodeActive(id);
			const faded = isNodeFaded(id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onMouseEnter: () => handleEnter(id),
				onMouseLeave: handleLeave,
				"data-conn-id": CONN_ID[id],
				className: "absolute -translate-x-1/2 -translate-y-1/2 outline-none",
				style: {
					left: `${POS[id].x}%`,
					top: `${POS[id].y}%`
				},
				"aria-label": LABEL[id],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `flex items-center justify-center border transition-all duration-300 ${isCenter ? "font-mono text-[0.65rem] tracking-widest rounded-full" : "font-serif whitespace-nowrap rounded-lg"}`,
					style: {
						width: isCenter ? 84 : void 0,
						minWidth: isCenter ? void 0 : 110,
						height: isCenter ? 84 : 38,
						padding: isCenter ? void 0 : "0 14px",
						borderColor: active ? "var(--accent)" : "var(--border)",
						backgroundColor: isCenter ? "var(--foreground)" : active ? "color-mix(in oklab, var(--accent) 10%, var(--background))" : "var(--background)",
						color: isCenter ? "var(--background)" : active ? "var(--accent)" : "var(--foreground)",
						opacity: faded ? .35 : 1,
						boxShadow: active && !isCenter ? "0 6px 22px -10px color-mix(in oklab, var(--accent) 60%, transparent)" : "none"
					},
					children: LABEL[id]
				})
			}, id);
		})]
	});
}
var BOOKS = [
	{
		id: "b-1",
		connId: "b-1",
		title: "Chip War",
		author: "Chris Miller",
		whyItMattered: "Turned a vague interest in hardware into a specific interest in semiconductors; the slow, expensive, geopolitical layer underneath everything.",
		keyIdea: "Compute is a physical asset. Whoever controls the manufacturing controls the ceiling of what the rest of the stack can do."
	},
	{
		id: "b-2",
		connId: "b-2",
		title: "Poor Charlie's Almanack",
		author: "Charles T. Munger",
		whyItMattered: "Reframed how I think about leverage; not as effort, but as a chosen position. Quietly reorganized how I evaluate every decision around Whomr.",
		keyIdea: "Worldly wisdom is a latticework of mental models. The person with more models sees the same situation more clearly."
	},
	{
		id: "b-3",
		connId: "b-3",
		title: "The Design of Everyday Things",
		author: "Don Norman",
		whyItMattered: "The first book that made design feel like a discipline instead of a taste. Everything I noticed at EonForge and Wemus had a name in here.",
		keyIdea: "Good design makes the right action obvious and the wrong action awkward. Bad design blames the user."
	}
];
function ReadingList() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-5xl px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2",
			children: BOOKS.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Connectable, {
				id: b.connId,
				as: "article",
				className: `rounded-lg border border-border bg-card p-4 ${i === 0 ? "md:col-span-2 md:grid md:grid-cols-[1fr_2fr] md:gap-4" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { borderColor: "var(--border)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-2xl text-foreground",
						children: b.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono-label mt-1",
						children: b.author
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${i === 0 ? "" : "mt-4 "}space-y-3 text-[15px] leading-relaxed text-foreground/85`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Why it mattered",
						children: b.whyItMattered
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Key idea",
						children: b.keyIdea
					})]
				})]
			}, b.id))
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mono-label mb-1 text-[0.6rem]",
		style: { color: "var(--accent)" },
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children })] });
}
/**
* A short vertical rail segment used between sections to make the page
* feel like a continuous path from Journey → Contact (per spec). Sits
* inline in place of the horizontal Divider.
*/
function SectionRail({ height = 96, withDot = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: "mx-auto flex max-w-6xl flex-col items-center px-6",
		style: {
			paddingTop: 40,
			paddingBottom: 40
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-px md:ml-0",
			style: {
				height,
				backgroundColor: "var(--rail)",
				position: "relative"
			},
			children: withDot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
				style: {
					backgroundColor: "var(--rail)",
					boxShadow: "0 0 0 4px var(--background)"
				}
			})
		})
	});
}
var RESUMES = [{
	id: "engineering",
	label: "Engineering"
}, {
	id: "generalist",
	label: "Generalist"
}];
function ResumeDropdown() {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const dropdownRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const handleDownload = (resume) => {
		window.location.href = `/resume-${resume.id}.pdf`;
		setIsOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		ref: dropdownRef,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setIsOpen(!isOpen),
			className: "mono-label flex items-center gap-1.5 px-3 py-1 rounded text-[0.65rem] transition-colors hover:text-accent",
			children: ["Get my resume", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
				className: "h-3 w-3",
				style: {
					transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
					transition: "transform 200ms"
				}
			})]
		}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute right-0 mt-1 w-40 rounded border bg-background shadow-lg z-50",
			style: { borderColor: "var(--border)" },
			children: RESUMES.map((resume) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-3 py-2 border-b last:border-b-0 hover:bg-accent hover:text-background transition-colors group text-xs",
				style: { borderColor: "var(--border)" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: resume.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => handleDownload(resume),
					className: "p-0.5 rounded transition-colors opacity-50 group-hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" })
				})]
			}, resume.id))
		})]
	});
}
function ParticleBackground() {
	const canvasRef = (0, import_react.useRef)(null);
	const particlesRef = (0, import_react.useRef)([]);
	(0, import_react.useRef)([]);
	const docHeightRef = (0, import_react.useRef)(0);
	const mouseRef = (0, import_react.useRef)({
		x: 0,
		y: 0,
		active: false
	});
	const colorsRef = (0, import_react.useRef)({ accent: "#cc5433" });
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const getDocHeight = () => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
		const updateColors = () => {
			colorsRef.current = { accent: getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#cc5433" };
		};
		updateColors();
		const updateCaches = () => {
			docHeightRef.current = getDocHeight();
		};
		const initialCacheTimeout = setTimeout(updateCaches, 300);
		const observer = new MutationObserver(updateCaches);
		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: true
		});
		const handleResize = () => {
			const w = window.innerWidth;
			const h = window.innerHeight;
			const dpr = window.devicePixelRatio || 1;
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(dpr, dpr);
			updateCaches();
			updateColors();
			if (particlesRef.current.length === 0) initParticles();
		};
		const initParticles = () => {
			const w = window.innerWidth;
			const docH = getDocHeight();
			const viewports = docH / window.innerHeight;
			const count = Math.max(90, Math.round(viewports * 20));
			const newParticles = [];
			const cols = Math.ceil(Math.sqrt(count * (w / docH)));
			const rows = Math.ceil(count / cols);
			const cellW = w / cols;
			const cellH = docH / rows;
			for (let r = 0; r < rows && newParticles.length < count; r++) for (let c = 0; c < cols && newParticles.length < count; c++) {
				const spawnX = cellW * c + Math.random() * cellW;
				const spawnY = cellH * r + Math.random() * cellH;
				newParticles.push({
					x: spawnX,
					y: spawnY,
					originX: spawnX,
					originY: spawnY,
					vx: 0,
					vy: 0,
					radius: 1.6 + Math.random() * .6,
					alpha: .4 + Math.random() * .2
				});
			}
			particlesRef.current = newParticles;
		};
		handleResize();
		initParticles();
		const handleMouseMove = (e) => {
			mouseRef.current = {
				x: e.clientX,
				y: e.clientY,
				active: true
			};
		};
		const handleMouseLeave = () => {
			mouseRef.current.active = false;
		};
		const handleMouseEnter = () => {
			mouseRef.current.active = true;
		};
		window.addEventListener("resize", handleResize);
		window.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseleave", handleMouseLeave);
		document.addEventListener("mouseenter", handleMouseEnter);
		let animationFrameId;
		const tick = () => {
			const vpW = window.innerWidth;
			const vpH = window.innerHeight;
			const scrollX = window.scrollX;
			const scrollY = window.scrollY;
			docHeightRef.current || getDocHeight();
			ctx.clearRect(0, 0, vpW, vpH);
			const visBand = 120;
			const visTop = scrollY - visBand;
			const visBot = scrollY + vpH + visBand;
			const particles = particlesRef.current;
			const mouse = mouseRef.current;
			const colors = colorsRef.current;
			const mouseDocX = mouse.x + scrollX;
			const mouseDocY = mouse.y + scrollY;
			const visible = [];
			for (const p of particles) if (p.y >= visTop && p.y <= visBot) visible.push(p);
			ctx.lineWidth = .2;
			for (let i = 0; i < visible.length; i++) for (let j = i + 1; j < visible.length; j++) {
				const p1 = visible[i];
				const p2 = visible[j];
				const dx = p2.x - p1.x;
				const dy = p2.y - p1.y;
				const dist = Math.hypot(dx, dy);
				if (dist < 80) {
					const alpha = (1 - dist / 80) * .015;
					let mouseBoost = 1;
					if (mouse.active) {
						const midX = (p1.x + p2.x) / 2;
						const midY = (p1.y + p2.y) / 2;
						const mDist = Math.hypot(midX - mouseDocX, midY - mouseDocY);
						if (mDist < 150) mouseBoost = 1 + (1 - mDist / 150) * 3;
					}
					const vx1 = p1.x - scrollX;
					const vy1 = p1.y - scrollY;
					const vx2 = p2.x - scrollX;
					const vy2 = p2.y - scrollY;
					ctx.beginPath();
					ctx.moveTo(vx1, vy1);
					ctx.lineTo(vx2, vy2);
					ctx.globalAlpha = alpha * mouseBoost;
					ctx.strokeStyle = colors.accent;
					ctx.stroke();
				}
			}
			for (const p of particles) {
				if (mouse.active) {
					const dx = mouseDocX - p.x;
					const dy = mouseDocY - p.y;
					const dist = Math.hypot(dx, dy);
					if (dist < 160 && dist > 0) {
						const t = dist / 160;
						const strength = (1 - t * t) * .04;
						p.vx += dx / dist * strength;
						p.vy += dy / dist * strength;
					}
					for (const other of visible) {
						if (other === p) continue;
						const dx2 = other.x - p.x;
						const dy2 = other.y - p.y;
						const dist2 = Math.hypot(dx2, dy2);
						if (dist2 > 0 && dist2 < 60) {
							const force = (dist2 - 30) * .002;
							p.vx += dx2 / dist2 * force;
							p.vy += dy2 / dist2 * force;
						}
					}
					p.x += p.vx;
					p.y += p.vy;
					p.vx *= .95;
					p.vy *= .95;
					const speed = Math.hypot(p.vx, p.vy);
					const maxSpeed = .5;
					if (speed > maxSpeed) {
						p.vx = p.vx / speed * maxSpeed;
						p.vy = p.vy / speed * maxSpeed;
					}
				} else if (p.x !== p.originX || p.y !== p.originY) {
					const dx = p.originX - p.x;
					const dy = p.originY - p.y;
					if (Math.hypot(dx, dy) > .5) {
						const springStrength = .01;
						const dampFactor = .85;
						p.vx += dx * springStrength;
						p.vy += dy * springStrength;
						p.vx *= dampFactor;
						p.vy *= dampFactor;
						p.x += p.vx;
						p.y += p.vy;
					} else {
						p.x = p.originX;
						p.y = p.originY;
						p.vx = 0;
						p.vy = 0;
					}
				}
				const screenX = p.x - scrollX;
				const screenY = p.y - scrollY;
				if (screenX < -20 || screenX > vpW + 20 || screenY < -20 || screenY > vpH + 20) continue;
				ctx.beginPath();
				ctx.arc(screenX, screenY, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = colors.accent;
				ctx.globalAlpha = p.alpha;
				ctx.fill();
			}
			animationFrameId = requestAnimationFrame(tick);
		};
		tick();
		return () => {
			cancelAnimationFrame(animationFrameId);
			clearTimeout(initialCacheTimeout);
			observer.disconnect();
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseleave", handleMouseLeave);
			document.removeEventListener("mouseenter", handleMouseEnter);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		style: {
			position: "fixed",
			inset: 0,
			pointerEvents: "none",
			zIndex: 0
		}
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConnectionProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleBackground, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-10 min-h-screen text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloatingNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-6 pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#about",
					className: "font-serif text-lg tracking-tight",
					children: ["V", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "var(--accent)" },
						children: "."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeDropdown, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Divider, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Journey, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionRail, {
				height: 120,
				withDot: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Interests, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionRail, {
				height: 240,
				withDot: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reading, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionRail, { height: 140 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				id: "bottom",
				className: "mx-auto max-w-6xl px-6 py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mono-label flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© Vaishnav" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "made with purpose" })]
				})
			})
		]
	})] });
}
function Divider() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto my-24 max-w-6xl px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-px w-full",
			style: { backgroundColor: "var(--border)" }
		})
	});
}
function SectionHeader({ index, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto mb-12 flex max-w-5xl items-baseline gap-6 px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mono-label",
			children: index
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-serif text-3xl text-foreground sm:text-4xl",
			children: title
		})]
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "about",
		className: "mx-auto flex min-h-[88vh] max-w-5xl flex-col justify-center px-6 pt-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mono-label mb-6",
				children: "01 / About"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl",
				children: ["Vaishnav", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { color: "var(--accent)" },
					children: "."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-foreground/85 sm:text-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"EE student at",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Annotation, {
							label: "MIT Manipal",
							meta: "Education · 2026—2030",
							body: "Electrical Engineering.",
							memory: "just getting started",
							project: "working on things",
							connId: "a-manipal",
							children: "Manipal"
						}),
						". Interested in",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Annotation, {
							label: "Semiconductors",
							meta: "Curiosity",
							body: "the layer underneath all of modern technology.",
							memory: "it all started from semiconductors during jee",
							project: "trying to learn more about semiconductors",
							connId: "a-semi",
							children: "semiconductors"
						}),
						",",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Annotation, {
							label: "Robotics",
							meta: "Curiosity",
							body: "intersection of hardware, software and control.",
							memory: "it started from breaking down old toys, piecing parts together, and building small robots",
							project: "learning comp vision",
							connId: "a-robotics",
							children: "robotics"
						}),
						",",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Annotation, {
							label: "AI",
							meta: "Curiosity",
							body: "the infra and data that makes modern AI possible",
							memory: "being curious about how ml, neural networks and transformers work",
							project: "learning the underlying math and building small scale models",
							connId: "a-ai",
							children: "AI"
						}),
						", and the people who build ambitious things."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Currently exploring how hardware, software and business intersect to create",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Annotation, {
							label: "Leverage",
							meta: "Working definition",
							body: "how a proportionally small input, a process, a piece of infra, a relationship; redefines the output of a system.",
							memory: "how data companies, fabs and other manufacturing companies have insane leverage; high demand, low supply, and high switching costs",
							project: "reading the almanac, understanding business",
							connId: "a-leverage",
							children: "leverage"
						}),
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-foreground/70",
						children: "This site isn't a portfolio. It's a map of curiosity. I'm still figuring out my niche. This site is where I keep track, and share to the world."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mono-label mt-20 flex items-center gap-3 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block h-px w-8",
					style: { backgroundColor: "var(--rail)" }
				}), "Begin the path"]
			})
		]
	});
}
function Journey() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "journey",
		className: "scroll-mt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				index: "02 / Journey",
				title: "How the thinking evolved"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto mb-16 max-w-2xl px-6 text-base leading-relaxed text-muted-foreground",
				children: [
					"A chain of cause and effect. Each milestone explains:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "font-serif text-foreground",
						children: "what happened"
					}),
					",",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "font-serif text-foreground",
						children: "what I learned"
					}),
					", and",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "font-serif text-foreground",
						children: "what changed afterward"
					}),
					". The rail fills as you read."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JourneyRail, {})
		]
	});
}
function Interests() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "interests",
		className: "scroll-mt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
			index: "03 / Current Interests",
			title: "A thinking map, not a list"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-[1fr_1.2fr] md:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5 text-foreground/85",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-base leading-relaxed",
						children: [
							"These aren't isolated interests; they influence each other. Hover any node to see what it connects to. Everything eventually loops back to ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "font-serif",
								children: "NOW"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mono-label space-y-1 pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Hardware ↔ Semiconductors" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Semiconductors ↔ AI Infrastructure" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· AI Infrastructure ↔ Startups" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Startups ↔ Design" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Everything → NOW" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-relaxed text-muted-foreground",
						children: ["These nodal maps are heavily inspired from Obsidian, where It all just ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: "font-serif text-foreground",
							children: "connects."
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InterestMap, {})]
		})]
	});
}
function Reading() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "reading",
		className: "scroll-mt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
				index: "05 / Reading",
				title: "Influences, not recommendations"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto mb-10 max-w-2xl px-6 text-sm leading-relaxed text-muted-foreground",
				children: [
					"Each book card carries four editable fields:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "font-serif text-foreground",
						children: "why it mattered"
					}),
					",",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "font-serif text-foreground",
						children: "key idea"
					}),
					",",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "font-serif text-foreground",
						children: "related interests"
					}),
					", and",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
						className: "font-serif text-foreground",
						children: "related observations"
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadingList, {})
		]
	});
}
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "flex min-h-screen scroll-mt-24 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex flex-col items-center pb-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "h-20 w-px",
						style: { backgroundColor: "var(--rail)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "-mt-1.5 h-4 w-4 rounded-full",
						style: {
							backgroundColor: "var(--accent)",
							boxShadow: "0 0 0 4px var(--background), 0 0 18px 2px color-mix(in oklab, var(--accent) 60%, transparent)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono-label mt-4 text-[0.6rem]",
						children: "The path continues; through people"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono-label mb-6",
						children: "06 / Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-5xl leading-tight text-foreground sm:text-6xl",
						children: "Let's talk."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-serif text-xl text-muted-foreground",
						children: "Hardware. Startups. Research. Interesting problems."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://vaissshnav.substack.com",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-4 inline-flex items-center gap-2 mono-label text-[0.65rem] transition-colors hover:text-accent",
						children: ["subscribe to my substack", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							className: "h-3 w-3",
							style: { color: "var(--accent)" }
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mx-auto mt-12 grid max-w-md gap-px overflow-hidden rounded-lg border text-left",
						style: {
							borderColor: "var(--border)",
							backgroundColor: "var(--border)"
						},
						children: [
							{
								label: "Email",
								href: "mailto:vaishnavkumarsw@gmail.com",
								hint: "fastest"
							},
							{
								label: "LinkedIn",
								href: "https://linkedin.com/in/panyamvk",
								hint: "/in/panyamvk"
							},
							{
								label: "X",
								href: "https://x.com",
								hint: "coming soon"
							},
							{
								label: "Calendly",
								href: "https://calendly.com/vaissshnav/1-on-1-personal-chat",
								hint: "15 min"
							}
						].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: l.href,
								className: "group flex items-center justify-between px-5 py-4 transition-colors hover:bg-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-serif text-lg text-foreground",
									children: l.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono-label",
										children: l.hint
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
										className: "h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
										style: { color: "var(--accent)" }
									})]
								})]
							})
						}, l.label))
					})
				]
			})]
		})
	});
}
//#endregion
export { Home as component };
