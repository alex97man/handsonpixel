import { fal } from "@fal-ai/client";

// Configurare pentru testare (VITE_FAL_KEY citită din .env)
const FAL_KEY = import.meta.env.VITE_FAL_KEY;

if (FAL_KEY) {
  fal.config({
    credentials: FAL_KEY,
  });
}

export const removeBackground = async (imageUrl) => {
  return await fal.run("fal-ai/bria/background/remove", {
    input: {
      image_url: imageUrl,
    },
  });
};

export const generateScene = async (imageUrl, prompt, strength = 0.7) => {
  // Folosim FLUX.1 [dev] pentru raport calitate/preț optim
  return await fal.run("fal-ai/flux/dev/image-to-image", {
    input: {
      image_url: imageUrl,
      prompt: prompt,
      strength: strength,
      num_images: 1,
      guidance_scale: 3.5,
    },
  });
};

export default fal;
