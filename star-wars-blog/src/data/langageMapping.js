export const nameBriefMapping = {
    "Detect Language": "none",
    English: "EN",
    French: "FR"
  };
  
  export const briefNameMapping = {
    ...Object.fromEntries(
      Object.entries(nameBriefMapping).map((item) => [item[1], item[0]]),
    ),
  };
  
  export const sourceLangs = { ...nameBriefMapping };
  export const targetLangs = { ...nameBriefMapping };
  delete targetLangs["Detect Language"];