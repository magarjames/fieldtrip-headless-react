import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import "./router-BdJbH5zd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/northline-Bd_s3yS6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NorthlineScrollFilm({ scenes }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "journal",
		className: "nl-film",
		"aria-label": "Northline campaign journal",
		children: scenes.map((scene, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
			className: `nl-film-step nl-film-step-${scene.tone}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nl-film-frame",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "nl-film-media",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "nl-film-poster",
						src: scene.image,
						alt: scene.alt,
						loading: index === 0 ? "eager" : "lazy",
						decoding: "async"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "nl-film-sprite",
						style: { backgroundImage: `url(${scene.motionSprite})` },
						"aria-hidden": "true"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "nl-film-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "nl-film-index",
							"aria-hidden": "true",
							children: [
								String(index + 1).padStart(2, "0"),
								" / ",
								String(scenes.length).padStart(2, "0")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: scene.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: scene.copy }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "nl-film-motion-preview",
							href: scene.motionPreview,
							target: "_blank",
							rel: "noreferrer",
							children: "Open 30-frame GIF"
						})
					]
				})]
			})
		}, scene.title))
	});
}
var detail_blue_default = "/assets/detail-blue-CKbiPOwp.jpg";
var film_arrival_default = "/assets/film-arrival-Dl2L1jEl.png";
var film_material_default = "/assets/film-material-X9WVxpOr.png";
var film_terminal_default = "/assets/film-terminal-BAUEZyYr.png";
var flatlay_default = "/assets/flatlay-9d5QaqnP.jpg";
var hero_dawn_default = "/assets/hero-dawn-6TPsLdgK.png";
var materials_default = "/assets/materials-CQ6v9x-F.jpg";
var products = [
	{
		id: "transit-shell",
		name: "Transit shell",
		group: "Outer layers",
		price: "GBP 148",
		image: hero_dawn_default,
		alt: "Model wearing a black technical shell and charcoal cargo trousers against a pale dawn sky.",
		description: "A softly structured weather layer with a cropped line and room for the layers you already own.",
		colors: ["Graphite", "Deep navy"],
		sizes: [
			"XS",
			"S",
			"M",
			"L",
			"XL"
		]
	},
	{
		id: "arc-cargo",
		name: "Arc cargo",
		group: "Bottoms",
		price: "GBP 96",
		image: flatlay_default,
		alt: "Black utility trousers shown in an overhead studio flat lay.",
		description: "Relaxed utility trousers with a clean drape, a calmer pocket layout, and an adjustable finish.",
		colors: ["Black", "Charcoal"],
		sizes: [
			"XS",
			"S",
			"M",
			"L",
			"XL"
		]
	},
	{
		id: "line-crossbody",
		name: "Line crossbody",
		group: "Carry goods",
		price: "GBP 74",
		image: detail_blue_default,
		alt: "Close detail of a dark technical jacket sleeve with an acid-lime drawcord.",
		description: "A compact crossbody for the things that are annoying to hold and too useful to leave behind.",
		colors: ["Lime", "Black"],
		sizes: ["One size"]
	},
	{
		id: "shift-crew",
		name: "Shift crew",
		group: "Outer layers",
		price: "GBP 62",
		image: materials_default,
		alt: "Black cotton, ripstop fabric, and lime lining arranged with a metal zipper.",
		description: "A dense everyday layer built around a simple fit, visible texture, and an easy collar.",
		colors: ["Washed black", "Stone"],
		sizes: [
			"XS",
			"S",
			"M",
			"L",
			"XL"
		]
	}
];
var filters = [
	"All",
	"Outer layers",
	"Bottoms",
	"Carry goods"
];
function NorthlinePage() {
	const [activeFilter, setActiveFilter] = (0, import_react.useState)("All");
	const deferredFilter = (0, import_react.useDeferredValue)(activeFilter);
	const [activeProduct, setActiveProduct] = (0, import_react.useState)(null);
	const [selectedColor, setSelectedColor] = (0, import_react.useState)("");
	const [selectedSize, setSelectedSize] = (0, import_react.useState)("");
	const [bag, setBag] = (0, import_react.useState)([]);
	const [bagOpen, setBagOpen] = (0, import_react.useState)(false);
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [signupMessage, setSignupMessage] = (0, import_react.useState)("");
	const shownProducts = products.filter((product) => deferredFilter === "All" || product.group === deferredFilter);
	(0, import_react.useEffect)(() => {
		if (!activeProduct && !bagOpen && !mobileMenuOpen) return;
		const onKeyDown = (event) => {
			if (event.key !== "Escape") return;
			setActiveProduct(null);
			setBagOpen(false);
			setMobileMenuOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [
		activeProduct,
		bagOpen,
		mobileMenuOpen
	]);
	function openProduct(product) {
		setActiveProduct(product);
		setSelectedColor(product.colors[0]);
		setSelectedSize(product.sizes[0]);
	}
	function addToBag(product) {
		(0, import_react.startTransition)(() => {
			setBag((current) => [...current, product]);
			setBagOpen(true);
			setActiveProduct(null);
		});
	}
	function removeFromBag(index) {
		setBag((current) => current.filter((_, itemIndex) => itemIndex !== index));
	}
	function submitSignup(event) {
		event.preventDefault();
		if (!email.includes("@")) {
			setSignupMessage("Enter a valid email address to join the list.");
			return;
		}
		setSignupMessage("Thanks. Northline notes will go to " + email + ".");
		setEmail("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "northline",
		"data-direction-contract": "THESIS: an editorial utility store that treats clothing as an answer to city movement, not a status display. OWN-WORLD: a pale dawn sky, deep ink typography, white canvas, one clay ember feature block, and precise pill controls. STORY: discover a concise collection, inspect an item, and add it to a bag. FIRST VIEWPORT: a large Northline wordmark, a clean fashion silhouette, and a right-aligned statement. FORM: original luxury utility storefront with alternating light and dark bands. FINISH: documented, responsive, and reviewed.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "nl-skip-link",
				href: "#collection",
				children: "Skip to collection"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "nl-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "nl-wordmark",
						href: "#top",
						"aria-label": "Northline home",
						children: "Northline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "nl-nav",
						"aria-label": "Primary navigation",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#collection",
								children: "Shop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#materials",
								children: "Materials"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#journal",
								children: "Journal"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nl-header-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "nl-bag-button",
							type: "button",
							onClick: () => setBagOpen(true),
							"aria-haspopup": "dialog",
							children: ["Bag ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bag.length })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "nl-menu-button",
							type: "button",
							onClick: () => setMobileMenuOpen((open) => !open),
							"aria-expanded": mobileMenuOpen,
							"aria-controls": "northline-mobile-menu",
							children: mobileMenuOpen ? "Close" : "Menu"
						})]
					}),
					mobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						id: "northline-mobile-menu",
						className: "nl-mobile-menu",
						"aria-label": "Mobile navigation",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#collection",
								onClick: () => setMobileMenuOpen(false),
								children: "Shop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#materials",
								onClick: () => setMobileMenuOpen(false),
								children: "Materials"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#journal",
								onClick: () => setMobileMenuOpen(false),
								children: "Journal"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "nl-hero",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "nl-hero-image",
								src: hero_dawn_default,
								alt: "Model wearing Northline-inspired black utility outerwear against a pale dawn sky.",
								decoding: "async"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "nl-hero-scrim" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "nl-hero-wordmark",
								"aria-hidden": "true",
								children: "Northline"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "nl-hero-content",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "nl-hero-place",
										children: "Northline goods for city weather"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Built for the", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "long way home." })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "nl-hero-copy",
										children: "Purposeful layers and carry goods for platforms, pavements, and everything after."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "nl-hero-actions",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "nl-button nl-button-primary",
											href: "#collection",
											children: "Shop the collection"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "nl-button nl-button-quiet",
											href: "#materials",
											children: "See the material"
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "collection",
						className: "nl-collection",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "nl-collection-intro nl-reveal",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Less to carry.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "More to rely on." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every piece earns its place by keeping one part of a busy day simpler." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "nl-filter-row",
								"aria-label": "Filter the collection",
								children: filters.map((filter) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: activeFilter === filter ? "is-active" : "",
									type: "button",
									"aria-pressed": activeFilter === filter,
									onClick: () => (0, import_react.startTransition)(() => setActiveFilter(filter)),
									children: filter
								}, filter))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "nl-product-grid",
								children: shownProducts.map((product, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "nl-product nl-reveal",
									"data-product-index": index,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "nl-product-image",
											onClick: () => openProduct(product),
											"aria-label": "Quick view " + product.name,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: product.image,
												alt: product.alt,
												loading: "lazy"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "nl-product-copy",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: product.group }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: product.name })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: product.price })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "nl-product-actions",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => openProduct(product),
												children: "Quick view"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => addToBag(product),
												children: "Add to bag"
											})]
										})
									]
								}, product.id))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "materials",
						className: "nl-materials",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
							className: "nl-material-image nl-reveal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: materials_default,
								alt: "Close textile study of cotton, ripstop, lime lining, and zipper hardware.",
								loading: "lazy"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nl-material-copy nl-reveal",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Fabric does", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "the talking." })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The collection begins with texture, weight, and the small parts that stay useful after the first wear." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "nl-material-list",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Dense cotton" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Soft enough for a long day. Structured enough to keep its line." })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Ripstop nylon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A lightweight answer for unpredictable weather and overpacked bags." })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Plain hardware" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Zips and closures that do their work without becoming the whole look." })] })
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "nl-system",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nl-system-copy nl-reveal",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "One less decision before the door." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A shell, a cargo, a smaller bag. Designed to work together without needing a uniform." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "nl-text-action",
									type: "button",
									onClick: () => openProduct(products[0]),
									children: "Build the starting set"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
							className: "nl-system-image nl-reveal",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: flatlay_default,
								alt: "Graphite outerwear, utility trousers, compact bag, and socks arranged as a complete outfit.",
								loading: "lazy"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NorthlineScrollFilm, { scenes: [
						{
							image: film_arrival_default,
							motionSprite: "/northline-motion/film-arrival-sprite.webp",
							motionPreview: "/northline-motion/film-arrival-motion.gif",
							alt: "Person in black technical outerwear walking across a pale concrete terrace at dawn.",
							title: "Leave with less friction.",
							copy: "A considered layer keeps the first five minutes outside from deciding the rest of your day.",
							tone: "dawn"
						},
						{
							image: film_material_default,
							motionSprite: "/northline-motion/film-material-sprite.webp",
							motionPreview: "/northline-motion/film-material-motion.gif",
							alt: "Close study of a black technical shell showing its hood, shoulder, and seam work.",
							title: "Let the material answer.",
							copy: "Weather-resistant structure, quiet hardware, and enough room to move through the day.",
							tone: "material"
						},
						{
							image: film_terminal_default,
							motionSprite: "/northline-motion/film-terminal-sprite.webp",
							motionPreview: "/northline-motion/film-terminal-motion.gif",
							alt: "Person in black outerwear standing in a dark rain-slick transit concourse.",
							title: "Keep the last mile open.",
							copy: "When the platform empties, the useful parts are the ones that are still with you.",
							tone: "terminal"
						}
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "nl-signup",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nl-signup-content nl-reveal",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Keep the line open." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "New releases, restocks, and useful notes. Nothing daily." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "nl-signup-form",
									onSubmit: submitSignup,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "northline-email",
											children: "Email address"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "northline-email",
											type: "email",
											placeholder: "you@example.com",
											value: email,
											onChange: (event) => setEmail(event.target.value),
											required: true
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											children: "Join"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "nl-form-message",
											"aria-live": "polite",
											children: signupMessage
										})
									]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "nl-footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "nl-footer-wordmark",
						href: "#top",
						children: "Northline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Utility layers for the long way home." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nl-footer-links",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#collection",
								children: "Shop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#materials",
								children: "Materials"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#journal",
								children: "Journal"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "nl-footer-note",
						children: "Concept storefront. Connect real supplier copy, pricing, availability, and checkout before launch."
					})
				]
			}),
			activeProduct && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nl-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "nl-layer-backdrop",
					type: "button",
					"aria-label": "Close product details",
					onClick: () => setActiveProduct(null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "nl-product-dialog",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "northline-product-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "nl-dialog-close",
							type: "button",
							onClick: () => setActiveProduct(null),
							children: "Close"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: activeProduct.image,
							alt: activeProduct.alt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "nl-dialog-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: activeProduct.group }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "northline-product-title",
									children: activeProduct.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activeProduct.price }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "nl-dialog-description",
									children: activeProduct.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Color" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "nl-option-row",
									children: activeProduct.colors.map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: selectedColor === color ? "is-selected" : "",
										onClick: () => setSelectedColor(color),
										children: color
									}, color))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Size" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "nl-option-row",
									children: activeProduct.sizes.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: selectedSize === size ? "is-selected" : "",
										onClick: () => setSelectedSize(size),
										children: size
									}, size))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "nl-button nl-button-primary nl-dialog-add",
									type: "button",
									onClick: () => addToBag(activeProduct),
									children: [
										"Add ",
										activeProduct.name,
										" to bag"
									]
								})
							]
						})
					]
				})]
			}),
			bagOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "nl-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "nl-layer-backdrop",
					type: "button",
					"aria-label": "Close bag",
					onClick: () => setBagOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "nl-bag-drawer",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "bag-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "nl-dialog-close",
							type: "button",
							onClick: () => setBagOpen(false),
							children: "Close"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "bag-title",
							children: "Your bag"
						}),
						bag.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "nl-bag-list",
							children: bag.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.price })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => removeFromBag(index),
									children: "Remove"
								})
							] }, item.id + "-" + index))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "nl-button nl-button-primary nl-bag-checkout",
							type: "button",
							children: "Checkout is a demo"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "nl-empty-bag",
							children: "Your bag is ready when you are."
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { NorthlinePage as component };
