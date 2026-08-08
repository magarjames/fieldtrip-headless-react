import{t as e}from"./jsx-runtime-DUAcabCT.js";import{_ as t,c as n,d as r,g as i,l as a,m as o,u as s}from"./index-Ccrte07v.js";var c=e();function l(){return(0,c.jsx)(`span`,{"aria-label":r,className:`inline-grid h-8 w-8 place-items-center rounded-full border-[1.5px] border-[var(--ink)]`,children:(0,c.jsx)(`span`,{className:`font-serif text-[16px] leading-none`,children:r[0]})})}function u({filled:e=!1}){return(0,c.jsx)(`svg`,{width:`12`,height:`12`,viewBox:`0 0 12 12`,"aria-hidden":!0,className:`shrink-0`,children:(0,c.jsx)(`path`,{d:`M6 .9l4.4 2.55v5.1L6 11.1 1.6 8.55v-5.1z`,fill:e?`currentColor`:`none`,stroke:`currentColor`,strokeWidth:`1`})})}function d({left:e,right:t,dark:n=!1}){return(0,c.jsxs)(`div`,{className:`flex items-baseline justify-between text-[12px] uppercase tracking-[0.08em] ${n?`text-[var(--paper)]/70`:`text-[var(--graphite)]`}`,children:[(0,c.jsx)(`span`,{children:e}),(0,c.jsx)(`span`,{children:t})]})}function f(){s();let e=a(),f=e.flatMap(e=>e.pieces),p=f.slice(0,3);return(0,c.jsxs)(`div`,{className:`nlg min-h-dvh`,children:[(0,c.jsx)(`style`,{children:`
        .nlg{
          --putty:#c4c3b6; --ink:#000000; --bone:#e7e5e4; --chalk:#ebebeb;
          --vellum:#dfdcd5; --graphite:#595855; --ash:#808080; --paper:#ffffff;
          --putty-muted:#4a4946;      /* Graphite darkened for AA on Putty */
          --ink-muted:#b5b3ae;        /* muted reverse type inside the Ink rooms */
          --serif:'Davinci','Playfair Display',Canela,'Tiempos Headline',Georgia,serif;
          --grotesk:'Helvetica Now',Inter,'Neue Haas Grotesk','Helvetica Neue',sans-serif;
          background:var(--putty); color:var(--ink);
          font-family:var(--grotesk);
          font-size:15px; line-height:1.5;
        }
        /* the global h1,h2,h3 rule points at Archivo Black; the serif is the
           brand voice here and has to take those elements back */
        .nlg h1,.nlg h2,.nlg h3{ font-family:var(--serif); font-weight:500; margin:0 }
        .nlg p{ margin:0 }
        .nlg a{ color:inherit; text-decoration:none }
        .nlg .font-serif{ font-family:var(--serif) }
        .nlg :focus-visible{ outline:2px solid currentColor; outline-offset:3px }

        /* serif, display only. Line height compresses as size grows so the
           headings read as carved rather than set. */
        .nlg .t-display{ font-family:var(--serif); font-weight:500;
          font-size:min(23vw,374px); line-height:0.84; letter-spacing:-0.009em; white-space:nowrap }
        .nlg .t-section{ font-family:var(--serif); font-weight:500;
          font-size:clamp(2.6rem,9vw,94px); line-height:0.84; letter-spacing:-0.009em }
        .nlg .t-heading-lg{ font-family:var(--serif); font-weight:500;
          font-size:clamp(1.9rem,5vw,52px); line-height:1; letter-spacing:-0.009em }
        .nlg .t-heading{ font-family:var(--serif); font-weight:500;
          font-size:clamp(1.7rem,4vw,43px); line-height:1.1; letter-spacing:-0.005em }
        .nlg .t-heading-sm{ font-family:var(--serif); font-weight:400;
          font-size:26px; line-height:1.33; letter-spacing:-0.005em }
        .nlg .t-subheading{ font-family:var(--serif); font-weight:400;
          font-size:22px; line-height:1.33; letter-spacing:-0.005em }

        /* grotesk, function only. Never above 26px. */
        .nlg .t-body{ font-size:15px; line-height:1.5 }
        .nlg .t-label{ font-size:12px; line-height:1.25; letter-spacing:0.08em; text-transform:uppercase }
        .nlg .t-stat{ font-size:16px; font-weight:500; line-height:1.25 }
        .nlg .t-micro{ font-size:9px; line-height:1.25; letter-spacing:0.14em; text-transform:uppercase }

        /* three radii, nothing between them */
        .nlg .r-card{ border-radius:9px }
        .nlg .r-link{ border-radius:2px }
        .nlg .r-pill{ border-radius:28.8px }

        /* the notched card: corner geometry, not a radius */
        .nlg .notched{
          clip-path:polygon(28px 0,calc(100% - 28px) 0,100% 28px,100% calc(100% - 28px),
                            calc(100% - 28px) 100%,28px 100%,0 calc(100% - 28px),0 28px);
        }

        /* PLACEHOLDER TREATMENT. Pushes modern photography toward varnished
           oil. Replace the sources with licensed or public-domain painting
           reproductions and drop this filter. */
        .nlg .oil{ filter:sepia(0.42) saturate(0.68) contrast(1.06) brightness(0.94) }

        /* The reference bans gradients. This is a two-stop gradient of the same
           colour, which paints a flat hairline; it is the idiom for animating
           an underline that tracks currentColor, not a visual gradient. */
        .nlg .link-underline{ background-image:linear-gradient(currentColor,currentColor);
          background-size:0 1px; background-repeat:no-repeat; background-position:0 100%;
          transition:background-size .3s cubic-bezier(0.16,1,0.3,1) }
        .nlg .link-underline:hover{ background-size:100% 1px }

        .nlg .rv{ opacity:0; transform:translateY(14px);
          transition:opacity .7s cubic-bezier(0.16,1,0.3,1), transform .7s cubic-bezier(0.16,1,0.3,1) }
        .nlg .rv.in{ opacity:1; transform:none }
        @media (prefers-reduced-motion:reduce){
          .nlg *{ transition-duration:.01ms !important }
          .nlg .rv{ opacity:1; transform:none }
        }
      `}),(0,c.jsx)(`a`,{href:`#edition`,className:`r-link absolute left-[-9999px] z-50 bg-[var(--ink)] px-4 py-2 text-[var(--paper)] focus:left-4 focus:top-4`,children:`Skip to the edition`}),(0,c.jsxs)(`header`,{className:`flex items-center justify-between px-5 py-4 sm:px-10`,children:[(0,c.jsx)(l,{}),(0,c.jsx)(`a`,{href:`#notes`,className:`link-underline t-label`,children:`Field notes`})]}),(0,c.jsxs)(`section`,{className:`overflow-hidden pt-[60px]`,children:[(0,c.jsxs)(`div`,{className:`px-5 text-center sm:px-10`,children:[(0,c.jsxs)(`h1`,{className:`t-heading-lg mx-auto max-w-[18ch]`,children:[`Real cloth, `,(0,c.jsx)(`em`,{className:`font-normal italic`,children:`made`}),` to order`]}),(0,c.jsxs)(`div`,{className:`mt-[28px] flex flex-wrap items-baseline justify-center gap-x-[28px] gap-y-[16px]`,children:[(0,c.jsxs)(`span`,{className:`t-stat`,children:[`PIECES: `,24]}),(0,c.jsx)(`span`,{className:`t-stat`,children:`LEAD: 10 TO 14 DAYS`})]}),(0,c.jsx)(`a`,{href:`#edition`,className:`r-pill mt-[28px] inline-flex min-h-11 items-center bg-[var(--ink)] px-[17px] text-[12px] text-[var(--paper)]`,children:`View the edition`})]}),(0,c.jsx)(`div`,{className:`mt-[52px] flex justify-center`,children:(0,c.jsx)(`p`,{className:`t-display select-none`,"aria-hidden":!0,children:r})})]}),(0,c.jsxs)(`section`,{className:`relative`,children:[(0,c.jsx)(`img`,{src:n(`northline-gallery-classical-landscape-panel`,2200,1200),alt:``,width:2200,height:1200,className:`oil h-[70vh] w-full object-cover`}),(0,c.jsx)(`div`,{className:`absolute inset-0 grid place-items-center p-5`,children:(0,c.jsxs)(`article`,{className:`notched relative aspect-square w-[min(400px,78vw)] bg-[var(--ink)] p-[24px] text-[var(--paper)]`,children:[(0,c.jsxs)(`p`,{className:`t-label text-[var(--ink-muted)]`,children:[`The `,i,` Edition`]}),(0,c.jsx)(`p`,{className:`t-heading-sm mt-[16px] max-w-[14ch]`,children:`Nothing is cut until the order lands.`}),(0,c.jsxs)(`p`,{className:`t-body absolute bottom-[52px] left-[24px] right-[24px] text-[var(--ink-muted)]`,children:[24,` pieces, released together and not reprinted.`]}),(0,c.jsx)(`span`,{"aria-hidden":!0,className:`t-micro absolute bottom-[24px] left-[24px] text-[var(--paper)]`,children:`Scroll`})]})})]}),(0,c.jsx)(`section`,{className:`bg-[var(--ink)] py-[96px] text-[var(--paper)]`,children:(0,c.jsxs)(`div`,{className:`px-5 sm:px-10`,children:[(0,c.jsx)(d,{left:`Fig. 01 to ${String(p.length).padStart(2,`0`)}`,right:`Still life`,dark:!0}),(0,c.jsx)(`h2`,{className:`t-section mt-[32px] text-center`,children:`THE WINTER ROOM`}),(0,c.jsx)(`div`,{className:`mt-[96px] grid gap-[52px] sm:grid-cols-3 sm:gap-[28px]`,children:p.map(e=>(0,c.jsxs)(`article`,{className:`rv flex flex-col items-center text-center`,children:[(0,c.jsx)(`h3`,{className:`t-subheading max-w-[16ch]`,children:e.name}),(0,c.jsx)(`div`,{className:`mt-[20px] aspect-square w-[200px] max-w-[62vw] overflow-hidden rounded-full bg-[var(--ash)]`,children:(0,c.jsx)(`img`,{src:n(e.img,600,600),alt:e.name,width:600,height:600,loading:`lazy`,className:`oil h-full w-full object-cover`})}),(0,c.jsxs)(`div`,{className:`mt-[20px] flex gap-[6px] text-[var(--paper)]`,children:[(0,c.jsx)(u,{filled:!0}),(0,c.jsx)(u,{}),(0,c.jsx)(u,{})]}),(0,c.jsx)(`p`,{className:`t-body mt-[16px] max-w-[34ch] text-[var(--ink-muted)]`,children:e.story})]},e.id))})]})}),(0,c.jsxs)(`main`,{id:`edition`,className:`py-[96px]`,children:[(0,c.jsxs)(`div`,{className:`px-5 sm:px-10`,children:[(0,c.jsx)(d,{left:`${f.length} works`,right:`${i} ${new Date().getFullYear()}`}),(0,c.jsx)(`h2`,{className:`t-section mt-[32px] text-center`,children:`THE EDITION`})]}),e.map((e,r)=>(0,c.jsxs)(`section`,{id:e.id,className:`mt-[96px] px-5 sm:px-10`,children:[(0,c.jsxs)(`div`,{className:`rv flex flex-wrap items-baseline justify-between gap-x-[32px] gap-y-[16px] border-b border-[var(--vellum)] pb-[20px]`,children:[(0,c.jsx)(`h3`,{className:`t-heading max-w-[20ch]`,children:e.heading}),(0,c.jsx)(`p`,{className:`t-body max-w-[46ch] text-[var(--putty-muted)]`,children:e.statement}),(0,c.jsxs)(`span`,{className:`t-label text-[var(--putty-muted)]`,children:[`Room `,String(r+1).padStart(2,`0`)]})]}),(0,c.jsx)(`div`,{className:`mt-[40px] grid grid-cols-2 gap-[16px] lg:grid-cols-4`,children:e.pieces.map(e=>(0,c.jsxs)(`article`,{className:`rv r-card bg-[var(--bone)] p-[24px]`,children:[(0,c.jsx)(`div`,{className:`r-card overflow-hidden bg-[var(--ash)]`,children:(0,c.jsx)(`img`,{src:n(e.img,700,875),alt:e.name,width:700,height:875,loading:`lazy`,className:`oil aspect-[4/5] w-full object-cover`})}),(0,c.jsx)(`h4`,{className:`t-subheading mt-[20px]`,children:e.name}),(0,c.jsx)(`p`,{className:`t-body mt-[6px] text-[var(--graphite)]`,children:e.story}),(0,c.jsxs)(`div`,{className:`mt-[20px] flex items-baseline justify-between gap-[16px] border-t border-[var(--vellum)] pt-[16px]`,children:[(0,c.jsx)(`span`,{className:`t-stat`,children:t(e.price)}),(0,c.jsx)(`span`,{className:`t-label text-[var(--graphite)]`,children:e.sizes.join(` `)})]})]},e.id))})]},e.id))]}),(0,c.jsx)(`section`,{id:`notes`,className:`bg-[var(--ink)] py-[96px] text-[var(--paper)]`,children:(0,c.jsxs)(`div`,{className:`px-5 sm:px-10`,children:[(0,c.jsx)(d,{left:`Wall labels`,right:`Field notes`,dark:!0}),(0,c.jsx)(`h2`,{className:`t-section mt-[32px] text-center`,children:`ON MAKING LESS`}),(0,c.jsx)(`div`,{className:`mt-[96px] grid gap-[52px] sm:grid-cols-3 sm:gap-[28px]`,children:o.map(e=>(0,c.jsxs)(`article`,{className:`rv border-t border-[var(--paper)]/25 pt-[20px]`,children:[(0,c.jsx)(`p`,{className:`t-label text-[var(--ink-muted)]`,children:e.kicker}),(0,c.jsx)(`h3`,{className:`t-heading-sm mt-[16px] max-w-[20ch]`,children:e.title}),(0,c.jsx)(`p`,{className:`t-body mt-[16px] text-[var(--ink-muted)]`,children:e.body})]},e.id))}),(0,c.jsxs)(`div`,{className:`mt-[96px] flex justify-center gap-[6px] text-[var(--paper)]`,children:[(0,c.jsx)(u,{}),(0,c.jsx)(u,{filled:!0}),(0,c.jsx)(u,{})]})]})}),(0,c.jsxs)(`footer`,{className:`bg-[var(--chalk)] px-5 py-[60px] sm:px-10`,children:[(0,c.jsxs)(`div`,{className:`flex flex-wrap items-center justify-between gap-[28px]`,children:[(0,c.jsx)(l,{}),(0,c.jsx)(`a`,{href:`#edition`,className:`link-underline t-label`,children:`Return to the edition`})]}),(0,c.jsxs)(`p`,{className:`t-heading-lg mt-[52px] max-w-[16ch]`,children:[`Bought once, `,(0,c.jsx)(`em`,{className:`font-normal italic`,children:`worn`}),` for years.`]}),(0,c.jsx)(`p`,{className:`t-body mt-[20px] max-w-[52ch] text-[var(--putty-muted)]`,children:`All imagery on this page is placeholder. Original brand copy and invented product names, for a store that does not exist yet.`})]})]})}export{f as component};