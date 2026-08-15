import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import Together from 'together-ai';

// 1. Server Function (Backend)
const generateLogoFn = createServerFn({ method: 'POST' })
  .validator((data: { companyName: string; style: string }) => data)
  .handler(async ({ data }) => {
    const { companyName, style } = data;
    
    // Default to the provided API key
    const apiKey = process.env.TOGETHER_API_KEY;
    if (!apiKey) {
      throw new Error("TOGETHER_API_KEY is missing in the environment");
    }

    const client = new Together({ apiKey });

    // Simple prompt construction based on the logocreator logic
    const prompt = `Flat 2D vector logo, built from solid-color shapes with crisp, clean edges: a combination mark: a distinctive icon paired with the company name in clean, legible typography for "${companyName}". Style: ${style}. 

    Set the company name "${companyName}" as clean, evenly-spaced lettering with every letter clear, complete and correctly spelled. Color: the icon and the company-name text is one solid flat shade of black, a single color throughout. Place it on a perfectly even, flat white background, keeping every part clearly legible against that background. Centered, balanced composition with crisp, clean edges on a solid, uncluttered background. Professional and instantly recognizable, scalable from favicon to signage.`;

    try {
      const response = await client.images.generate({
        prompt,
        model: "google/flash-image-3.1", // Better at text/lettering than FLUX
        width: 1024,
        height: 1024,
        response_format: "base64"
      });

      return { success: true, base64: response.data[0].b64_json };
    } catch (error: any) {
      console.error("Error generating logo:", error);
      return { success: false, error: error.message || "Failed to generate logo" };
    }
  });


// 2. React UI Component (Frontend)
function LogoGenerator() {
  const [companyName, setCompanyName] = useState("");
  const [style, setStyle] = useState("Minimal and timeless");
  const [isGenerating, setIsGenerating] = useState(false);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName) return;

    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await generateLogoFn({ data: { companyName, style } });
      if (result.success && result.base64) {
        setLogoBase64(result.base64);
      } else {
        setError(result.error || "Generation failed");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-paper p-8 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">
        
        {/* Input Form */}
        <div className="bg-white/50 backdrop-blur-xl p-8 rounded-2xl border border-black/10 shadow-xl">
          <h1 className="text-3xl font-display font-black text-brand-black mb-2 uppercase tracking-tighter">Logo Generator</h1>
          <p className="text-black/60 mb-8">Powered by Together AI + Google Flash Image 3.1</p>
          
          <form onSubmit={handleGenerate} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-brand-black mb-2">Company Name</label>
              <input 
                type="text" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="w-full p-3 bg-white/80 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-brand-black mb-2">Style Focus</label>
              <select 
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-3 bg-white/80 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="Minimal and timeless: two or three simple geometric shapes with generous negative space, clean and flat.">Minimal & Timeless</option>
                <option value="Geometric and precise: built from angular polygonal shapes, grid-aligned with sharp, clean edges; modern and structured.">Geometric & Precise</option>
                <option value="Hand-drawn and organic: sketchy, natural linework with imperfect strokes and a human, crafted feel.">Hand-drawn & Organic</option>
                <option value="Retro and vintage: a classic heritage badge feel with nostalgic, time-worn detailing.">Retro & Vintage</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isGenerating || !companyName}
              className="mt-4 w-full py-4 bg-brand-blue text-white font-bold uppercase tracking-widest rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isGenerating ? "Generating..." : "Generate Logo"}
            </button>

            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Preview Area */}
        <div className="bg-white/50 backdrop-blur-xl p-8 rounded-2xl border border-black/10 shadow-xl min-h-[500px] flex flex-col items-center justify-center">
          {logoBase64 ? (
            <div className="w-full flex flex-col items-center gap-6">
              <img src={`data:image/jpeg;base64,${logoBase64}`} alt="Generated Logo" className="w-full max-w-[400px] aspect-square object-contain rounded-xl shadow-inner border border-black/5" />
              
              <a 
                href={`data:image/jpeg;base64,${logoBase64}`} 
                download={`${companyName.replace(/\s+/g, '-').toLowerCase()}-logo.jpg`}
                className="px-6 py-2 bg-brand-black text-white font-bold uppercase tracking-widest rounded-full hover:bg-black/80 transition"
              >
                Download Logo
              </a>
            </div>
          ) : (
             <div className="text-center opacity-40">
                <div className="w-24 h-24 mx-auto border-4 border-dashed border-brand-black rounded-full mb-4 animate-pulse"></div>
                <p className="font-bold uppercase tracking-widest">Awaiting Prompt</p>
             </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

// 3. Register Route
export const Route = createFileRoute('/logo-generator')({
  component: LogoGenerator,
});
